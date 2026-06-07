package server.controllers.dtos;

public record CriarClienteDTO(
        String nome,
        String cpf,
        String telefone,
        String senha,
        String rua,
        String numero,
        String logradouro,
        String cep
) {
}
