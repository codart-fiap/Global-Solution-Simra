package simra.model;

public class Abrigo {
    private int id;
    private String nome;
    private String endereco;
    private int capacidade;
    private int vagasDisponiveis;
    private String telefone;

    public Abrigo(int id, String nome, String endereco, int capacidade, int vagasDisponiveis, String telefone) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.capacidade = capacidade;
        this.vagasDisponiveis = vagasDisponiveis;
        this.telefone = telefone;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public int getVagasDisponiveis() {
        return vagasDisponiveis;
    }

    public String getTelefone() {
        return telefone;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public void setVagasDisponiveis(int vagasDisponiveis) {
        this.vagasDisponiveis = vagasDisponiveis;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Nome: " + nome +
                " | Endereço: " + endereco +
                " | Capacidade: " + capacidade +
                " | Vagas: " + vagasDisponiveis +
                " | Telefone: " + telefone;
    }
}