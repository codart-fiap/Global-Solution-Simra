package simra.service;

import simra.model.Abrigo;
import simra.model.PessoaAbrigada;
import simra.model.Voluntario;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class AbrigoService {
    private List<Abrigo> abrigos;
    private List<PessoaAbrigada> pessoasAbrigadas;
    private List<Voluntario> voluntarios;
    private int nextAbrigoId;
    private int nextPessoaAbrigadaId;
    private int nextVoluntarioId;

    public AbrigoService() {
        this.abrigos = new ArrayList<>();
        this.pessoasAbrigadas = new ArrayList<>();
        this.voluntarios = new ArrayList<>();
        this.nextAbrigoId = 301;
        this.nextPessoaAbrigadaId = 501;
        this.nextVoluntarioId = 401;

        // Dados de exemplo
        cadastrarAbrigo("Ginásio Municipal", "Praça Cívica, s/n", 200);
        cadastrarAbrigo("Escola Amarela", "Rua das Flores, 45", 100);

        // Registrar algumas pessoas em abrigos de exemplo
        registrarPessoaEmAbrigo(1, "Maria Souza", 35, "Feminino", abrigos.get(0));
        registrarPessoaEmAbrigo(2, "João Pereira", 10, "Masculino", abrigos.get(0));
        registrarPessoaEmAbrigo(3, "Carlos Silva", 50, "Masculino", abrigos.get(1));

        // Registra Voluntários de exemplo no abrigo
        registrarVoluntario(1, "João Cunha", "14 98871111", "médico", true, abrigos.get(0));
        registrarVoluntario(1, "Marcelo Santos", "14 98842222", "enfermeiro", true, abrigos.get(1));
    }

    // --- CRUD Abrigo ---

    /**
     * Cadastra um novo abrigo.
     */
    public Abrigo cadastrarAbrigo(String nome, String endereco, int capacidade) {
        Abrigo novoAbrigo = new Abrigo(nextAbrigoId++, nome, endereco, capacidade, capacidade, "Telefone do Abrigo");
        this.abrigos.add(novoAbrigo);
        System.out.println("Abrigo '" + nome + "' cadastrado com sucesso! ID: " + novoAbrigo.getId());
        return novoAbrigo;
    }

    /**
     * Lista todos os abrigos cadastrados.
     */
    public void listarAbrigos() {
        if (abrigos.isEmpty()) {
            System.out.println("Nenhum abrigo cadastrado.");
        } else {
            System.out.println("--- ABRIGOS CADASTRADOS ---");
            abrigos.forEach(System.out::println);
        }
    }

    /**
     * Busca um abrigo pelo ID.
     * @param id O ID do abrigo.
     * @return Um Optional contendo o Abrigo se encontrado, ou um Optional vazio.
     */
    public Optional<Abrigo> buscarAbrigoPorId(int id) {
        return abrigos.stream()
                .filter(abrigo -> abrigo.getId() == id)
                .findFirst();
    }

    /**
     * Atualiza as informações de um abrigo.
     * A atualização de vagas é feita ao registrar/remover pessoas.
     */
    public boolean atualizarAbrigo(int id, String novoNome, String novoEndereco, String novoTelefone) {
        Optional<Abrigo> optAbrigo = buscarAbrigoPorId(id);
        if (optAbrigo.isPresent()) {
            Abrigo abrigo = optAbrigo.get();
            abrigo.setNome(novoNome);
            abrigo.setEndereco(novoEndereco);
            abrigo.setTelefone(novoTelefone);
            System.out.println("Abrigo ID " + id + " atualizado com sucesso.");
            return true;
        }
        System.out.println("Abrigo ID " + id + " não encontrado para atualização.");
        return false;
    }

    /**
     * Remove um abrigo pelo ID.
     * (Considerar a lógica de remover pessoas abrigadas primeiro, ou mover para outro abrigo)
     */
    public boolean removerAbrigo(int id) {
        // Antes de remover o abrigo, verificar se há pessoas abrigadas nele
        List<PessoaAbrigada> pessoasNoAbrigo = pessoasAbrigadas.stream()
                .filter(p -> p.getAbrigo() != null && p.getAbrigo().getId() == id)
                .collect(Collectors.toList());
        if (!pessoasNoAbrigo.isEmpty()) {
            System.out.println("Não é possível remover o abrigo ID " + id + ". Existem " + pessoasNoAbrigo.size() + " pessoas abrigadas nele.");
            return false;
        }

        boolean removido = abrigos.removeIf(abrigo -> abrigo.getId() == id);
        if (removido) {
            System.out.println("Abrigo ID " + id + " removido com sucesso.");
        } else {
            System.out.println("Abrigo ID " + id + " não encontrado para remoção.");
        }
        return removido;
    }

    // --- CRUD Pessoa Abrigada ---

    /**
     * Registra uma pessoa em um abrigo.
     * @param idade A idade da pessoa.
     * @param genero O gênero da pessoa.
     * @param abrigo O objeto Abrigo onde a pessoa será registrada.
     * @return A PessoaAbrigada recém-criada, ou null se o abrigo estiver lotado.
     */
    public PessoaAbrigada registrarPessoaEmAbrigo(int id, String nome, int idade, String genero, Abrigo abrigo) {
        return registrarEmAbrigo(
            abrigo,
            pessoasAbrigadas,
            () -> new PessoaAbrigada(nextPessoaAbrigadaId++, nome, idade, genero, abrigo, LocalDate.now()),
            "Pessoa '" + nome + "'"
        );   
    }

    private <T> T registrarEmAbrigo(
        Abrigo abrigo,
        List<T> lista,
        Supplier<T> criador,
        String nome
    ) {
        if (abrigo.getVagasDisponiveis() > 0) {
            T novo = criador.get();
            lista.add(novo);
            abrigo.setVagasDisponiveis(abrigo.getVagasDisponiveis() - 1);
            System.out.println(nome + " registrado(a) no abrigo '" + abrigo.getNome() + "'. Vagas restantes: " + abrigo.getVagasDisponiveis());
            return novo;
        } else {
            System.out.println("Abrigo '" + abrigo.getNome() + "' está lotado. Não é possível registrar " + nome + ".");
            return null;
        }
    }

    /**
     * Lista todas as pessoas abrigadas.
     */
    public void listarPessoasAbrigadas() {
        if (pessoasAbrigadas.isEmpty()) {
            System.out.println("Nenhuma pessoa abrigada registrada.");
        } else {
            System.out.println("--- PESSOAS ABRIGADAS ---");
            pessoasAbrigadas.forEach(System.out::println);
        }
    }

    /**
     * Remove uma pessoa de um abrigo.
     * @param pessoaId O ID da pessoa a ser removida.
     * @return true se a pessoa foi removida, false caso contrário.
     */
    public boolean removerPessoaDeAbrigo(int pessoaId) {
        return removerDeAbrigoGenerico(
        pessoaId,
        pessoasAbrigadas,
        PessoaAbrigada::getId,
        PessoaAbrigada::getAbrigo,
        PessoaAbrigada::getNome,
        "Pessoa abrigada"
        );
    }

    private <T> boolean removerDeAbrigoGenerico(
        int id,
        List<T> lista,
        Function<T, Integer> getId,
        Function<T, Abrigo> getAbrigo,
        Function<T, String> getNome,
        String tipo
    ) {
        Optional<T> opt = lista.stream()
                .filter(obj -> getId.apply(obj) == id)
                .findFirst();
        if (opt.isPresent()) {
            T obj = opt.get();
            Abrigo abrigo = getAbrigo.apply(obj);
            if (abrigo != null) {
                abrigo.setVagasDisponiveis(abrigo.getVagasDisponiveis() + 1);
            }
            lista.remove(obj);
            System.out.println(tipo + " ID " + id + " (" + getNome.apply(obj) + ") removido do abrigo. Vaga liberada.");
            return true;
        }
    System.out.println(tipo + " ID " + id + " não encontrado.");
    return false;
    }

    // --- CRUD Voluntário ---

    public Voluntario registrarVoluntario(int id, String nome, String telefone, String especialidade, boolean disponivel, Abrigo abrigo) {
        return registrarEmAbrigo(
            abrigo,
            voluntarios,
            () -> new Voluntario(nextVoluntarioId++, nome, telefone, especialidade, disponivel, abrigo),
            "Voluntário '" + nome + "'"
        );
    }

    public void listarVoluntarios(boolean apenasDisponiveis) {
        List<Voluntario> listaParaMostrar = apenasDisponiveis
            ? voluntarios.stream().filter(Voluntario::isDisponivel).toList()
            : voluntarios;

        if (listaParaMostrar.isEmpty()) {
            System.out.println(apenasDisponiveis
                ? "Nenhum voluntário disponível no momento."
                : "Nenhum voluntário registrado.");
        } else {
            System.out.println(apenasDisponiveis
                ? "--- VOLUNTÁRIOS DISPONÍVEIS ---"
                : "--- TODOS OS VOLUNTÁRIOS ---");
            listaParaMostrar.forEach(System.out::println);
        }
    }

    public removerVoluntarioDeAbrigo(int voluntarioId) {
        return removerDeAbrigoGenerico(
        voluntarioId,
        voluntarios,
        Voluntario::getId,
        Voluntario::getAbrigo,
        Voluntario::getNome,
        "Voluntário"
        );
    }

    // Métodos para obter as listas (útil para dashboard ou outras classes)
    public List<Abrigo> getAbrigos() {
        return new ArrayList<>(abrigos);
    }

    public List<PessoaAbrigada> getPessoasAbrigadas() {
        return new ArrayList<>(pessoasAbrigadas);
    }

    public List<Voluntario> getVoluntarios() {
        return new ArrayList<>(voluntarios);
    }
}