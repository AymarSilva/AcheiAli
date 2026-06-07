package server.domain.exceptions;

public class CredenciaisInvalidasException
        extends RuntimeException {

    public CredenciaisInvalidasException() {
        super("Documento ou senha inválidos.");
    }
}
