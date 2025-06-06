package simra.service;
import simra.model.EquipeResgate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public class EquipeResgateService {
    private List<EquipeResgate> equipes;
    private int nextEquipeId;

    public EquipeResgateService() {
        this.equipes = new ArrayList<>();
        this.nextEquipeId = 801;
        cadastrarEquipe("Corpo De Bombeiros", "193", 100, true, 1);
        cadastrarEquipe("Policia", "190", 150, true, 2);
        cadastrarEquipe("Defesa Civil", "199", 100, true, 3);
    }

    public EquipeResgate cadastrarEquipe(String nome, String contato, int capacidadePessoas, boolean disponivel, int idAreaResgate) {
        EquipeResgate novaEquipe = new EquipeResgate(nextEquipeId++, nome, contato, capacidadePessoas, disponivel, idAreaResgate);
        this.equipes.add(novaEquipe);
        System.out.println("Equipe '" + nome + "' cadastrado com sucesso! ID: " + novaEquipe.getId());
        return novaEquipe;
    }

    public void listarEquipes() {
        if (equipes.isEmpty()) {
            System.out.println("Nenhuma Equipe cadastrada.");
        } else {
            System.out.println("--- EQUIPES CADASTRADAS ---");
            equipes.forEach(System.out::println);
        }
    }

    public boolean removerEquipe(int equipeId) {
        boolean removido = equipes.removeIf(equipe -> equipe.getId() == equipeId);
        if (removido) {
            System.out.println("Abrigo ID " + equipeId + " removido com sucesso.");
        } else {
            System.out.println("Abrigo ID " + equipeId + " não encontrado para remoção.");
        }
        return removido;
    }
}
