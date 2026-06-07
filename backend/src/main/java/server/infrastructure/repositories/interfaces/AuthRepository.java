package server.infrastructure.repositories.interfaces;

import java.util.Optional;
import server.domain.entities.Usuario;

public interface AuthRepository {

    Optional<Usuario> buscarPorDocumento(String documento);
}
