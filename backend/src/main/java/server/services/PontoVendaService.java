package server.services;

import server.controllers.dtos.AtualizarPontoVendaDTO;
import server.controllers.dtos.CriarPontoVendaDTO;
import server.domain.entities.Ambulante;
import server.domain.entities.PontoVenda;
import server.domain.exceptions.LimitePontosVendaException;
import server.domain.exceptions.PontoVendaNaoEncontradoException;
import server.infrastructure.repositories.AmbulanteRepository;
import server.infrastructure.repositories.PontoVendaRepository;

public class PontoVendaService {

    private final server.infrastructure.repositories.PontoVendaRepository pontoVendaRepository;

    private final AmbulanteRepository ambulanteRepository;

    public PontoVendaService(
            PontoVendaRepository pontoVendaRepository,
            AmbulanteRepository ambulanteRepository) {

        this.pontoVendaRepository = pontoVendaRepository;

        this.ambulanteRepository = ambulanteRepository;
    }

    public PontoVenda criar(
            Long ambulanteId,
            CriarPontoVendaDTO dto) {

        Ambulante ambulante = ambulanteRepository
                .buscarPorId(
                        ambulanteId)
                .orElseThrow();

        int quantidade = pontoVendaRepository
                .contarPorAmbulante(
                        ambulanteId);

        if (quantidade >= ambulante
                .getPlano()
                .limitePontosVenda()) {

            throw new LimitePontosVendaException();
        }

        PontoVenda pontoVenda = new PontoVenda(
                dto.nome(),
                dto.latitude(),
                dto.longitude());

        pontoVendaRepository.salvar(
                pontoVenda,
                ambulanteId);

        return pontoVenda;
    }

    public PontoVenda buscar(
            Long id) {

        return pontoVendaRepository
                .buscarPorId(id)
                .orElseThrow(
                        PontoVendaNaoEncontradoException::new);
    }

    public void atualizar(
            Long id,
            AtualizarPontoVendaDTO dto) {

        PontoVenda ponto = buscar(id);

        ponto.setNome(
                dto.nome());

        ponto.setAtivo(
                dto.ativo());

        pontoVendaRepository
                .atualizar(id, ponto);
    }

    public void remover(
            Long id) {

        buscar(id);

        pontoVendaRepository
                .remover(id);
    }
}
