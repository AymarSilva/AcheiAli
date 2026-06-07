package server.infrastructure.repositories.interfaces;

import java.util.List;
import java.util.Optional;

import server.domain.entities.Catalogo;

public interface CatalogoRepositoryInterface {
    List<Catalogo> listarTodos();
    Optional<Catalogo> buscarPorAmbulanteId(Long ambulanteId);
    Optional<Catalogo> buscarPorId(Long catalogoId);
    Catalogo salvar(Long ambulanteId, Catalogo catalogo);
}
