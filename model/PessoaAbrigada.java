package simra.model;

import java.time.LocalDate;

public class PessoaAbrigada {
    private int id;
    private String nome;
    private int idade;
    private String genero;
    private Abrigo abrigo; // Objeto Abrigo para o relacionamento
    private LocalDate dataEntrada;

    public PessoaAbrigada(int id, String nome, int idade, String genero, Abrigo abrigo, LocalDate dataEntrada) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.abrigo = abrigo;
        this.dataEntrada = dataEntrada;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public int getIdade() {
        return idade;
    }

    public String getGenero() {
        return genero;
    }

    public Abrigo getAbrigo() {
        return abrigo;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    // Setters
    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void setAbrigo(Abrigo abrigo) {
        this.abrigo = abrigo;
    }

    @Override
    public String toString() {
        return "ID: " + id +
                " | Nome: " + nome +
                " | Idade: " + idade +
                " | Gênero: " + genero +
                " | Abrigo: " + (abrigo != null ? abrigo.getNome() : "N/A") +
                " | Entrada: " + dataEntrada.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}