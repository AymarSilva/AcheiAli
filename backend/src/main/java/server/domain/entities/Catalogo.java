package server.domain.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import server.domain.VO.ItemCatalogo;

public class Catalogo {

    private String cabecalho;
    private String descricao;

    private final List<ItemCatalogo> itens = new ArrayList<>();

    public Catalogo(String cabecalho, String descricao) {
        this.cabecalho = cabecalho;
        this.descricao = descricao;
    }

    public void adicionarItem(ItemCatalogo item) {
        itens.add(item);
    }

    public List<ItemCatalogo> getItens() {
        return List.copyOf(itens);
    }

    @JsonProperty("titulo")
    public String getCabecalho() {
        return cabecalho;
    }

    public void setCabecalho(String cabecalho) {
        this.cabecalho = cabecalho;
    }

    @JsonProperty("descricao")
    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
