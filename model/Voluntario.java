package simra.model;

public class Voluntario {
    private int id;
    private String nome;
    private String telefone;
    private String especialidade; // Ex: Médico, Resgate, Logística
    private boolean disponivel;
    private Abrigo abrigo;

    public Voluntario(int id, String nome, String telefone, String especialidade, boolean disponivel, Abrigo abrigo) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.especialidade = especialidade;
        this.disponivel = disponivel;
        this.abrigo =  abrigo;

    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public Abrigo getAbrigo() {
        return abrigo;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public void setAbrigo(Abrigo abrigo) {
        this.abrigo = abrigo;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Nome: " + nome +
                " | Telefone: " + telefone +
                " | Especialidade: " + especialidade +
                " | Disponível: " + (disponivel ? "Sim" : "Não");
    }
}