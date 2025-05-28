package simra.model;

public class Sensor {
    private int id;
    private String localizacao;
    private String tipo; // Ex: Nível de Água, Pluviômetro, Movimento Solo
    private double leituraAtual;
    private String unidade; // Ex: metros, mm/h, cm/h
    private String status; // Ex: NORMAL, ATENÇÃO, ALERTA, CRÍTICO
    private AreaDeRisco areaDeRiscoAssociada; // Relacionamento com AreaDeRisco

    public Sensor(int id, String localizacao, String tipo, double leituraAtual, String unidade, String status) {
        this.id = id;
        this.localizacao = localizacao;
        this.tipo = tipo;
        this.leituraAtual = leituraAtual;
        this.unidade = unidade;
        this.status = status;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public String getTipo() {
        return tipo;
    }

    public double getLeituraAtual() {
        return leituraAtual;
    }

    public String getUnidade() {
        return unidade;
    }

    public String getStatus() {
        return status;
    }

    public AreaDeRisco getAreaDeRiscoAssociada() {
        return areaDeRiscoAssociada;
    }

    // Setters
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setLeituraAtual(double leituraAtual) {
        this.leituraAtual = leituraAtual;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAreaDeRiscoAssociada(AreaDeRisco areaDeRiscoAssociada) {
        this.areaDeRiscoAssociada = areaDeRiscoAssociada;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Local: " + localizacao +
                " | Tipo: " + tipo +
                " | Leitura: " + leituraAtual + " " + unidade +
                " | Status: " + status +
                (areaDeRiscoAssociada != null ? " | Área Risco: " + areaDeRiscoAssociada.getNome() : "");
    }
}