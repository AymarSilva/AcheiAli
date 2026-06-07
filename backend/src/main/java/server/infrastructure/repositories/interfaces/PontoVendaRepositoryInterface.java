package server.infrastructure.repositories.interfaces;

import java.util.List;
import java.util.Optional;

import server.domain.entities.PontoVenda;

public interface PontoVendaRepositoryInterface {

    void salvar(
            PontoVenda pontoVenda,
            Long ambulanteId
    );

    Optional<PontoVenda> buscarPorId(
            Long id
    );

    List<PontoVenda> listarPorAmbulante(
            Long ambulanteId
    );

    int contarPorAmbulante(
            Long ambulanteId
    );

    void atualizar(
            Long id,
            PontoVenda pontoVenda
    );

    void remover(
            Long id
    );
}
