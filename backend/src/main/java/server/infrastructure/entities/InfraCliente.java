package server.infrastructure.entities;

import server.domain.VO.Endereco;
import server.domain.entities.Cliente;

public class InfraCliente extends Cliente {

    private Long id;

    public InfraCliente(String nome, String senha, String cpf, Endereco endereco) {
        super(nome, senha, cpf, endereco);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
