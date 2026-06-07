package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import server.infrastructure.ConnectionFactory;
import server.infrastructure.entities.InfraPontoVenda;
import server.infrastructure.repositories.interfaces.PontoVendaRepositoryInterface;

public class PontoVendaRepository implements PontoVendaRepositoryInterface {

    @Override
    public void salvar(server.domain.entities.PontoVenda pontoVenda, Long ambulanteId) {
        String sql = """
                INSERT INTO pontos_venda (ambulante_id, nome, latitude, longitude, ativo)
                VALUES (?, ?, ?, ?, ?)
                """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, ambulanteId);
            stmt.setString(2, pontoVenda.getNome());
            stmt.setDouble(3, pontoVenda.getLatitude());
            stmt.setDouble(4, pontoVenda.getLongitude());
            stmt.setBoolean(5, pontoVenda.isDisponivel());
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public Optional<server.domain.entities.PontoVenda> buscarPorId(Long id) {
        String sql = "SELECT id, nome, latitude, longitude, ativo FROM pontos_venda WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                InfraPontoVenda pontoVenda = new InfraPontoVenda(
                        rs.getString("nome"),
                        rs.getDouble("latitude"),
                        rs.getDouble("longitude")
                );
                pontoVenda.setAtivo(rs.getBoolean("ativo"));
                return Optional.of(pontoVenda);
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public List<server.domain.entities.PontoVenda> listarPorAmbulante(Long ambulanteId) {
        String sql = """
                SELECT id, nome, latitude, longitude, ativo
                FROM pontos_venda
                WHERE ambulante_id = ?
                ORDER BY id
                """;

        List<server.domain.entities.PontoVenda> pontos = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, ambulanteId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    InfraPontoVenda pontoVenda = new InfraPontoVenda(
                            rs.getString("nome"),
                            rs.getDouble("latitude"),
                            rs.getDouble("longitude")
                    );
                    pontoVenda.setAtivo(rs.getBoolean("ativo"));
                    pontos.add(pontoVenda);
                }
            }
            return pontos;
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public int contarPorAmbulante(Long ambulanteId) {
        String sql = "SELECT COUNT(*) FROM pontos_venda WHERE ambulante_id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, ambulanteId);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() ? rs.getInt(1) : 0;
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public void atualizar(Long id, server.domain.entities.PontoVenda pontoVenda) {
        String sql = """
                UPDATE pontos_venda
                SET nome = ?, latitude = ?, longitude = ?, ativo = ?
                WHERE id = ?
                """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, pontoVenda.getNome());
            stmt.setDouble(2, pontoVenda.getLatitude());
            stmt.setDouble(3, pontoVenda.getLongitude());
            stmt.setBoolean(4, pontoVenda.isDisponivel());
            stmt.setLong(5, id);
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public void remover(Long id) {
        String sql = "DELETE FROM pontos_venda WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
