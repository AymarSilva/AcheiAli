package server.controllers.dtos;

public record LoginDTO(
        String documento,
        String senha
) {}
