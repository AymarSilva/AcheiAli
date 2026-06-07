package server.controllers;

import io.javalin.http.Context;
import server.controllers.dtos.LoginDTO;
import server.services.AuthService;

public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    public void login(Context ctx) {
        ctx.json(authService.login(ctx.bodyAsClass(LoginDTO.class)));
    }
}
