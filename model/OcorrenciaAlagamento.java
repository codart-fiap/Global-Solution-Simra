package simra.model;
import java.time.LocalDateTime;


public class OcorrenciaAlagamento {
    private int id;
    private String localizacao;
    private String descricao;
    private LocalDateTime dataHora;
    private String status; // Ex: PENDENTE, EM ATENDIMENTO, CONCLUÍDO
    private String tipoAjuda; // Ex: Resgate, Abrigo, Alimentos
    private AreaDeRisco areaAssociada; // Opcional: pode ser nula se a ocorrência não tiver área específica

    public OcorrenciaAlagamento(int id, String localizacao, String descricao, LocalDateTime dataHora, String status, String tipoAjuda, AreaDeRisco areaAssociada) {
        this.id = id;
        this.localizacao = localizacao;
        this.descricao = descricao;
        this.dataHora = dataHora;
        this.status = status;
        this.tipoAjuda = tipoAjuda;
        this.areaAssociada = areaAssociada;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public String getStatus() {
        return status;
    }

    public String getTipoAjuda() {
        return tipoAjuda;
    }

    public AreaDeRisco getAreaAssociada() {
        return areaAssociada;
    }

    // Setters
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTipoAjuda(String tipoAjuda) {
        this.tipoAjuda = tipoAjuda;
    }

    public void setAreaAssociada(AreaDeRisco areaAssociada) {
        this.areaAssociada = areaAssociada;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Local: " + localizacao +
                " | Status: " + status +
                " | Ajuda: " + tipoAjuda +
                " | Data/Hora: " + dataHora.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")) +
                "\n   Descrição: " + descricao +
                (areaAssociada != null ? " | Área Risco: " + areaAssociada.getNome() : "");
    }
}