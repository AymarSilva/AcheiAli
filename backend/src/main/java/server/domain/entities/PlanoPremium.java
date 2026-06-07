package server.domain.entities;

public final class PlanoPremium extends Plano {

    @Override
    public boolean permiteCatalogo() {
        return true;
    }

    @Override
    public int limitePontos() {
        return Integer.MAX_VALUE;
    }

    @Override
    public boolean permiteDestaque() {
        return true;
    }
}
