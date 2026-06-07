package server.domain.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class Plano {

    public abstract boolean permiteCatalogo();

    public abstract int limitePontos();

    public int limitePontosVenda() {
        return limitePontos();
    }

    public abstract boolean permiteDestaque();

    @JsonProperty("tipo")
    public String getTipo() {
        return getClass().getSimpleName();
    }
}
