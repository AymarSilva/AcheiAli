package server.services;

import server.controllers.dtos.LoginDTO;
import server.controllers.dtos.LoginResponseDTO;
import server.domain.entities.Usuario;
import server.domain.exceptions.CredenciaisInvalidasException;
import server.infrastructure.repositories.interfaces.AuthRepository;

public class AuthService {

    private final AuthRepository authRepository;

    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public LoginResponseDTO login(LoginDTO dto) {

        Usuario usuario =
                authRepository
                        .buscarPorDocumento(
                                dto.documento()
                        )
                        .orElseThrow(
                                CredenciaisInvalidasException::new
                        );

        if (!usuario.getSenha()
                .equals(dto.senha())) {

            throw new CredenciaisInvalidasException();
        }

        return new LoginResponseDTO(
                String.valueOf(usuario instanceof server.infrastructure.entities.InfraCliente cliente ? cliente.getId() :
                        usuario instanceof server.infrastructure.entities.InfraAmbulante ambulante ? ambulante.getId() : null),
                usuario.getNome(),
                usuario.getClass()
                        .getSimpleName()
                        .toUpperCase()
        );
    }
}
