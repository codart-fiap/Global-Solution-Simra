package simra.service;

import simra.model.Alerta;
import simra.model.AreaDeRisco;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class AlertaService {
    private List<Alerta> alertas;
    private int nextAlertaId; // Contador para gerar IDs únicos

    public AlertaService() {
        this.alertas = new ArrayList<>();
        this.nextAlertaId = 101; // Começa de um ID para Alertas
        // Dados de exemplo podem ser carregados aqui ou na inicialização do SIMRA_App
    }

    /**
     * Gera um novo alerta e o adiciona à lista de alertas.
     * @param titulo Título do alerta.
     * @param descricao Descrição detalhada.
     * @param gravidade Gravidade do alerta (ATENÇÃO, CRÍTICO, EMERGÊNCIA).
     * @param areaAfetada Área de Risco associada ao alerta.
     * @return O objeto Alerta recém-criado.
     */
    public Alerta gerarAlerta(String titulo, String descricao, String gravidade, AreaDeRisco areaAfetada) {
        Alerta novoAlerta = new Alerta(nextAlertaId++, titulo, descricao, LocalDateTime.now(), gravidade, areaAfetada);
        this.alertas.add(novoAlerta);
        System.out.println("\nALERTA GERADO: " + novoAlerta.getTitulo() + " (Gravidade: " + novoAlerta.getGravidade() + ") para " + areaAfetada.getNome() + "!");
        return novoAlerta;
    }

    /**
     * Lista todos os alertas ativos (não CONCLUÍDO).
     */
    public void listarAlertasAtivos() {
        List<Alerta> ativos = new ArrayList<>();
        for (Alerta a : alertas) {
            // Se você adicionar um status de CONCLUÍDO para alertas no futuro
            // if (!a.getStatus().equalsIgnoreCase("CONCLUIDO")) {
            //    ativos.add(a);
            // }
            ativos.add(a); // Por enquanto, todos são considerados ativos
        }

        if (ativos.isEmpty()) {
            System.out.println("Nenhum alerta ativo no momento.");
        } else {
            System.out.println("--- ALERTAS ATIVOS ---");
            ativos.forEach(System.out::println);
        }
    }

    /**
     * Busca um alerta pelo ID.
     * @param id O ID do alerta.
     * @return Um Optional contendo o Alerta se encontrado, ou um Optional vazio.
     */
    public Optional<Alerta> buscarAlertaPorId(int id) {
        return alertas.stream()
                .filter(alerta -> alerta.getId() == id)
                .findFirst();
    }

    /**
     * Atualiza a gravidade e descrição de um alerta existente.
     * @param id O ID do alerta a ser atualizado.
     * @param novaGravidade Nova gravidade do alerta.
     * @param novaDescricao Nova descrição do alerta.
     * @return true se o alerta foi atualizado, false caso contrário.
     */
    public boolean atualizarAlerta(int id, String novaGravidade, String novaDescricao) {
        Optional<Alerta> optAlerta = buscarAlertaPorId(id);
        if (optAlerta.isPresent()) {
            Alerta alerta = optAlerta.get();
            alerta.setGravidade(novaGravidade);
            alerta.setDescricao(novaDescricao);
            System.out.println("Alerta ID " + id + " atualizado com sucesso.");
            return true;
        }
        System.out.println("Alerta ID " + id + " não encontrado para atualização.");
        return false;
    }

    /**
     * Remove um alerta pelo ID.
     * @param id O ID do alerta a ser removido.
     * @return true se o alerta foi removido, false caso contrário.
     */
    public boolean removerAlerta(int id) {
        boolean removido = alertas.removeIf(alerta -> alerta.getId() == id);
        if (removido) {
            System.out.println("Alerta ID " + id + " removido com sucesso.");
        } else {
            System.out.println("Alerta ID " + id + " não encontrado para remoção.");
        }
        return removido;
    }

    public List<Alerta> getAlertas() {
        return new ArrayList<>(alertas);
    }
}