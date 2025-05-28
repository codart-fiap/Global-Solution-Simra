package simra.model;

public class AreaDeRisco {
    private int id;
    private String nome;
    private String localizacao;
    private double limiarAlerta;
    private String grauRisco; // Ex: BAIXO, MÉDIO, ALTO

    public AreaDeRisco(int id, String nome, String localizacao, double limiarAlerta, String grauRisco) {
        this.id = id;
        this.nome = nome;
        this.localizacao = localizacao;
        this.limiarAlerta = limiarAlerta;
        this.grauRisco = grauRisco;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public double getLimiarAlerta() {
        return limiarAlerta;
    }

    public String getGrauRisco() {
        return grauRisco;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setLimiarAlerta(double limiarAlerta) {
        this.limiarAlerta = limiarAlerta;
    }

    public void setGrauRisco(String grauRisco) {
        this.grauRisco = grauRisco;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Nome: " + nome +
                " | Localização: " + localizacao +
                " | Limiar Alerta: " + limiarAlerta +
                " | Grau de Risco: " + grauRisco;
    }
}