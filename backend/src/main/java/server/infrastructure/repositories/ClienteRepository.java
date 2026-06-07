package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import server.domain.entities.Cliente;
import server.infrastructure.entities.InfraCliente;
import server.infrastructure.ConnectionFactory;
import server.infrastructure.repositories.interfaces.ClienteRepositoryInterface;

public class ClienteRepository implements ClienteRepositoryInterface {

    @Override
    public boolean existePorCpf(String cpf) {
        String sql = "SELECT 1 FROM clientes WHERE cpf = ?";

        try (
                Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)
        ) {
            stmt.setString(1, cpf);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public Optional<Cliente> buscarPorId(Long id) {
        String sql = """
                SELECT id, nome, senha, cpf, rua, numero, logradouro, cep
                FROM clientes
                WHERE id = ?
                """;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                InfraCliente cliente = new InfraCliente(
                        rs.getString("nome"),
                        rs.getString("senha"),
                        rs.getString("cpf"),
                        new server.domain.VO.Endereco(
                                rs.getString("rua"),
                                rs.getString("numero"),
                                rs.getString("logradouro"),
                                rs.getString("cep")
                        )
                );
                cliente.setId(rs.getLong("id"));
                return Optional.of(cliente);
            }
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public void salvar(Cliente cliente) {
        String sql = """
                INSERT INTO clientes (nome, senha, cpf, rua, numero, logradouro, cep)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """;

        try (
                Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)
        ) {
            stmt.setString(1, cliente.getNome());
            stmt.setString(2, cliente.getSenha());
            stmt.setString(3, cliente.getCpf());
            stmt.setString(4, cliente.getEndereco().rua());
            stmt.setString(5, cliente.getEndereco().numero());
            stmt.setString(6, cliente.getEndereco().logradouro());
            stmt.setString(7, cliente.getEndereco().cep());
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
