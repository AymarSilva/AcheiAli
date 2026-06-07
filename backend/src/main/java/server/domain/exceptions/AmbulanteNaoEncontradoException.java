package server.domain.exceptions;

public class AmbulanteNaoEncontradoException extends RuntimeException {

    public AmbulanteNaoEncontradoException() {
        super("Ambulante não encontrado.");
    }
}
