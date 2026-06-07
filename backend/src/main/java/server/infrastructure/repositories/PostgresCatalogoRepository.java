package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import server.domain.entities.Catalogo;
import server.infrastructure.ConnectionFactory;
import server.infrastructure.entities.InfraCatalogo;
import server.infrastructure.repositories.interfaces.CatalogoRepositoryInterface;

public class PostgresCatalogoRepository implements CatalogoRepositoryInterface {

    @Override
    public List<Catalogo> listarTodos() {
        String sql = "SELECT id, ambulante_id, cabecalho, descricao FROM catalogos ORDER BY id";
        List<Catalogo> catalogos = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                InfraCatalogo catalogo = new InfraCatalogo(
                        rs.getString("cabecalho"),
                        rs.getString("descricao")
                );
                catalogo.setId(rs.getLong("id"));
                catalogo.setAmbulanteId(rs.getLong("ambulante_id"));
                catalogos.add(catalogo);
            }
            return catalogos;
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public Optional<Catalogo> buscarPorAmbulanteId(Long ambulanteId) {
        String sql = "SELECT id, ambulante_id, cabecalho, descricao FROM catalogos WHERE ambulante_id = ?";
        return buscar(sql, ambulanteId);
    }

    @Override
    public Optional<Catalogo> buscarPorId(Long catalogoId) {
        String sql = "SELECT id, ambulante_id, cabecalho, descricao FROM catalogos WHERE id = ?";
        return buscar(sql, catalogoId);
    }

    @Override
    public Catalogo salvar(Long ambulanteId, Catalogo catalogo) {
        String sql = "INSERT INTO catalogos (ambulante_id, cabecalho, descricao) VALUES (?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setLong(1, ambulanteId);
            stmt.setString(2, catalogo.getCabecalho());
            stmt.setString(3, catalogo.getDescricao());
            stmt.executeUpdate();
            try (ResultSet keys = stmt.getGeneratedKeys()) {
                if (keys.next() && catalogo instanceof InfraCatalogo infraCatalogo) {
                    infraCatalogo.setId(keys.getLong(1));
                    infraCatalogo.setAmbulanteId(ambulanteId);
                }
            }
            return catalogo;
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    private Optional<Catalogo> buscar(String sql, Long id) {
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                InfraCatalogo catalogo = new InfraCatalogo(
                        rs.getString("cabecalho"),
                        rs.getString("descricao")
                );
                catalogo.setId(rs.getLong("id"));
                catalogo.setAmbulanteId(rs.getLong("ambulante_id"));
                return Optional.of(catalogo);
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
