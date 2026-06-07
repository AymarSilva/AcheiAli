package server.domain.exceptions;

public class PontoVendaNaoEncontradoException
        extends RuntimeException {

    public PontoVendaNaoEncontradoException() {
        super("Ponto de venda não encontrado.");
    }
}
