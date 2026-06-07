package server.infrastructure.entities;

import server.domain.entities.Catalogo;

public class InfraCatalogo extends Catalogo {

    private Long id;
    private Long ambulanteId;

    public InfraCatalogo(String cabecalho, String descricao) {
        super(cabecalho, descricao);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmbulanteId() {
        return ambulanteId;
    }

    public void setAmbulanteId(Long ambulanteId) {
        this.ambulanteId = ambulanteId;
    }
}
