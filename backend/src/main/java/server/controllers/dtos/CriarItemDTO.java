package server.controllers.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CriarItemDTO(
        String nome,
        String descricao,
        BigDecimal preco,
        LocalDate dataPerecivel
) {}
