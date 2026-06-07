package server.infrastructure.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import server.infrastructure.ConnectionFactory;
import server.infrastructure.entities.InfraAmbulante;
import server.infrastructure.repositories.interfaces.AmbulanteRepositoryInterface;

public class AmbulanteRepository implements AmbulanteRepositoryInterface {

    @Override
    public boolean existePorCpf(String cpf) {

        String sql = "SELECT 1 FROM ambulantes WHERE cpf = ?";

        try (
                Connection conn = ConnectionFactory.getConnection();

                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cpf);

            ResultSet rs = stmt.executeQuery();

            return rs.next();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean existePorCnpj(String cnpj) {

        String sql = "SELECT 1 FROM ambulantes WHERE cnpj = ?";

        try (
                Connection conn = ConnectionFactory.getConnection();

                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cnpj);

            ResultSet rs = stmt.executeQuery();

            return rs.next();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void salvar(server.domain.entities.Ambulante ambulante) {

        String sql = """
                INSERT INTO ambulantes
                (nome, senha, cpf, cnpj, plano)
                VALUES (?, ?, ?, ?, ?)
                """;

        try (
                Connection conn = ConnectionFactory.getConnection();

                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, ambulante.getNome());
            stmt.setString(2, ambulante.getSenha());
            stmt.setString(3, ambulante.getCpf());
            stmt.setString(4, ambulante.getCnpj());
            stmt.setInt(5, 0);

            stmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<server.domain.entities.Ambulante> buscarPorId(Long id) {

        String sql = """
                    SELECT *
                    FROM ambulantes
                    WHERE id = ?
                """;

        try (
                Connection conn = ConnectionFactory.getConnection();

                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            ResultSet rs = stmt.executeQuery();

            if (!rs.next()) {
                return Optional.empty();
            }

            InfraAmbulante ambulante = new InfraAmbulante(
                    rs.getString("nome"),
                    rs.getString("senha"),
                    rs.getString("cpf"),
                    rs.getString("cnpj"),
                    rs.getInt("plano") == 0 ? new server.domain.entities.PlanoFree() : new server.domain.entities.PlanoPremium());

            ambulante.setId(rs.getLong("id"));

            return Optional.of(
                    ambulante);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void atualizarPlano(Long id, int plano) {
        String sql = "UPDATE ambulantes SET plano = ? WHERE id = ?";

        try (
                Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, plano);
            stmt.setLong(2, id);
            stmt.executeUpdate();
        } catch (SQLException exception) {
            throw new RuntimeException(exception);
        }
    }
}
