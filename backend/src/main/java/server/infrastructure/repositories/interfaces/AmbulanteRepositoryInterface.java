package server.infrastructure.repositories.interfaces;

import java.util.Optional;

import server.domain.entities.Ambulante;

public interface AmbulanteRepositoryInterface {

    
    Optional<Ambulante> buscarPorId(Long id);

    boolean existePorCpf(String cpf);

    boolean existePorCnpj(String cnpj);

    void salvar(Ambulante ambulante);

    void atualizarPlano(Long id, int plano);
}
