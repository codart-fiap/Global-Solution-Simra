document.addEventListener('DOMContentLoaded', function () {
    const sensorsTableBody = document.getElementById('sensorsTableBody');
    const searchSensoresInput = document.getElementById('searchSensoresInput');
    const btnSimularLeitura1 = document.getElementById('btnSimularLeitura1');

    const modalDetalhesSensorElement = document.getElementById('modalDetalhesSensor');
    let modalDetalhesSensorInstance = null;
    if (modalDetalhesSensorElement) {
        modalDetalhesSensorInstance = new bootstrap.Modal(modalDetalhesSensorElement);
    } else {
        console.error("Elemento HTML para #modalDetalhesSensor NÃO encontrado.");
    }
    
    const modalDetalhesSensorLabel = document.getElementById('modalDetalhesSensorLabel');
    const detalheSensorId = document.getElementById('detalheSensorId');
    const detalheSensorLocalizacao = document.getElementById('detalheSensorLocalizacao');
    const detalheSensorTipo = document.getElementById('detalheSensorTipo');
    const detalheSensorLeituraAtual = document.getElementById('detalheSensorLeituraAtual');
    const detalheSensorStatus = document.getElementById('detalheSensorStatus');
    const detalheSensorAreaRisco = document.getElementById('detalheSensorAreaRisco');
    const detalheSensorHistoricoLeituras = document.getElementById('detalheSensorHistoricoLeituras');
    const detalheSensorHistoricoManutencoes = document.getElementById('detalheSensorHistoricoManutencoes');
    const detalheSensorObservacoes = document.getElementById('detalheSensorObservacoes');

  
    const sensorsData = [
        { id: "Sensor-001", localizacao: "Rio Tietê - Ponte Velha, Piqueri", tipo: "Nível da Água", leituraAtual: "2.5m", status: "Ativo", areaDeRisco: "Médio", observacoes: "Instalado próximo à comporta X.", historicoLeituras: [{ dataHora: "2024-06-05T08:00", leitura: "2.4m" },{ dataHora: "2024-06-05T07:00", leitura: "2.3m" }], historicoManutencoes: [{ data: "2024-05-15", tipo: "Preventiva", descricao: "Limpeza e calibração do sensor." }] },
        { id: "Sensor-002", localizacao: "Córrego do Moinho - Morro Verde, Vila Prudente", tipo: "Chuva", leituraAtual: "15mm/hr", status: "Ativo", areaDeRisco: "Alto", observacoes: "Sensor pluviométrico de alta precisão.", historicoLeituras: [{ dataHora: "2024-06-05T08:30", leitura: "12mm/hr" }], historicoManutencoes: [{ data: "2024-04-20", tipo: "Preventiva", descricao: "Verificação de obstruções." }] },
        { id: "Sensor-003", localizacao: "Encosta do Rio Tamanduateí - Pq. D. Pedro II, Centro", tipo: "Chuva", leituraAtual: "0mm/hr", status: "Inativo", areaDeRisco: "Alto", observacoes: "Sensor de chuva temporariamente desativado. Movimentação de solo era monitorada indiretamente.", historicoLeituras: [{ dataHora: "2024-05-30T10:00", leitura: "Registrou movimentação leve" }], historicoManutencoes: [] }, // Tipo alterado
        { id: "Sensor-004", localizacao: "Av. Industrial, 1500 - Utinga, Santo André", tipo: "Chuva", leituraAtual: "5mm/hr", status: "Ativo", areaDeRisco: "Baixo", observacoes: "Sensor de chuva para monitoramento industrial.", historicoLeituras: [], historicoManutencoes: [] }, // Tipo alterado
        { id: "Sensor-005", localizacao: "Rua das Flores, Jardim Residencial Paraíso, Zona Sul", tipo: "Nível da Água", leituraAtual: "1.8m", status: "Ativo", areaDeRisco: "Baixo", observacoes: "Monitora pequeno córrego.", historicoLeituras: [{dataHora: "2024-06-05T00:00", leitura: "1.7m"}], historicoManutencoes: [] },
        { id: "Sensor-006", localizacao: "Parque Estadual da Cantareira - Núcleo Pedra Grande", tipo: "Chuva", leituraAtual: "22mm/hr", status: "Ativo", areaDeRisco: "Alto", observacoes: "Local de difícil acesso para manutenção.", historicoLeituras: [{dataHora: "2024-06-05T09:00", leitura: "20mm/hr"}], historicoManutencoes: [{data: "2024-01-10", tipo: "Instalação", descricao: "Sensor instalado e calibrado."}]},
        { id: "Sensor-007", localizacao: "Av. Comercial, 3030 - Brás, Centro", tipo: "Chuva", leituraAtual: "2mm/hr", status: "Ativo", areaDeRisco: "Médio", observacoes: "Sensor de chuva para área comercial.", historicoLeituras: [], historicoManutencoes: []}, // Tipo alterado
        { id: "Sensor-008", localizacao: "Bairro Residencial Sabiá - Próximo à Escola Municipal, Perus", tipo: "Chuva", leituraAtual: "8mm/hr", status: "Inativo", areaDeRisco: "Baixo", observacoes: "Sensor aguardando substituição de peça.", historicoLeituras: [{dataHora: "2024-06-01T12:00", leitura: "5mm/hr"}], historicoManutencoes: [{data: "2024-06-02", tipo: "Diagnóstico", descricao: "Identificada falha no transmissor."}]},
        { id: "Sensor-009", localizacao: "Reservatório Guarapiranga - Ponto de Captação", tipo: "Nível da Água", leituraAtual: "85% capacidade", status: "Ativo", areaDeRisco: "Crítico", observacoes: "Leitura crítica para abastecimento.", historicoLeituras: [{dataHora: "2024-06-04T12:00", leitura: "84%"}], historicoManutencoes: [{data: "2024-06-01", tipo: "Inspeção", descricao: "Verificação de comportas."}]},
        { id: "Sensor-010", localizacao: "Pico do Jaraguá - Antenas de Transmissão", tipo: "Chuva", leituraAtual: "12mm/hr", status: "Ativo", areaDeRisco: "Médio", observacoes: "", historicoLeituras: [], historicoManutencoes: []},
        { id: "Sensor-012", localizacao: "Av. Aricanduva, próximo ao Shopping, Zona Leste", tipo: "Nível da Água", leituraAtual: "0.8m", status: "Inativo", areaDeRisco: "Médio", observacoes: "Sensor de nível do córrego Aricanduva.", historicoLeituras: [], historicoManutencoes: []},
        { id: "Sensor-013", localizacao: "Morro do Macaco, São Mateus - Encosta Urbanizada", tipo: "Chuva", leituraAtual: "18mm/hr", status: "Ativo", areaDeRisco: "Alto", observacoes: "Monitoramento pluviométrico para risco de deslizamento.", historicoLeituras: [], historicoManutencoes: []}, // Tipo alterado
        { id: "Sensor-014", localizacao: "Terminal de Cargas Fernão Dias, Vila Medeiros", tipo: "Chuva", leituraAtual: "3mm/hr", status: "Ativo", areaDeRisco: "Baixo", observacoes: "", historicoLeituras: [], historicoManutencoes: [] },
        { id: "Sensor-015", localizacao: "Sistema Cantareira - Represa Jaguari (Extremo Norte)", tipo: "Nível da Água", leituraAtual: "95% capacidade", status: "Ativo", areaDeRisco: "Crítico", observacoes: "Nível crítico para o abastecimento da RMSP.", historicoLeituras: [], historicoManutencoes: [] }
    ];

    function formatDisplayDateTime(isoOrDateTimeString) {
        if (!isoOrDateTimeString) return "Não informado";
        try {
            const date = new Date(isoOrDateTimeString);
            if (isNaN(date.getTime())) return isoOrDateTimeString; 
            return date.toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '');
        } catch (e) { return isoOrDateTimeString; }
    }

    function getSensorStatusBadgeClass(status) {
        const statusLower = status.toLowerCase();
        if (statusLower === 'ativo') return 'badge bg-success-subtle text-success-emphasis rounded-pill px-4';
        if (statusLower === 'inativo') return 'badge text-bg-light rounded-pill px-4';
        return 'badge text-bg-secondary rounded-pill px-4';
    }

    function getRiskLevelBadgeClass(riskLevel) {
        if (!riskLevel) return "";
        const riskLower = riskLevel.toLowerCase();
        let badgeClass = 'badge rounded-pill px-2 risk-badge'; 
        if (riskLower === 'crítico') return `${badgeClass} text-bg-danger`;
        if (riskLower === 'alto') return `${badgeClass} text-bg-warning`;
        if (riskLower === 'médio') return `${badgeClass} text-bg-info`;
        if (riskLower === 'baixo') return `${badgeClass} text-bg-secondary`;
        return ""; 
    }

    function popularHistoricoLeituras(leituras, containerElement) {
        if (!containerElement) return;
        containerElement.innerHTML = ''; 
        if (!leituras || leituras.length === 0) {
            containerElement.innerHTML = '<div class="list-group-item text-muted">Nenhum histórico de leituras disponível.</div>';
            return;
        }
        leituras.forEach(leitura => {
            const item = document.createElement('div');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `<span>${formatDisplayDateTime(leitura.dataHora)}</span> <span class="fw-bold">${leitura.leitura}</span>`;
            containerElement.appendChild(item);
        });
    }

    function popularHistoricoManutencoes(manutencoes, containerElement) {
        if (!containerElement) return;
        containerElement.innerHTML = '';
        if (!manutencoes || manutencoes.length === 0) {
            containerElement.innerHTML = '<div class="list-group-item text-muted">Nenhum registro de manutenção.</div>';
            return;
        }
        manutencoes.forEach(manutencao => {
            const item = document.createElement('div');
            item.className = 'list-group-item';
            item.innerHTML = `<small class="d-block text-muted">${formatDisplayDateTime(manutencao.data)} - <strong>${manutencao.tipo}</strong></small> ${manutencao.descricao}`;
            containerElement.appendChild(item);
        });
    }

  
    function renderSensorsTable(sensorsToRender) {
        if (!sensorsTableBody) return;
        sensorsTableBody.innerHTML = '';

        const colspanValue = 6; 

        if (sensorsToRender.length === 0) {
            sensorsTableBody.innerHTML = `<tr><td colspan="${colspanValue}" class="text-center">Nenhum sensor encontrado.</td></tr>`;
            return;
        }

        sensorsToRender.forEach(sensor => {
            const row = sensorsTableBody.insertRow();
            row.setAttribute('data-sensor-id', sensor.id); 
            row.style.cursor = 'pointer'; 

            row.insertCell().textContent = sensor.id;
            row.insertCell().textContent = sensor.localizacao;
            row.insertCell().textContent = sensor.tipo;
            
            const leituraAtualCell = row.insertCell();
            if (sensor.status.toLowerCase() === 'inativo') {
                leituraAtualCell.textContent = "-";
                leituraAtualCell.classList.add('text-muted');
            } else {
                leituraAtualCell.textContent = sensor.leituraAtual;
            }
            
            const statusCell = row.insertCell();
            statusCell.className = 'text-center'; 
            const statusSpan = document.createElement('span');
            statusSpan.className = getSensorStatusBadgeClass(sensor.status);
            statusSpan.textContent = sensor.status;
            statusCell.appendChild(statusSpan);

            const areaDeRiscoCell = row.insertCell();
            areaDeRiscoCell.className = 'text-center'; 
            const riskBadgeClass = getRiskLevelBadgeClass(sensor.areaDeRisco);
            if (riskBadgeClass) {
                const riskSpan = document.createElement('span');
                riskSpan.className = riskBadgeClass;
                riskSpan.textContent = sensor.areaDeRisco;
                areaDeRiscoCell.appendChild(riskSpan);
            } else {
                areaDeRiscoCell.textContent = sensor.areaDeRisco;
            }
            
            row.addEventListener('click', function(){
                const sensorId = this.getAttribute('data-sensor-id');
                const sensorSelecionado = sensorsData.find(s => s.id === sensorId);

                if (sensorSelecionado && modalDetalhesSensorInstance) {
                    if(modalDetalhesSensorLabel) modalDetalhesSensorLabel.textContent = `Detalhes do ${sensorSelecionado.id}`;
                    if(detalheSensorId) detalheSensorId.textContent = sensorSelecionado.id;
                    if(detalheSensorLocalizacao) detalheSensorLocalizacao.textContent = sensorSelecionado.localizacao;
                    if(detalheSensorTipo) detalheSensorTipo.textContent = sensorSelecionado.tipo;
                    
                    if(detalheSensorLeituraAtual) {
                        if (sensorSelecionado.status.toLowerCase() === 'inativo') {
                            detalheSensorLeituraAtual.textContent = "- (Sensor Inativo)";
                            detalheSensorLeituraAtual.classList.add('text-muted');
                        } else {
                            detalheSensorLeituraAtual.textContent = sensorSelecionado.leituraAtual;
                            detalheSensorLeituraAtual.classList.remove('text-muted');
                        }
                    }
                    if(detalheSensorStatus) { 
                        detalheSensorStatus.className = getSensorStatusBadgeClass(sensorSelecionado.status);
                        detalheSensorStatus.textContent = sensorSelecionado.status;
                    }
                    if(detalheSensorAreaRisco) {
                         const riskBadgeClassModal = getRiskLevelBadgeClass(sensorSelecionado.areaDeRisco);
                         detalheSensorAreaRisco.innerHTML = ''; 
                         if(riskBadgeClassModal){
                            const riskSpanModal = document.createElement('span');
                            riskSpanModal.className = riskBadgeClassModal;
                            riskSpanModal.textContent = sensorSelecionado.areaDeRisco;
                            detalheSensorAreaRisco.appendChild(riskSpanModal);
                         } else {
                            detalheSensorAreaRisco.textContent = sensorSelecionado.areaDeRisco;
                         }
                    }
                     if(detalheSensorObservacoes) { 
                        detalheSensorObservacoes.textContent = sensorSelecionado.observacoes || "Nenhuma observação adicional.";
                    }
                    
                    popularHistoricoLeituras(sensorSelecionado.historicoLeituras, detalheSensorHistoricoLeituras);
                    popularHistoricoManutencoes(sensorSelecionado.historicoManutencoes, detalheSensorHistoricoManutencoes);
                    
                    modalDetalhesSensorInstance.show();
                }
            });
        });
    }

    if(btnSimularLeitura1) {
        btnSimularLeitura1.addEventListener('click', function() {
            alert('Botão "Simular Leitura" clicado! (Funcionalidade a ser implementada)');
        });
    }

    if(searchSensoresInput) {
       searchSensoresInput.addEventListener('input', function(e) {
           const searchTerm = e.target.value.toLowerCase();
           const filteredSensors = sensorsData.filter(sensor => 
               sensor.id.toLowerCase().includes(searchTerm) ||
               sensor.localizacao.toLowerCase().includes(searchTerm) ||
               sensor.tipo.toLowerCase().includes(searchTerm) ||
               sensor.status.toLowerCase().includes(searchTerm) ||
               (sensor.areaDeRisco && sensor.areaDeRisco.toLowerCase().includes(searchTerm)) ||
               (sensor.status.toLowerCase() !== 'inativo' && sensor.leituraAtual.toLowerCase().includes(searchTerm))
           );
           renderSensorsTable(filteredSensors);
       });
    }
    
    renderSensorsTable(sensorsData);
});