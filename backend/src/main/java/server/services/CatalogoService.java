package server.services;

import server.domain.entities.Ambulante;
import server.domain.entities.Catalogo;
import server.domain.exceptions.AmbulanteNaoEncontradoException;
import server.infrastructure.entities.InfraCatalogo;
import server.infrastructure.repositories.interfaces.AmbulanteRepositoryInterface;
import server.infrastructure.repositories.interfaces.CatalogoRepositoryInterface;

public class CatalogoService {

    private final AmbulanteRepositoryInterface ambulanteRepository;
    private final CatalogoRepositoryInterface catalogoRepository;

    public CatalogoService(
            AmbulanteRepositoryInterface ambulanteRepository,
            CatalogoRepositoryInterface catalogoRepository
    ) {
        this.ambulanteRepository = ambulanteRepository;
        this.catalogoRepository = catalogoRepository;
    }

    public Catalogo criar(Long ambulanteId, String titulo, String descricao) {
        Ambulante ambulante = ambulanteRepository.
                buscarPorId(ambulanteId)
                .orElseThrow(AmbulanteNaoEncontradoException::new);

        Catalogo catalogo = new Catalogo(titulo, descricao);
        ambulante.criarCatalogo(catalogo);

        return catalogoRepository.salvar(ambulanteId, new InfraCatalogo(titulo, descricao));
    }
}
