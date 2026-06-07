package server.domain.entities;

import server.domain.VO.Endereco;

public class Cliente extends Usuario {

    private String cpf;
    private Endereco endereco;

    public Cliente(
            String nome,
            String senha,
            String cpf,
            Endereco endereco
    ) {
        super(nome, senha);
        this.cpf = cpf;
        this.endereco = endereco;
    }

    public String getCpf() {
        return cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }
}
