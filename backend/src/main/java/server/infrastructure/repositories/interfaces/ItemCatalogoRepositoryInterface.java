package server.infrastructure.repositories.interfaces;

import java.util.List;
import java.util.Optional;

import server.domain.VO.ItemCatalogo;

public interface ItemCatalogoRepositoryInterface {
    ItemCatalogo salvar(Long catalogoId, ItemCatalogo itemCatalogo);
    List<ItemCatalogo> listarPorCatalogo(Long catalogoId);
    Optional<ItemCatalogo> buscarPorId(Long itemId);
    void remover(Long itemId);
}
