package server.domain.exceptions;

public class DocumentoObrigatorioException extends RuntimeException {

    public DocumentoObrigatorioException() {
        super("CPF ou CNPJ deve ser informado.");
    }

    public DocumentoObrigatorioException(String message) {
        super(message);
    }
}
