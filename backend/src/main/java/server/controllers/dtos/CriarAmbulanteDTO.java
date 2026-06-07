package server.controllers.dtos;

public record CriarAmbulanteDTO(
        String nome,
        String senha,
        String telefone,
        String cpf,
        String cnpj
) {}
