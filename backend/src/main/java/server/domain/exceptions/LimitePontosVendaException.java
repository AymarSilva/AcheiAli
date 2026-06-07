package server.domain.exceptions;

public class LimitePontosVendaException extends RuntimeException {

    public LimitePontosVendaException() {
        super("Limite de pontos de venda atingido.");
    }

    public LimitePontosVendaException(
            String mensagem
    ) {
        super(mensagem);
    }
}
