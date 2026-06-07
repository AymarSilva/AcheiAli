package server.domain.entities;

import java.util.ArrayList;
import java.util.List;

import server.domain.exceptions.LimitePontosVendaException;
import server.domain.exceptions.PlanoNaoPermiteCatalogoException;


public class Ambulante extends Usuario {

    private String cpf;
    private String cnpj;

    private Plano plano;

    private Catalogo catalogo;

    private final List<PontoVenda> pontosVenda = new ArrayList<>();

    public Ambulante(
            String nome,
            String senha,
            String cpf,
            String cnpj,
            Plano plano
    ) {
        super(nome, senha);
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.plano = plano;
    }

    public void adicionarPontoVenda(PontoVenda pontoVenda) {

        if (pontosVenda.size() >= plano.limitePontos()) {
            throw new LimitePontosVendaException(
                    "Limite de pontos atingido."
            );
        }

        pontosVenda.add(pontoVenda);
    }

    public void criarCatalogo(Catalogo catalogo) {

        if (!plano.permiteCatalogo()) {
            throw new PlanoNaoPermiteCatalogoException(
                    "Seu plano não permite catálogo."
            );
        }

        this.catalogo = catalogo;
    }

    public Plano getPlano() {
        return plano;
    }

    public Catalogo getCatalogo() {
        return catalogo;
    }

    public void setPlano(Plano plano) {
        this.plano = plano;
    }

    public String getCpf() {
        return cpf;
    }

    public String getCnpj() {
        return cnpj;
    }

    public String getSenha() {
        return super.getSenha();
    }

    public List<PontoVenda> getPontosVenda() {
        return List.copyOf(pontosVenda);
    }
}
