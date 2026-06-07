package server.domain.exceptions;

public class ClienteJaExisteException extends RuntimeException {

    public ClienteJaExisteException() {
        super("Já existe um cliente cadastrado com este CPF.");
    }

    public ClienteJaExisteException(String message) {
        super(message);
    }
}
