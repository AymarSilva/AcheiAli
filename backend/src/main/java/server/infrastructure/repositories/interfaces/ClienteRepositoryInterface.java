package server.infrastructure.repositories.interfaces;

import java.util.Optional;

import server.domain.entities.Cliente;

public interface ClienteRepositoryInterface {

    boolean existePorCpf(String cpf);

    Optional<Cliente> buscarPorId(Long id);

    void salvar(Cliente cliente);
}
