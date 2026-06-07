package server.domain.entities;

public class PontoVenda {

    private String nome;
    private double latitude;
    private double longitude;
    private boolean disponivel;

    public PontoVenda(
            String nome,
            double latitude,
            double longitude
    ) {
        this.nome = nome;
        this.latitude = latitude;
        this.longitude = longitude;
        this.disponivel = true;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public String getNome() {
        return nome;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setAtivo(Boolean ativo) {
        this.disponivel = ativo != null && ativo;
    }
}
