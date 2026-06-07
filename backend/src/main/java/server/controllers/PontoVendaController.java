package server.controllers;

import io.javalin.http.Context;
import server.controllers.dtos.AtualizarPontoVendaDTO;
import server.controllers.dtos.CriarPontoVendaDTO;
import server.services.PontoVendaService;

public class PontoVendaController {

    private final PontoVendaService service;

    public PontoVendaController(
            PontoVendaService service
    ) {
        this.service = service;
    }

    public void criar(Context ctx) {

        Long ambulanteId =
                Long.valueOf(
                        ctx.pathParam(
                                "ambulanteId"
                        )
                );

        CriarPontoVendaDTO dto =
                ctx.bodyAsClass(
                        CriarPontoVendaDTO.class
                );

        var ponto =
                service.criar(
                        ambulanteId,
                        dto
                );

        ctx.status(201);
        ctx.json(ponto);
    }

    public void buscar(Context ctx) {

        Long id =
                Long.valueOf(
                        ctx.pathParam("id")
                );

        var ponto =
                service.buscar(id);

        ctx.json(ponto);
    }

    public void atualizar(Context ctx) {

        Long id =
                Long.valueOf(
                        ctx.pathParam("id")
                );

        AtualizarPontoVendaDTO dto =
                ctx.bodyAsClass(
                        AtualizarPontoVendaDTO.class
                );

        service.atualizar(
                id,
                dto
        );

        ctx.status(204);
    }

    public void remover(Context ctx) {

        Long id =
                Long.valueOf(
                        ctx.pathParam("id")
                );

        service.remover(id);

        ctx.status(204);
    }
}
