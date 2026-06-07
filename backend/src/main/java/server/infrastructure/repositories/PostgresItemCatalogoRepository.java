package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import server.domain.VO.ItemCatalogo;
import server.infrastructure.ConnectionFactory;
import server.infrastructure.entities.InfraItemCatalogo;
import server.infrastructure.repositories.interfaces.ItemCatalogoRepositoryInterface;

public class PostgresItemCatalogoRepository implements ItemCatalogoRepositoryInterface {

    @Override
    public ItemCatalogo salvar(Long catalogoId, ItemCatalogo itemCatalogo) {
        String sql = """
                INSERT INTO itens_catalogo (catalogo_id, nome, preco, data_perecivel, descricao)
                VALUES (?, ?, ?, ?, ?)
                """;
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setLong(1, catalogoId);
            stmt.setString(2, itemCatalogo.nome());
            stmt.setBigDecimal(3, itemCatalogo.preco());
            stmt.setObject(4, itemCatalogo.dataPerecivel());
            stmt.setString(5, itemCatalogo.descricao());
            stmt.executeUpdate();
            try (ResultSet keys = stmt.getGeneratedKeys()) {
                if (keys.next() && itemCatalogo instanceof InfraItemCatalogo infraItemCatalogo) {
                    infraItemCatalogo.setId(keys.getLong(1));
                    infraItemCatalogo.setCatalogoId(catalogoId);
                }
            }
            return itemCatalogo;
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public List<ItemCatalogo> listarPorCatalogo(Long catalogoId) {
        String sql = """
                SELECT id, catalogo_id, nome, preco, data_perecivel, descricao
                FROM itens_catalogo
                WHERE catalogo_id = ?
                ORDER BY id
                """;
        List<ItemCatalogo> itens = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, catalogoId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    InfraItemCatalogo item = new InfraItemCatalogo(
                            rs.getString("nome"),
                            rs.getBigDecimal("preco"),
                            rs.getObject("data_perecivel", java.time.LocalDate.class),
                            rs.getString("descricao")
                    );
                    item.setId(rs.getLong("id"));
                    item.setCatalogoId(rs.getLong("catalogo_id"));
                    itens.add(item);
                }
            }
            return itens;
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public Optional<ItemCatalogo> buscarPorId(Long itemId) {
        String sql = "SELECT id, catalogo_id, nome, preco, data_perecivel, descricao FROM itens_catalogo WHERE id = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, itemId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                InfraItemCatalogo item = new InfraItemCatalogo(
                        rs.getString("nome"),
                        rs.getBigDecimal("preco"),
                        rs.getObject("data_perecivel", java.time.LocalDate.class),
                        rs.getString("descricao")
                );
                item.setId(rs.getLong("id"));
                item.setCatalogoId(rs.getLong("catalogo_id"));
                return Optional.of(item);
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public void remover(Long itemId) {
        String sql = "DELETE FROM itens_catalogo WHERE id = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, itemId);
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
