package server.domain.exceptions;

public class AmbulanteJaExisteException extends RuntimeException {

    public AmbulanteJaExisteException() {
        super("Já existe um ambulante cadastrado com este documento.");
    }

    public AmbulanteJaExisteException(String message) {
        super(message);
    }
}
