package server.domain.exceptions;

public class PlanoNaoPermiteCatalogoException extends RuntimeException {

    public PlanoNaoPermiteCatalogoException(
            String mensagem
    ) {
        super(mensagem);
    }
}
