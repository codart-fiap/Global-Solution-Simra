package simra.app;

import simra.model.Abrigo;
import simra.model.AreaDeRisco;
import simra.model.OcorrenciaAlagamento;
import simra.model.Sensor;
import simra.service.AbrigoService;
import simra.service.OcorrenciaService;
import simra.service.EquipeResgateService;
import simra.service.SensorService;

import java.util.InputMismatchException;
import java.util.Optional;
import java.util.Scanner;

public class Simra_App {
    private static Scanner scanner = new Scanner(System.in);
    private static SensorService sensorService = new SensorService();
    private static OcorrenciaService ocorrenciaService = new OcorrenciaService();
    private static AbrigoService abrigoService = new AbrigoService();
    private static EquipeResgateService equipeResgateService = new EquipeResgateService();

    public static void main(String[] args) {
        System.out.println("Bem-vindo ao SIMRA - Sistema Integrado de Monitoramento e Resposta a Alagamentos!");

        int opcao;
        do {
            exibirMenuPrincipal();
            opcao = lerInteiro();

            switch (opcao) {
                case 1:
                    sensorService.exibirStatusSensoresEAlertas();
                    break;
                case 2:
                    menuSimularLeituraSensor();
                    break;
                case 3:
                    menuRegistrarOcorrencia();
                    break;
                case 4:
                    menuGerenciarAbrigos();
                    break;
                case 5:
                    menuGerenciarAreasDeRisco();
                    break;
                case 6: // NOVO CASE AQUI
                    menuGerenciarOcorrencias();
                    break;
                case 7:
                    menuGerenciarEquipesDeResgate();
                    break;
                case 0:
                    System.out.println("Saindo do SIMRA. Até mais!");
                    break;
                default:
                    System.out.println("Opção inválida. Por favor, digite um número entre 0 e 6.");
            }
        } while (opcao != 0);

        scanner.close(); 
    }

    private static void exibirMenuPrincipal() {
        System.out.println("\n--- MENU PRINCIPAL SIMRA ---");
        System.out.println("1. Dashboard de Monitoramento (Sensores e Alertas)");
        System.out.println("2. Simular Leitura de Sensor (e verificar Alertas)");
        System.out.println("3. Registrar Nova Ocorrência");
        System.out.println("4. Gerenciar Abrigos, Pessoas Abrigadas e Voluntários");
        System.out.println("5. Gerenciar Áreas de Risco");
        System.out.println("6. Gerenciar Ocorrências"); // NOVA OPÇÃO AQUI
        System.out.println("7. Gerenciar Equipes de Resgate");
        System.out.println("0. Sair");
        System.out.print("Escolha uma opção: ");
    }

    private static void menuSimularLeituraSensor() {
        System.out.println("\n--- SIMULAR LEITURA DE SENSOR ---");
        sensorService.listarSensores();
        if (sensorService.getSensores().isEmpty()) {
            System.out.println("Não há sensores cadastrados para simular leitura.");
            return;
        }

        System.out.print("Digite o ID do sensor que deseja atualizar: ");
        int idSensor = lerInteiro();
        Optional<Sensor> optSensor = sensorService.buscarSensorPorId(idSensor);

        if (optSensor.isPresent()) {
            Sensor sensor = optSensor.get();
            System.out.print("Digite a nova leitura para o sensor " + sensor.getLocalizacao() + " (" + sensor.getUnidade() + "): ");
            double novaLeitura = lerDouble();
            sensorService.simularLeituraSensorEVerificarAlerta(sensor, novaLeitura);
        } else {
            System.out.println("Sensor não encontrado com o ID: " + idSensor);
        }
    }

    private static void menuRegistrarOcorrencia() {
        System.out.println("\n--- REGISTRAR NOVA OCORRÊNCIA ---");
        System.out.print("Localização da ocorrência: ");
        String localizacao = scanner.nextLine();
        System.out.print("Descrição do problema: ");
        String descricao = scanner.nextLine();
        System.out.print("Tipo de ajuda necessária (Ex: Resgate, Abrigo, Alimentos): ");
        String tipoAjuda = scanner.nextLine();

        // Opcional: Associar a uma área de risco existente
        System.out.print("Associar a uma Área de Risco existente? (s/n): ");
        String associarArea = scanner.nextLine().toLowerCase();
        AreaDeRisco areaAssociada = null;
        if (associarArea.equals("s")) {
            sensorService.listarAreasDeRisco();
            System.out.print("Digite o ID da Área de Risco: ");
            int idArea = lerInteiro();
            Optional<AreaDeRisco> optArea = sensorService.buscarAreaDeRiscoPorId(idArea);
            if (optArea.isPresent()) {
                areaAssociada = optArea.get();
                System.out.println("Ocorrência associada à área: " + areaAssociada.getNome());
            } else {
                System.out.println("Área de Risco não encontrada. Ocorrência não será associada.");
            }
        }

        ocorrenciaService.registrarOcorrencia(localizacao, descricao, "PENDENTE", tipoAjuda, areaAssociada);
    }

    private static void menuGerenciarAbrigos() {
        int opcaoAbrigo;
        do {
            System.out.println("\n--- GERENCIAR ABRIGOS ---");
            System.out.println("1. Cadastrar Novo Abrigo");
            System.out.println("2. Listar Abrigos");
            System.out.println("3. Atualizar Abrigo");
            System.out.println("4. Remover Abrigo");
            System.out.println("\n--- GERENCIAR PESSOAS ABRIGADAS ---");
            System.out.println("5. Registrar Pessoa em Abrigo");
            System.out.println("6. Listar Pessoas Abrigadas");
            System.out.println("7. Remover Pessoa de Abrigo");
            System.out.println("\n--- GERENCIAR VOLUNTÁRIOS ---");
            System.out.println("8. Registrar Voluntário em Abrigo");
            System.out.println("9. Listar Voluntários disponiveis ou não");
            System.out.println("10. Remover Voluntário de Abrigo");
            System.out.println("\n--- SAIR ---");
            System.out.println("0. Voltar ao Menu Principal");
            System.out.print("Escolha uma opção: ");
            opcaoAbrigo = lerInteiro();

            switch (opcaoAbrigo) {
                case 1:
                    System.out.print("Nome do novo abrigo: ");
                    String nomeAbrigo = scanner.nextLine();
                    System.out.print("Endereço do abrigo: ");
                    String enderecoAbrigo = scanner.nextLine();
                    System.out.print("Capacidade máxima: ");
                    int capacidadeAbrigo = lerInteiro();
                    abrigoService.cadastrarAbrigo(nomeAbrigo, enderecoAbrigo, capacidadeAbrigo);
                    break;
                case 2:
                    abrigoService.listarAbrigos();
                    break;
                case 3:
                    System.out.print("ID do abrigo para atualizar: ");
                    int idAtualizarAbrigo = lerInteiro();
                    Optional<Abrigo> abrigoParaAtualizar = abrigoService.buscarAbrigoPorId(idAtualizarAbrigo);
                    if (abrigoParaAtualizar.isPresent()) {
                        System.out.print("Novo nome (" + abrigoParaAtualizar.get().getNome() + "): ");
                        String novoNome = scanner.nextLine();
                        System.out.print("Novo endereço (" + abrigoParaAtualizar.get().getEndereco() + "): ");
                        String novoEndereco = scanner.nextLine();
                        System.out.print("Novo telefone (" + abrigoParaAtualizar.get().getTelefone() + "): ");
                        String novoTelefone = scanner.nextLine();
                        abrigoService.atualizarAbrigo(idAtualizarAbrigo, novoNome, novoEndereco, novoTelefone);
                    } else {
                        System.out.println("Abrigo não encontrado.");
                    }
                    break;
                case 4:
                    System.out.print("ID do abrigo para remover: ");
                    int idRemoverAbrigo = lerInteiro();
                    abrigoService.removerAbrigo(idRemoverAbrigo);
                    break;
                case 5:
                    abrigoService.listarAbrigos();
                    if (abrigoService.getAbrigos().isEmpty()) {
                        System.out.println("Nenhum abrigo disponível para registrar pessoas.");
                        break;
                    }
                    System.out.print("ID do abrigo para registrar pessoa: ");
                    int idAbrigo = lerInteiro();
                    Optional<Abrigo> optAbrigo = abrigoService.buscarAbrigoPorId(idAbrigo);
                    if (optAbrigo.isPresent()) {
                        Abrigo abrigoSelecionado = optAbrigo.get();
                        System.out.print("Nome da pessoa: ");
                        String nomePessoa = scanner.nextLine();
                        System.out.print("Idade: ");
                        int idadePessoa = lerInteiro();
                        System.out.print("Gênero: ");
                        String generoPessoa = scanner.nextLine();
                        abrigoService.registrarPessoaEmAbrigo(abrigoService.getPessoasAbrigadas().size() + 1, nomePessoa, idadePessoa, generoPessoa, abrigoSelecionado); // ID simples
                    } else {
                        System.out.println("Abrigo não encontrado.");
                    }
                    break;
                case 6:
                    abrigoService.listarPessoasAbrigadas();
                    break;
                case 7:
                    System.out.print("ID da pessoa abrigada para remover: ");
                    int idRemoverPessoa = lerInteiro();
                    abrigoService.removerPessoaDeAbrigo(idRemoverPessoa);
                    break;
                case 8:
                    abrigoService.listarAbrigos();
                    if (abrigoService.getAbrigos().isEmpty()) {
                        System.out.println("Nenhum abrigo disponível para registrar pessoas.");
                        break;
                    }
                    System.out.print("ID do abrigo para registrar Voluntario: ");
                    int idVoluntario = lerInteiro();
                    Optional<Abrigo> optAbrigoVoluntario = abrigoService.buscarAbrigoPorId(idVoluntario);
                    if (optAbrigoVoluntario.isPresent()) {
                        Abrigo abrigoSelecionado = optAbrigoVoluntario.get();
                        
                        System.out.print("Nome do Voluntario: ");
                        String nomeVoluntario = scanner.nextLine();
                        
                        System.out.print("Telefone: ");
                        String telefoneVoluntario = scanner.nextLine();

                        System.out.print("especialidade: ");
                        String especialidadeVoluntario = scanner.nextLine();

                        System.out.print("disponível (true/false): ");
                        boolean disponivelVoluntario = scanner.nextBoolean();

                        abrigoService.registrarVoluntario(
                            abrigoService.getVoluntarios().size() + 1,
                            nomeVoluntario,
                            telefoneVoluntario,
                            especialidadeVoluntario,
                            disponivelVoluntario ,
                            abrigoSelecionado
                            ); // ID simples
                    } else {
                        System.out.println("Abrigo não encontrado.");
                    }
                    break;
                case 9:
                    System.out.print("verificar somente voluntários disponíveis (true/false)?");
                    boolean apenasDisponiveis = scanner.nextBoolean();
                    abrigoService.listarVoluntarios(apenasDisponiveis);
                    break;
                case 10:
                    System.out.print("ID do voluntário abrigado para remover: ");
                    int idRemoverVoluntario = lerInteiro();
                    abrigoService.removerVoluntarioDeAbrigo(idRemoverVoluntario);
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opção inválida.");
            }
        } while (opcaoAbrigo != 0);
    }

    private static void menuGerenciarAreasDeRisco() {
        int opcaoArea;
        do {
            System.out.println("\n--- GERENCIAR ÁREAS DE RISCO ---");
            System.out.println("1. Listar Áreas de Risco");
            System.out.println("2. Cadastrar Nova Área de Risco");
            System.out.println("3. Atualizar Área de Risco");
            System.out.println("4. Remover Área de Risco");
            System.out.println("0. Voltar ao Menu Principal");
            System.out.print("Escolha uma opção: ");
            opcaoArea = lerInteiro();

            switch (opcaoArea) {
                case 1:
                    sensorService.listarAreasDeRisco();
                    break;
                case 2:
                    System.out.print("Nome da nova área: ");
                    String nomeArea = scanner.nextLine();
                    System.out.print("Localização da área: ");
                    String localizacaoArea = scanner.nextLine();
                    System.out.print("Limiar de alerta (Ex: 2.5 metros para água, 30.0 mm/h para chuva): ");
                    double limiarArea = lerDouble();
                    System.out.print("Grau de risco (BAIXO, MÉDIO, ALTO): ");
                    String grauRisco = scanner.nextLine().toUpperCase();
                    sensorService.cadastrarAreaDeRisco(nomeArea, localizacaoArea, limiarArea, grauRisco);
                    break;
                case 3:
                    System.out.print("ID da área de risco para atualizar: ");
                    int idAtualizarArea = lerInteiro();
                    Optional<AreaDeRisco> areaParaAtualizar = sensorService.buscarAreaDeRiscoPorId(idAtualizarArea);
                    if (areaParaAtualizar.isPresent()) {
                        System.out.print("Novo nome (" + areaParaAtualizar.get().getNome() + "): ");
                        String novoNome = scanner.nextLine();
                        System.out.print("Nova localização (" + areaParaAtualizar.get().getLocalizacao() + "): ");
                        String novaLocalizacao = scanner.nextLine();
                        System.out.print("Novo limiar de alerta (" + areaParaAtualizar.get().getLimiarAlerta() + "): ");
                        double novoLimiar = lerDouble();
                        System.out.print("Novo grau de risco (" + areaParaAtualizar.get().getGrauRisco() + "): ");
                        String novoGrau = scanner.nextLine().toUpperCase();

                        System.out.println("Funcionalidade de atualização completa da Área de Risco seria implementada aqui.");

                    } else {
                        System.out.println("Área de Risco não encontrada.");
                    }
                    break;
                case 4:
                    System.out.print("ID da área de risco para remover: ");
                    int idRemoverArea = lerInteiro();
                    // Implementar lógica de remoção de área de risco no SensorService,
                    // talvez com verificação se há sensores associados
                    System.out.println("Funcionalidade de remoção de Área de Risco seria implementada aqui.");
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opção inválida.");
            }
        } while (opcaoArea != 0);
    }

    private static void menuGerenciarOcorrencias() {
        int opcaoOcorrencia;
        do {
            System.out.println("\n--- GERENCIAR OCORRÊNCIAS ---");
            System.out.println("1. Listar Todas as Ocorrências");
            System.out.println("2. Listar Ocorrências Pendentes e Em Atendimento");
            System.out.println("3. Atualizar Status de Ocorrência");
            System.out.println("4. Remover Ocorrência");
            System.out.println("0. Voltar ao Menu Principal");
            System.out.print("Escolha uma opção: ");
            opcaoOcorrencia = lerInteiro();

            switch (opcaoOcorrencia) {
                case 1:
                    ocorrenciaService.listarOcorrencias();
                    break;
                case 2:
                    ocorrenciaService.listarOcorrenciasPendentesEEmAtendimento();
                    break;
                case 3:
                    System.out.print("Digite o ID da ocorrência para atualizar o status: ");
                    int idAtualizar = lerInteiro();
                    System.out.print("Digite o novo status (PENDENTE, EM ATENDIMENTO, CONCLUÍDO): ");
                    String novoStatus = scanner.nextLine().toUpperCase();
                    ocorrenciaService.atualizarStatusOcorrencia(idAtualizar, novoStatus);
                    break;
                case 4:
                    System.out.print("Digite o ID da ocorrência para remover: ");
                    int idRemover = lerInteiro();
                    ocorrenciaService.removerOcorrencia(idRemover);
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opção inválida.");
            }
        } while (opcaoOcorrencia != 0);

    }

    private static void menuGerenciarEquipesDeResgate() {
         int opcaoEquipes;
        do {
            System.out.println("\n--- GERENCIAR EQUIPES ---");
            System.out.println("1. Adicionar Equipe de Resgate");
            System.out.println("2. Listar Equipes de Resgate");
            System.out.println("3. Remover Equipes de Resgate");
            System.out.println("0. Voltar ao Menu Principal");
            System.out.print("Escolha uma opção: ");
            opcaoEquipes = lerInteiro();

            switch (opcaoEquipes) {
                case 1:
                    System.out.print("Nome da Equipe: ");
                    String nomeEquipe = scanner.nextLine();

                    System.out.print("Contato: ");
                    String contatoEquipe = scanner.nextLine();

                    System.out.print("Número de Membros: ");
                    int numeroMembros = lerInteiro();

                    System.out.print("Disponivel: ");
                    boolean disponivel = scanner.nextBoolean();
                    
                    sensorService.listarAreasDeRisco();
                    System.out.print("ID da Área de Resgate: ");
                    int idAreaResgate = lerInteiro();

                    equipeResgateService.cadastrarEquipe(nomeEquipe, contatoEquipe, numeroMembros, disponivel, idAreaResgate);
                    break;
                case 2:
                    equipeResgateService.listarEquipes();
                    break;
                case 3:
                    System.out.print("Digite o ID da equipe para excluir: ");
                    int idExcluir = lerInteiro();
                    equipeResgateService.removerEquipe(idExcluir);
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opção inválida.");
            }
        } while (opcaoEquipes != 0);
    }

    // Métodos auxiliares para leitura de entrada (com tratamento de erro básico)
    private static int lerInteiro() {
        while (true) {
            try {
                return scanner.nextInt();
            } catch (InputMismatchException e) {
                System.out.println("Entrada inválida. Por favor, digite um número inteiro.");
                scanner.nextLine(); // Consumir a entrada inválida
            } finally {
                scanner.nextLine(); // Consumir a quebra de linha restante
            }
        }
    }

    private static double lerDouble() {
        while (true) {
            try {
                return scanner.nextDouble();
            } catch (InputMismatchException e) {
                System.out.println("Entrada inválida. Por favor, digite um número decimal.");
                scanner.nextLine(); // Consumir a entrada inválida
            } finally {
                scanner.nextLine(); // Consumir a quebra de linha restante
            }
        }
    }
}