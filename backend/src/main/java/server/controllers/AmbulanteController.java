package server.controllers;

import io.javalin.http.Context;
import server.controllers.dtos.CriarAmbulanteDTO;
import server.controllers.dtos.CriarCatalogoDTO;
import server.controllers.dtos.CriarItemDTO;
import server.controllers.dtos.UpgradePlanoDTO;
import server.services.AmbulanteService;

public class AmbulanteController {

    private final AmbulanteService service;

    public AmbulanteController(AmbulanteService service) {
        this.service = service;
    }

    public void criar(Context ctx) {
        CriarAmbulanteDTO dto = ctx.bodyAsClass(CriarAmbulanteDTO.class);
        ctx.status(201).json(service.criar(dto));
    }

    public void buscar(Context ctx) {
        Long id = Long.valueOf(ctx.pathParam("id"));
        ctx.json(service.buscar(id));
    }

    public void alterarPlano(Context ctx) {
        Long id = Long.valueOf(ctx.pathParam("id"));
        UpgradePlanoDTO dto = ctx.bodyAsClass(UpgradePlanoDTO.class);
        ctx.json(service.alterarPlano(id, dto));
    }

    public void listarCatalogos(Context ctx) {
        ctx.json(service.listarCatalogos());
    }

    public void buscarCatalogo(Context ctx) {
        Long ambulanteId = Long.valueOf(ctx.pathParam("ambulanteId"));
        ctx.json(service.buscarCatalogo(ambulanteId));
    }

    public void criarCatalogo(Context ctx) {
        Long ambulanteId = Long.valueOf(ctx.pathParam("ambulanteId"));
        CriarCatalogoDTO dto = ctx.bodyAsClass(CriarCatalogoDTO.class);
        ctx.status(201).json(service.criarCatalogo(ambulanteId, dto));
    }

    public void listarItensCatalogo(Context ctx) {
        Long catalogoId = Long.valueOf(ctx.pathParam("catalogoId"));
        ctx.json(service.listarItensCatalogo(catalogoId));
    }

    public void criarItemCatalogo(Context ctx) {
        Long catalogoId = Long.valueOf(ctx.pathParam("catalogoId"));
        CriarItemDTO dto = ctx.bodyAsClass(CriarItemDTO.class);
        ctx.status(201).json(service.criarItemCatalogo(catalogoId, dto));
    }

    public void removerItemCatalogo(Context ctx) {
        Long itemId = Long.valueOf(ctx.pathParam("itemId"));
        service.removerItemCatalogo(itemId);
        ctx.status(204);
    }
}
