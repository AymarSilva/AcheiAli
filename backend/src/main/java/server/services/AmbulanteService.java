package server.services;

import java.util.List;

import server.controllers.dtos.CriarAmbulanteDTO;
import server.controllers.dtos.CriarCatalogoDTO;
import server.controllers.dtos.CriarItemDTO;
import server.controllers.dtos.UpgradePlanoDTO;
import server.domain.VO.ItemCatalogo;
import server.domain.entities.Ambulante;
import server.domain.entities.Catalogo;
import server.domain.entities.Plano;
import server.domain.entities.PlanoFree;
import server.domain.entities.PlanoPremium;
import server.domain.exceptions.AmbulanteJaExisteException;
import server.domain.exceptions.AmbulanteNaoEncontradoException;
import server.domain.exceptions.DocumentoObrigatorioException;
import server.infrastructure.repositories.interfaces.AmbulanteRepositoryInterface;
import server.infrastructure.repositories.interfaces.CatalogoRepositoryInterface;
import server.infrastructure.repositories.interfaces.ItemCatalogoRepositoryInterface;

public class AmbulanteService {

    private final AmbulanteRepositoryInterface ambulanteRepository;
    private final CatalogoRepositoryInterface catalogoRepository;
    private final ItemCatalogoRepositoryInterface itemCatalogoRepository;

    public AmbulanteService(
            AmbulanteRepositoryInterface ambulanteRepository,
            CatalogoRepositoryInterface catalogoRepository,
            ItemCatalogoRepositoryInterface itemCatalogoRepository
    ) {
        this.ambulanteRepository = ambulanteRepository;
        this.catalogoRepository = catalogoRepository;
        this.itemCatalogoRepository = itemCatalogoRepository;
    }

    public Ambulante criar(CriarAmbulanteDTO dto) {
        if (dto.cpf() == null && dto.cnpj() == null) {
            throw new DocumentoObrigatorioException();
        }

        if (dto.cpf() != null && ambulanteRepository.existePorCpf(dto.cpf())) {
            throw new AmbulanteJaExisteException();
        }

        if (dto.cnpj() != null && ambulanteRepository.existePorCnpj(dto.cnpj())) {
            throw new AmbulanteJaExisteException();
        }

        Ambulante ambulante = new Ambulante(
                dto.nome(),
                dto.senha(),
                dto.cpf(),
                dto.cnpj(),
                new PlanoFree()
        );

        ambulanteRepository.salvar(ambulante);
        return ambulante;
    }

    public Ambulante buscar(Long id) {
        return ambulanteRepository.buscarPorId(id)
                .orElseThrow(AmbulanteNaoEncontradoException::new);
    }

    public Ambulante alterarPlano(Long ambulanteId, UpgradePlanoDTO dto) {
        Ambulante ambulante = buscar(ambulanteId);
        Plano novoPlano = switch (dto.plano()) {
            case 0 -> new PlanoFree();
            case 1 -> new PlanoPremium();
            default -> throw new IllegalArgumentException("Plano inválido: " + dto.plano());
        };

        ambulante.setPlano(novoPlano);
        ambulanteRepository.atualizarPlano(ambulanteId, dto.plano());
        return ambulante;
    }

    public List<Catalogo> listarCatalogos() {
        return catalogoRepository.listarTodos();
    }

    public Catalogo buscarCatalogo(Long ambulanteId) {
        return catalogoRepository.buscarPorAmbulanteId(ambulanteId)
                .orElseThrow(() -> new IllegalArgumentException("Catálogo não encontrado."));
    }

    public Catalogo criarCatalogo(Long ambulanteId, CriarCatalogoDTO dto) {
        Ambulante ambulante = buscar(ambulanteId);
        Catalogo catalogo = new Catalogo(dto.titulo(), dto.descricao());
        ambulante.criarCatalogo(catalogo);
        return catalogoRepository.salvar(ambulanteId, catalogo);
    }

    public List<ItemCatalogo> listarItensCatalogo(Long catalogoId) {
        Catalogo catalogo = catalogoRepository.buscarPorId(catalogoId)
                .orElseThrow(() -> new IllegalArgumentException("Catálogo não encontrado."));

        List<ItemCatalogo> itens = itemCatalogoRepository.listarPorCatalogo(catalogoId);
        itens.forEach(catalogo::adicionarItem);
        return catalogo.getItens();
    }

    public ItemCatalogo criarItemCatalogo(Long catalogoId, CriarItemDTO dto) {
        Catalogo catalogo = catalogoRepository.buscarPorId(catalogoId)
                .orElseThrow(() -> new IllegalArgumentException("Catálogo não encontrado."));

        ItemCatalogo item = new ItemCatalogo(
                dto.nome(),
                dto.preco(),
                dto.dataPerecivel(),
                dto.descricao()
        );
        catalogo.adicionarItem(item);
        return itemCatalogoRepository.salvar(catalogoId, item);
    }

    public void removerItemCatalogo(Long itemId) {
        itemCatalogoRepository.remover(itemId);
    }
}
