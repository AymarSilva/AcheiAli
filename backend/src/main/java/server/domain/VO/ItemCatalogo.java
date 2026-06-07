package server.domain.VO;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ItemCatalogo {

    private final String nome;
    private final BigDecimal preco;
    private final LocalDate dataPerecivel;
    private final String descricao;

    public ItemCatalogo(
            String nome,
            BigDecimal preco,
            LocalDate dataPerecivel,
            String descricao
    ) {
        this.nome = nome;
        this.preco = preco;
        this.dataPerecivel = dataPerecivel;
        this.descricao = descricao;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("nome")
    public String nome() {
        return nome;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("preco")
    public BigDecimal preco() {
        return preco;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("dataPerecivel")
    public LocalDate dataPerecivel() {
        return dataPerecivel;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("descricao")
    public String descricao() {
        return descricao;
    }
}
