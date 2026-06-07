package server.controllers.dtos;

public record CriarPontoVendaDTO(
        String nome,
        Double latitude,
        Double longitude
) {}
