package simra.service;

import simra.model.AreaDeRisco;
import simra.model.Sensor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class SensorService {
    private List<Sensor> sensores;
    private List<AreaDeRisco> areasDeRisco; // Para gerenciar áreas de risco
    private AlertaService alertaService; // Dependência do AlertaService
    private int nextSensorId;
    private int nextAreaDeRiscoId;

    public SensorService() {
        this.sensores = new ArrayList<>();
        this.areasDeRisco = new ArrayList<>();
        this.alertaService = new AlertaService(); // Instancia AlertaService aqui
        this.nextSensorId = 1;
        this.nextAreaDeRiscoId = 1;

        // --- DADOS INICIAIS DE EXEMPLO ---
        // Cadastrando Áreas de Risco
        AreaDeRisco area1 = cadastrarAreaDeRisco("Bacia do Rio Tietê", "São Paulo - Região Central", 2.5, "ALTO");
        AreaDeRisco area2 = cadastrarAreaDeRisco("Morro da Paz", "São Paulo - Zona Leste", 1.8, "MÉDIO");
        AreaDeRisco area3 = cadastrarAreaDeRisco("Córrego da Pedra", "São Paulo - Zona Sul", 30.0, "ALTO"); // Para pluviômetro

        // Cadastrando Sensores e associando às Áreas de Risco
        cadastrarSensor("Rio Tietê - Ponte Velha", "Nível de Água", 1.5, "metros", "NORMAL", area1);
        cadastrarSensor("Córrego do Moinho - Morro Verde", "Nível de Água", 0.8, "metros", "NORMAL", area2);
        cadastrarSensor("Estação Meteorológica Central", "Pluviômetro", 5.0, "mm/h", "NORMAL", area3);
        cadastrarSensor("Encosta do Sol - Setor 3", "Movimento Solo", 0.01, "cm/h", "NORMAL", area2);
    }

    // Métodos para gerenciar Áreas de Risco (CRUD básico)
    public AreaDeRisco cadastrarAreaDeRisco(String nome, String localizacao, double limiarAlerta, String grauRisco) {
        AreaDeRisco novaArea = new AreaDeRisco(nextAreaDeRiscoId++, nome, localizacao, limiarAlerta, grauRisco);
        this.areasDeRisco.add(novaArea);
        System.out.println("Área de Risco '" + nome + "' cadastrada com sucesso! ID: " + novaArea.getId());
        return novaArea;
    }

    public Optional<AreaDeRisco> buscarAreaDeRiscoPorId(int id) {
        return areasDeRisco.stream()
                .filter(area -> area.getId() == id)
                .findFirst();
    }

    public void listarAreasDeRisco() {
        if (areasDeRisco.isEmpty()) {
            System.out.println("Nenhuma área de risco cadastrada.");
        } else {
            System.out.println("--- ÁREAS DE RISCO ---");
            areasDeRisco.forEach(System.out::println);
        }
    }


    // --- CRUD Sensor ---

    /**
     * Cadastra um novo sensor.
     */
    public Sensor cadastrarSensor(String localizacao, String tipo, double leituraInicial, String unidade, String status, AreaDeRisco areaAssociada) {
        Sensor novoSensor = new Sensor(nextSensorId++, localizacao, tipo, leituraInicial, unidade, status);
        novoSensor.setAreaDeRiscoAssociada(areaAssociada); // Associa a área de risco
        this.sensores.add(novoSensor);
        System.out.println("Sensor '" + localizacao + "' cadastrado com sucesso! ID: " + novoSensor.getId());
        return novoSensor;
    }

    /**
     * Lista todos os sensores.
     */
    public void listarSensores() {
        if (sensores.isEmpty()) {
            System.out.println("Nenhum sensor cadastrado.");
        } else {
            System.out.println("--- SENSORES CADASTRADOS ---");
            sensores.forEach(System.out::println);
        }
    }

    /**
     * Busca um sensor pelo ID.
     * @param id O ID do sensor.
     * @return Um Optional contendo o Sensor se encontrado, ou um Optional vazio.
     */
    public Optional<Sensor> buscarSensorPorId(int id) {
        return sensores.stream()
                .filter(sensor -> sensor.getId() == id)
                .findFirst();
    }

    /**
     * Atualiza a localização e tipo de um sensor.
     */
    public boolean atualizarSensor(int id, String novaLocalizacao, String novoTipo) {
        Optional<Sensor> optSensor = buscarSensorPorId(id);
        if (optSensor.isPresent()) {
            Sensor sensor = optSensor.get();
            sensor.setLocalizacao(novaLocalizacao);
            sensor.setTipo(novoTipo);
            System.out.println("Sensor ID " + id + " atualizado com sucesso.");
            return true;
        }
        System.out.println("Sensor ID " + id + " não encontrado para atualização.");
        return false;
    }

    /**
     * Remove um sensor pelo ID.
     */
    public boolean removerSensor(int id) {
        boolean removido = sensores.removeIf(sensor -> sensor.getId() == id);
        if (removido) {
            System.out.println("Sensor ID " + id + " removido com sucesso.");
        } else {
            System.out.println("Sensor ID " + id + " não encontrado para remoção.");
        }
        return removido;
    }

    /**
     * Simula a leitura de um sensor e verifica se um alerta deve ser gerado.
     * Esta é a lógica de "IA" simulada.
     * @param sensor O objeto Sensor a ser atualizado.
     * @param novaLeitura A nova leitura simulada para o sensor.
     */
    public void simularLeituraSensorEVerificarAlerta(Sensor sensor, double novaLeitura) {
        sensor.setLeituraAtual(novaLeitura); // Atualiza a leitura do sensor

        if (sensor.getAreaDeRiscoAssociada() != null) {
            AreaDeRisco area = sensor.getAreaDeRiscoAssociada();
            double limiarAtencao = area.getLimiarAlerta() * 0.75; // 75% do limiar
            double limiarCritico = area.getLimiarAlerta();
            double limiarEmergencia = area.getLimiarAlerta() * 1.2; // 120% do limiar

            if (novaLeitura >= limiarEmergencia) {
                sensor.setStatus("EMERGÊNCIA");
                alertaService.gerarAlerta("ALERTA MÁXIMO: EVACUAÇÃO NECESSÁRIA",
                        "Nível de " + sensor.getTipo() + " em " + sensor.getLocalizacao() + " atingiu " + novaLeitura + " " + sensor.getUnidade() + ". Risco iminente de desastre. EVACUE!",
                        "EMERGÊNCIA", area);
            } else if (novaLeitura >= limiarCritico) {
                sensor.setStatus("CRÍTICO");
                alertaService.gerarAlerta("ALERTA CRÍTICO: Risco de Transbordamento",
                        "Nível de " + sensor.getTipo() + " em " + sensor.getLocalizacao() + " atingiu " + novaLeitura + " " + sensor.getUnidade() + ". Mantenha-se afastado da área.",
                        "CRÍTICO", area);
            } else if (novaLeitura >= limiarAtencao) {
                sensor.setStatus("ATENÇÃO");
                alertaService.gerarAlerta("ALERTA: Nível em Ascensão",
                        "Nível de " + sensor.getTipo() + " em " + sensor.getLocalizacao() + " está em " + novaLeitura + " " + sensor.getUnidade() + ". Possível risco. Fique atento.",
                        "ATENÇÃO", area);
            } else {
                sensor.setStatus("NORMAL");
                System.out.println("Nível de " + sensor.getTipo() + " em " + sensor.getLocalizacao() + " está normal (" + novaLeitura + " " + sensor.getUnidade() + ").");
            }
        } else {
            System.out.println("Sensor ID " + sensor.getId() + " sem área de risco associada. Não é possível verificar alerta.");
        }
    }


    public void exibirStatusSensoresEAlertas() {
        System.out.println("\n--- STATUS DOS SENSORES ---");
        listarSensores();
        System.out.println("\n--- ALERTAS ATIVOS ---");
        alertaService.listarAlertasAtivos();
    }

    public List<Sensor> getSensores() {
        return new ArrayList<>(sensores); // Retorna uma cópia
    }

    public List<AreaDeRisco> getAreasDeRisco() {
        return new ArrayList<>(areasDeRisco);
    }

    public AlertaService getAlertaService() {
        return alertaService; // Permite acessar o AlertaService diretamente
    }
}