package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import server.domain.entities.Usuario;
import server.domain.entities.PlanoFree;
import server.infrastructure.entities.InfraAmbulante;
import server.infrastructure.entities.InfraCliente;
import server.infrastructure.ConnectionFactory;
import server.infrastructure.repositories.interfaces.AuthRepository;

public class PostgresAuthRepository implements AuthRepository {

    @Override
    public Optional<Usuario> buscarPorDocumento(String documento) {
        String sqlCliente = "SELECT id, nome, senha, cpf FROM clientes WHERE cpf = ?";
        String sqlAmbulante = "SELECT id, nome, senha, cpf, cnpj FROM ambulantes WHERE cpf = ? OR cnpj = ?";

        try (Connection conn = ConnectionFactory.getConnection()) {
            try (PreparedStatement stmt = conn.prepareStatement(sqlCliente)) {
                stmt.setString(1, documento);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        InfraCliente cliente = new InfraCliente(
                                rs.getString("nome"),
                                rs.getString("senha"),
                                rs.getString("cpf"),
                                null
                        );
                        cliente.setId(rs.getLong("id"));
                        return Optional.of(cliente);
                    }
                }
            }

            try (PreparedStatement stmt = conn.prepareStatement(sqlAmbulante)) {
                stmt.setString(1, documento);
                stmt.setString(2, documento);
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        InfraAmbulante ambulante = new InfraAmbulante(
                                rs.getString("nome"),
                                rs.getString("senha"),
                                rs.getString("cpf"),
                                rs.getString("cnpj"),
                                new PlanoFree()
                        );
                        ambulante.setId(rs.getLong("id"));
                        return Optional.of(ambulante);
                    }
                }
            }

            return Optional.empty();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
