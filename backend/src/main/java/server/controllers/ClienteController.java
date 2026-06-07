package server.controllers;

import io.javalin.http.Context;
import server.controllers.dtos.CriarClienteDTO;
import server.services.ClienteService;

public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    public void criar(Context ctx) {

        CriarClienteDTO dto =
                ctx.bodyAsClass(CriarClienteDTO.class);

        var cliente = clienteService.criar(dto);

        ctx.status(201);
        ctx.json(cliente);
    }

    public void buscar(Context ctx) {
        Long id = Long.valueOf(ctx.pathParam("id"));
        ctx.json(clienteService.buscar(id));
    }
}
