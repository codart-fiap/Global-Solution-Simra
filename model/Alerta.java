package simra.model;
import java.time.LocalDateTime;

public class Alerta {
    private int id;
    private String titulo;
    private String descricao;
    private LocalDateTime dataHora;
    private String gravidade; // EX: ATENÇÃO, CRÍTICO, EMERGÊNCIA
    private AreaDeRisco areaAfetada;

    public Alerta(int id, String titulo, String descricao, LocalDateTime dataHora, String gravidade, AreaDeRisco areaAfetada) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataHora = dataHora;
        this.gravidade = gravidade;
        this.areaAfetada = areaAfetada;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getGravidade() {
        return gravidade;
    }

    public AreaDeRisco getAreaAfetada() {
        return areaAfetada;
    }

    // Setters
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setGravidade(String gravidade) {
        this.gravidade = gravidade;
    }

    public void setAreaAfetada(AreaDeRisco areaAfetada) {
        this.areaAfetada = areaAfetada;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Título: " + titulo +
                " | Gravidade: " + gravidade +
                " | Área: " + (areaAfetada != null ? areaAfetada.getNome() : "N/A") +
                " | Data/Hora: " + dataHora.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) +
                "\n   Descrição: " + descricao;
    }
}