package server.infrastructure.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import server.domain.VO.ItemCatalogo;

public class InfraItemCatalogo extends ItemCatalogo {

    private Long id;
    private Long catalogoId;

    public InfraItemCatalogo(String nome, BigDecimal preco, LocalDate dataPerecivel, String descricao) {
        super(nome, preco, dataPerecivel, descricao);
    }

    @com.fasterxml.jackson.annotation.JsonProperty("id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("catalogoId")
    public Long getCatalogoId() {
        return catalogoId;
    }

    public void setCatalogoId(Long catalogoId) {
        this.catalogoId = catalogoId;
    }
}
