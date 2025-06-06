package simra.model;
public class EquipeResgate {
    private int id;
    private String nome;
    private String contato;
    private int capacidadePessoas;
    private boolean disponivel;
    private int idAreaResgate;

    public EquipeResgate(int id, String nome, String contato, int capacidadePessoas, boolean disponivel, int idAreaResgate) {
        this.id = id;
        this.nome = nome;
        this.contato = contato;
        this.capacidadePessoas = capacidadePessoas;
        this.disponivel = disponivel;
        this.idAreaResgate = idAreaResgate;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getContato() {
        return contato;
    }

    public int getCapacidadePessoas() {
        return capacidadePessoas;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public int getIdAreaResgate() {
        return idAreaResgate;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public void setCapacidadePessoas(int capacidadePessoas) {
        this.capacidadePessoas = capacidadePessoas;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public void setIdAreaResgate(int idAreaResgate) {
        this.idAreaResgate = idAreaResgate;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Nome: " + nome +
                " | Contato: " + contato +
                " | Capacidade: " + capacidadePessoas +
                " | Disponível: " + (disponivel ? "Sim" : "Não") +
                " | ID Área de Resgate: " + idAreaResgate;
    }
}