package server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.javalin.Javalin;
import io.javalin.json.JavalinJackson;
import io.javalin.plugin.bundled.CorsPluginConfig;
import java.util.Map;

import server.controllers.AmbulanteController;
import server.controllers.AuthController;
import server.controllers.ClienteController;
import server.controllers.PontoVendaController;
import server.domain.exceptions.AmbulanteNaoEncontradoException;
import server.domain.exceptions.CredenciaisInvalidasException;
import server.domain.exceptions.PontoVendaNaoEncontradoException;
import server.infrastructure.repositories.AmbulanteRepository;
import server.infrastructure.repositories.ClienteRepository;
import server.infrastructure.repositories.PostgresCatalogoRepository;
import server.infrastructure.repositories.PostgresItemCatalogoRepository;
import server.infrastructure.repositories.PostgresAuthRepository;
import server.infrastructure.repositories.PontoVendaRepository;
import server.services.AmbulanteService;
import server.services.AuthService;
import server.services.ClienteService;
import server.services.PontoVendaService;

public class Main {

    public static void main(String[] args) {
        var clienteController = new ClienteController(
                new ClienteService(new ClienteRepository())
        );
        var catalogoRepository = new PostgresCatalogoRepository();
        var itemCatalogoRepository = new PostgresItemCatalogoRepository();
        var ambulanteService = new AmbulanteService(
                new AmbulanteRepository(),
                catalogoRepository,
                itemCatalogoRepository
        );
        var ambulanteController = new AmbulanteController(ambulanteService);
        var pontoVendaController = new PontoVendaController(
                new PontoVendaService(
                        new PontoVendaRepository(),
                        new AmbulanteRepository()
                )
        );
        var authController = new AuthController(
                new AuthService(new PostgresAuthRepository())
        );

        ObjectMapper mapper = new ObjectMapper()
                .configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        Javalin app = Javalin.create(config -> {
            config.jsonMapper(new JavalinJackson(mapper, false));
            config.bundledPlugins.enableCors(cors -> { cors.addRule(CorsPluginConfig.CorsRule::anyHost); });
        }).start(7070);

        app.get("/", ctx -> ctx.result("Servidor rodando"));

        app.exception(AmbulanteNaoEncontradoException.class, (exception, ctx) -> {
            ctx.status(404).json(Map.of("message", exception.getMessage()));
        });
        app.exception(PontoVendaNaoEncontradoException.class, (exception, ctx) -> {
            ctx.status(404).json(Map.of("message", exception.getMessage()));
        });
        app.exception(CredenciaisInvalidasException.class, (exception, ctx) -> {
            ctx.status(401).json(Map.of("message", exception.getMessage()));
        });
        app.exception(RuntimeException.class, (exception, ctx) -> {
            ctx.status(400).json(Map.of("message", exception.getMessage()));
        });

        app.post("/clientes", clienteController::criar);
        app.get("/clientes/{id}", clienteController::buscar);

        app.post("/ambulantes", ambulanteController::criar);

        app.get("/ambulantes/catalogos", ambulanteController::listarCatalogos);
        app.get("/ambulantes/{id}", ambulanteController::buscar);
        app.put("/ambulantes/{id}/plano", ambulanteController::alterarPlano);

        app.post("/login", authController::login);
        
        app.post("/ambulantes/{ambulanteId}/pontos-venda", pontoVendaController::criar);
        app.get("/pontos-venda/{id}", pontoVendaController::buscar);
        app.put("/pontos-venda/{id}", pontoVendaController::atualizar);
        app.delete("/pontos-venda/{id}", pontoVendaController::remover);

        app.get("/ambulantes/{ambulanteId}/catalogo", ambulanteController::buscarCatalogo);
        app.post("/ambulantes/{ambulanteId}/catalogo", ambulanteController::criarCatalogo);

        app.get("/catalogos/{catalogoId}/itens", ambulanteController::listarItensCatalogo);
        app.post("/catalogos/{catalogoId}/itens", ambulanteController::criarItemCatalogo);
        app.delete("/itens/{itemId}", ambulanteController::removerItemCatalogo);
    }
}
