package server.infrastructure.entities;

import server.domain.entities.PontoVenda;

public class InfraPontoVenda extends PontoVenda {

    private Long id;

    public InfraPontoVenda(String nome, double latitude, double longitude) {
        super(nome, latitude, longitude);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
