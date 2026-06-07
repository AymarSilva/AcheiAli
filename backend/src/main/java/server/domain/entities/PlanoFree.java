package server.domain.entities;

public final class PlanoFree extends Plano {

    @Override
    public boolean permiteCatalogo() {
        return false;
    }

    @Override
    public int limitePontos() {
        return 1;
    }

    @Override
    public boolean permiteDestaque() {
        return false;
    }
}
