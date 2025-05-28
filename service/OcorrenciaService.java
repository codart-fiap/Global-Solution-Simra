package simra.service;

import simra.model.AreaDeRisco;
import simra.model.OcorrenciaAlagamento;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OcorrenciaService {
    private List<OcorrenciaAlagamento> ocorrencias;
    private int nextOcorrenciaId;

    public OcorrenciaService() {
        this.ocorrencias = new ArrayList<>();
        this.nextOcorrenciaId = 201;

        // Dados de exemplo
        registrarOcorrencia("Rua das Palmeiras, 123", "Alagamento na rua, água entrando nas casas.", "PENDENTE", "Resgate e Abrigo", null);
        registrarOcorrencia("Avenida Principal, 500", "Carros ilhados no viaduto.", "EM ATENDIMENTO", "Reboque", null);
        registrarOcorrencia("Bairro Novo Horizonte - Rua Larga", "Queda de árvore bloqueando a rua.", "CONCLUÍDO", "Remoção de Obstáculo", null);
    }

    /**
     * Registra uma nova ocorrência de alagamento ou solicitação de ajuda.
     * @param localizacao O local da ocorrência.
     * @param descricao A descrição do problema.
     * @param status O status inicial (PENDENTE, EM ATENDIMENTO, CONCLUÍDO).
     * @param tipoAjuda O tipo de ajuda necessária.
     * @param areaAssociada A área de risco associada (pode ser null).
     * @return O objeto OcorrenciaAlagamento criado.
     */
    public OcorrenciaAlagamento registrarOcorrencia(String localizacao, String descricao, String status, String tipoAjuda, AreaDeRisco areaAssociada) {
        OcorrenciaAlagamento novaOcorrencia = new OcorrenciaAlagamento(nextOcorrenciaId++, localizacao, descricao, LocalDateTime.now(), status, tipoAjuda, areaAssociada);
        this.ocorrencias.add(novaOcorrencia);
        System.out.println("Ocorrência registrada com sucesso! ID: " + novaOcorrencia.getId());
        return novaOcorrencia;
    }

    /**
     * Lista todas as ocorrências.
     */
    public void listarOcorrencias() {
        if (ocorrencias.isEmpty()) {
            System.out.println("Nenhuma ocorrência registrada.");
        } else {
            System.out.println("--- OCORRÊNCIAS REGISTRADAS ---");
            ocorrencias.forEach(System.out::println);
        }
    }

    /**
     * Lista ocorrências com status PENDENTE ou EM ATENDIMENTO.
     */
    public void listarOcorrenciasPendentesEEmAtendimento() {
        System.out.println("--- OCORRÊNCIAS PENDENTES E EM ATENDIMENTO ---");
        boolean found = false;
        for (OcorrenciaAlagamento o : ocorrencias) {
            if (o.getStatus().equalsIgnoreCase("PENDENTE") || o.getStatus().equalsIgnoreCase("EM ATENDIMENTO")) {
                System.out.println(o);
                found = true;
            }
        }
        if (!found) {
            System.out.println("Nenhuma ocorrência pendente ou em atendimento.");
        }
    }

    /**
     * Busca uma ocorrência pelo ID.
     * @param id O ID da ocorrência.
     * @return Um Optional contendo a OcorrenciaAlagamento se encontrada, ou um Optional vazio.
     */
    public Optional<OcorrenciaAlagamento> buscarOcorrenciaPorId(int id) {
        return ocorrencias.stream()
                .filter(ocorrencia -> ocorrencia.getId() == id)
                .findFirst();
    }

    /**
     * Atualiza o status de uma ocorrência.
     * @param id O ID da ocorrência.
     * @param novoStatus O novo status.
     * @return true se a ocorrência foi atualizada, false caso contrário.
     */
    public boolean atualizarStatusOcorrencia(int id, String novoStatus) {
        Optional<OcorrenciaAlagamento> optOcorrencia = buscarOcorrenciaPorId(id);
        if (optOcorrencia.isPresent()) {
            OcorrenciaAlagamento ocorrencia = optOcorrencia.get();
            ocorrencia.setStatus(novoStatus);
            System.out.println("Status da ocorrência ID " + id + " atualizado para '" + novoStatus + "'.");
            return true;
        }
        System.out.println("Ocorrência ID " + id + " não encontrada para atualização.");
        return false;
    }

    /**
     * Remove uma ocorrência pelo ID.
     * @param id O ID da ocorrência a ser removida.
     * @return true se a ocorrência foi removida, false caso contrário.
     */
    public boolean removerOcorrencia(int id) {
        boolean removido = ocorrencias.removeIf(ocorrencia -> ocorrencia.getId() == id);
        if (removido) {
            System.out.println("Ocorrência ID " + id + " removida com sucesso.");
        } else {
            System.out.println("Ocorrência ID " + id + " não encontrada para remoção.");
        }
        return removido;
    }
}