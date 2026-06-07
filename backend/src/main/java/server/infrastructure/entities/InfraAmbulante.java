package server.infrastructure.entities;

import server.domain.entities.Ambulante;
import server.domain.entities.Plano;

public class InfraAmbulante extends Ambulante {

    private Long id;

    public InfraAmbulante(String nome, String senha, String cpf, String cnpj, Plano plano) {
        super(nome, senha, cpf, cnpj, plano);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
