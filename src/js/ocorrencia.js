document.addEventListener('DOMContentLoaded', function () {
    const occurrencesTableBody = document.getElementById('occurrencesTableBody');
    const searchOcorrenciasInput = document.getElementById('searchOcorrenciasInput');
    
    const formNovaOcorrencia = document.getElementById('formNovaOcorrencia');
    const modalNovaOcorrenciaElement = document.getElementById('modalNovaOcorrencia');
    let modalNovaOcorrenciaInstance = null;
    if (modalNovaOcorrenciaElement) {
        modalNovaOcorrenciaInstance = new bootstrap.Modal(modalNovaOcorrenciaElement);
    }
    const modalNovaOcorrenciaLabel = document.getElementById('modalNovaOcorrenciaLabel');
    const btnSubmitNovaOcorrencia = formNovaOcorrencia ? formNovaOcorrencia.querySelector('button[type="submit"]') : null;

    const ocorrenciasOffcanvasElement = document.getElementById('ocorrenciasOffcanvas');
    let ocorrenciasOffcanvasInstance = null;
    if (ocorrenciasOffcanvasElement) {
        ocorrenciasOffcanvasInstance = new bootstrap.Offcanvas(ocorrenciasOffcanvasElement);
    }
    const btnAtualizarListaOcorrencias = document.getElementById('btnAtualizarListaOcorrencias');
    
    const modalDetalhesOcorrenciaElement = document.getElementById('modalDetalhesOcorrencia');
    let modalDetalhesOcorrenciaInstance = null;
    if (modalDetalhesOcorrenciaElement) {
        modalDetalhesOcorrenciaInstance = new bootstrap.Modal(modalDetalhesOcorrenciaElement);
    }
    
    const modalDetalhesOcorrenciaLabel = document.getElementById('modalDetalhesOcorrenciaLabel');
    const detalheOcorrenciaId = document.getElementById('detalheOcorrenciaId');
    const detalheOcorrenciaLocalizacao = document.getElementById('detalheOcorrenciaLocalizacao');
    const detalheOcorrenciaStatus = document.getElementById('detalheOcorrenciaStatus');
    const detalheOcorrenciaTipoAssistencia = document.getElementById('detalheOcorrenciaTipoAssistencia');
    const detalheOcorrenciaDataHora = document.getElementById('detalheOcorrenciaDataHora');
    const detalheOcorrenciaEquipes = document.getElementById('detalheOcorrenciaEquipes'); 
    const detalheOcorrenciaDescricao = document.getElementById('detalheOcorrenciaDescricao');
    const btnEditarOcorrenciaNoModalDetalhes = document.getElementById('btnEditarOcorrenciaNoModalDetalhes');

    const checkboxesEquipesContainer = document.getElementById('checkboxesEquipesAlocadasContainer');

    // --- NOVOS Seletores para os Filtros ---
    const filtroDataOcorrenciaInput = document.getElementById('filtroDataOcorrencia');
    const filtroTipoAssistenciaSelect = document.getElementById('filtroTipoAssistencia');
    const filtroStatusOcorrenciaSelect = document.getElementById('filtroStatusOcorrencia');
    const btnLimparFiltrosOcorrencias = document.getElementById('btnLimparFiltrosOcorrencias');

    let nextOccurrenceIdNum = 12356; 
    let modoEdicao = false;
    let idOcorrenciaEmEdicao = null;

    const equipesDisponiveis = [
        "Bombeiros", "SAMU", "Polícia Militar", "Defesa Civil", 
        "Guarda Municipal", "CET (Trânsito)", "Assistência Social", "Equipe Veterinária",
        "Sabesp", "Enel/Eletropaulo" 
    ];

    const tiposDeAssistenciaDisponiveis = [
        "Alagamento", "Deslizamento", "Inundação", "Obstrução de Via", "Falta de Energia",
        "Risco Estrutural", "Monitoramento Hídrico", "Médica", "Resgate", "Evacuação", 
        "Abrigo", "Comida", "Água", "Segurança", "Trânsito", "Outro"
    ];


    let occurrencesData = [
        { id: "#12345", localizacao: "Av. Santo Amaro, 1020, Vila Nova Conceição - Ponto de Alagamento", status: "Em atendimento", tipoAssistencia: "Alagamento", dataHora: "2024-06-04T14:30", descricao: "Alagamento intransitável na Avenida Santo Amaro devido a chuva forte. Veículos presos. Necessário bloqueio da via e avaliação de risco.", equipesAlocadas: ["CET (Trânsito)", "Defesa Civil", "Bombeiros"] },
        { id: "#12346", localizacao: "Rua das Acácias, 78, Morro do Sabiá, Brasilândia - Risco de Deslizamento", status: "Pendente", tipoAssistencia: "Deslizamento", dataHora: "2024-06-04T15:10", descricao: "Moradores reportam estalos e movimentação de terra na encosta próxima às residências. Chuva persistente na região.", equipesAlocadas: ["Defesa Civil"] },
        { id: "#12347", localizacao: "Parque Linear Córrego Rio Verde, Itaim Paulista - Transbordamento de Córrego", status: "Em atendimento", tipoAssistencia: "Inundação", dataHora: "2024-06-04T16:00", descricao: "Córrego Rio Verde transbordou, atingindo casas na margem. Necessário resgate e evacuação de famílias.", equipesAlocadas: ["Bombeiros", "Defesa Civil", "Assistência Social"] },
        { id: "#12348", localizacao: "Av. Eliseu de Almeida, altura do nº 2000, Butantã - Queda de Árvore", status: "Concluído", tipoAssistencia: "Obstrução de Via", dataHora: "2024-06-03T09:20", descricao: "Árvore de grande porte caiu sobre a via, bloqueando totalmente o trânsito. Remoção e limpeza concluídas pela prefeitura e CET.", equipesAlocadas: ["CET (Trânsito)", "Bombeiros"] },
        { id: "#12349", localizacao: "Comunidade do Gato, Av. Santos Dumont, Bom Retiro - Inundação", status: "Pendente", tipoAssistencia: "Abrigo", dataHora: "2024-06-04T17:30", descricao: "Diversas famílias desabrigadas devido à inundação do Rio Tamanduateí. Necessidade urgente de encaminhamento para abrigos.", equipesAlocadas: ["Assistência Social", "Defesa Civil"] },
        { id: "#12350", localizacao: "Rua Vergueiro com Av. Lins de Vasconcelos, Vila Mariana - Semáforo Apagado", status: "Em atendimento", tipoAssistencia: "Trânsito", dataHora: "2024-06-04T18:00", descricao: "Semáforo do cruzamento inoperante após forte chuva e queda de energia parcial. Risco de acidentes. CET e Enel acionadas.", equipesAlocadas: ["CET (Trânsito)", "Enel/Eletropaulo"] },
        { id: "#12351", localizacao: "Marginal Tietê, próximo à Ponte das Bandeiras - Pista Alagada", status: "Em atendimento", tipoAssistencia: "Alagamento", dataHora: "2024-06-05T08:15", descricao: "Pista central da Marginal Tietê com bolsão d'água, trânsito lento.", equipesAlocadas: ["CET (Trânsito)", "Bombeiros"] },
        { id: "#12352", localizacao: "Rua Professor Ascendino Reis, Moema - Falta de Energia", status: "Pendente", tipoAssistencia: "Falta de Energia", dataHora: "2024-06-05T09:00", descricao: "Queda de energia em múltiplos quarteirões após estouro de transformador.", equipesAlocadas: ["Enel/Eletropaulo"] },
        { id: "#12353", localizacao: "Estrada de Itapecerica, Capão Redondo - Deslizamento Pequeno", status: "Concluído", tipoAssistencia: "Deslizamento", dataHora: "2024-06-02T14:00", descricao: "Pequeno deslizamento de talude atingiu parte da calçada, sem vítimas. Área limpa.", equipesAlocadas: ["Defesa Civil"] },
        { id: "#12354", localizacao: "Av. Dr. Arnaldo, próximo ao Hospital das Clínicas - Risco de Queda de Árvore", status: "Pendente", tipoAssistencia: "Risco Estrutural", dataHora: "2024-06-05T10:30", descricao: "Árvore com inclinação acentuada, risco de queda sobre via e fiação.", equipesAlocadas: ["Defesa Civil", "Enel/Eletropaulo"] },
        { id: "#12355", localizacao: "Represa Billings, Riacho Grande (SBC) - Monitoramento de Nível", status: "Em atendimento", tipoAssistencia: "Monitoramento Hídrico", dataHora: "2024-06-05T11:00", descricao: "Nível da represa elevando rapidamente. Alerta para áreas ribeirinhas.", equipesAlocadas: ["Defesa Civil", "Sabesp"] }
    ];

    function popularCheckboxesEquipes() {
        if (!checkboxesEquipesContainer) return;
        checkboxesEquipesContainer.innerHTML = ''; 
        equipesDisponiveis.forEach(equipe => {
            const formCheckDiv = document.createElement('div');
            formCheckDiv.className = 'form-check form-check-inline';
            const input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'checkbox';
            input.value = equipe;
            input.id = `chk-equipe-${equipe.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = input.id;
            label.textContent = equipe;
            formCheckDiv.appendChild(input);
            formCheckDiv.appendChild(label);
            checkboxesEquipesContainer.appendChild(formCheckDiv);
        });
    }

    function popularFiltroTipoAssistencia() {
        if (!filtroTipoAssistenciaSelect) return;
     
        while (filtroTipoAssistenciaSelect.options.length > 1) {
            filtroTipoAssistenciaSelect.remove(1);
        }

        tiposDeAssistenciaDisponiveis.sort().forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            filtroTipoAssistenciaSelect.appendChild(option);
        });
    }


    function getStatusBadgeClass(status) {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('pendente')) return 'badge text-bg-light rounded-pill px-4 py-2';
        if (statusLower.includes('concluído')) return 'badge bg-success-subtle text-success-emphasis rounded-pill px-4 py-2';
        if (statusLower.includes('em atendimento')) return 'badge bg-primary-subtle text-primary-emphasis rounded-pill px-4 py-2';
        return 'badge text-bg-secondary rounded-pill px-4 py-2';
    }
    
    function formatDateTimeForDisplay(isoString) {
        if (!isoString) return "Não informado";
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return "Data inválida";
            return date.toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '');
        } catch (e) { return isoString; }
    }

    function preencherFormularioParaEdicao(ocorrencia) {
        if (!formNovaOcorrencia || !ocorrencia) return;
        document.getElementById('ocorrenciaLocalizacao').value = ocorrencia.localizacao;
        document.getElementById('ocorrenciaTipoAssistencia').value = ocorrencia.tipoAssistencia;
        document.getElementById('ocorrenciaStatus').value = ocorrencia.status;
        document.getElementById('ocorrenciaDataHora').value = ocorrencia.dataHora; 
        document.getElementById('ocorrenciaDescricao').value = ocorrencia.descricao;

        checkboxesEquipesContainer.querySelectorAll('.form-check-input').forEach(chk => {
            chk.checked = ocorrencia.equipesAlocadas.includes(chk.value);
        });

        if (modalNovaOcorrenciaLabel) modalNovaOcorrenciaLabel.textContent = `Editar Ocorrência ${ocorrencia.id}`;
        if (btnSubmitNovaOcorrencia) btnSubmitNovaOcorrencia.textContent = 'Salvar Alterações';
    }

    function resetarFormularioNovaOcorrencia() {
        if (formNovaOcorrencia) formNovaOcorrencia.reset();
        if (checkboxesEquipesContainer) {
            checkboxesEquipesContainer.querySelectorAll('.form-check-input').forEach(chk => chk.checked = false);
        }
        const dataHoraInputOcorrencia = document.getElementById('ocorrenciaDataHora');
        if (dataHoraInputOcorrencia) {
             const now = new Date();
             const offset = now.getTimezoneOffset() * 60000;
             const localNow = new Date(now.getTime() - offset);
             dataHoraInputOcorrencia.value = localNow.toISOString().slice(0, 16);
        }
        if (modalNovaOcorrenciaLabel) modalNovaOcorrenciaLabel.textContent = 'Registrar Nova Ocorrência';
        if (btnSubmitNovaOcorrencia) btnSubmitNovaOcorrencia.textContent = 'Registrar Ocorrência';
        modoEdicao = false;
        idOcorrenciaEmEdicao = null;
    }

    function renderOccurrencesTable(occurrencesToRender) {
        if (!occurrencesTableBody) {
            return;
        }
        occurrencesTableBody.innerHTML = ''; 

        if (occurrencesToRender.length === 0) {
            occurrencesTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma ocorrência encontrada com os filtros aplicados.</td></tr>';
            return;
        }

        occurrencesToRender.forEach(occurrence => {
            const row = occurrencesTableBody.insertRow();
            row.setAttribute('data-occurrence-id', occurrence.id); 
            row.style.cursor = 'pointer'; 

            const idCell = row.insertCell();
            idCell.outerHTML = `<th scope="row">${occurrence.id}</th>`; 
            row.insertCell().textContent = occurrence.localizacao;
            
            const statusCell = row.insertCell();
            const statusSpan = document.createElement('span');
            statusSpan.className = getStatusBadgeClass(occurrence.status);
            statusSpan.textContent = occurrence.status;
            statusCell.appendChild(statusSpan);

            row.insertCell().textContent = occurrence.tipoAssistencia;
            row.insertCell().textContent = formatDateTimeForDisplay(occurrence.dataHora); 
            
            const descCell = row.insertCell();
            const shortDesc = occurrence.descricao.length > 50 ? occurrence.descricao.substring(0, 50) + "..." : occurrence.descricao;
            descCell.textContent = shortDesc;
            descCell.title = occurrence.descricao;

            row.addEventListener('click', function() {
                const occurrenceId = this.getAttribute('data-occurrence-id');
                const clickedOccurrence = occurrencesData.find(o => o.id === occurrenceId);
                
                if (clickedOccurrence && modalDetalhesOcorrenciaInstance) {
                    idOcorrenciaEmEdicao = clickedOccurrence.id; 

                    if(modalDetalhesOcorrenciaLabel) modalDetalhesOcorrenciaLabel.textContent = `Detalhes da Ocorrência ${clickedOccurrence.id}`;
                    if(detalheOcorrenciaId) detalheOcorrenciaId.textContent = clickedOccurrence.id;
                    if(detalheOcorrenciaLocalizacao) detalheOcorrenciaLocalizacao.textContent = clickedOccurrence.localizacao;
                    if(detalheOcorrenciaStatus) {
                        detalheOcorrenciaStatus.className = getStatusBadgeClass(clickedOccurrence.status);
                        detalheOcorrenciaStatus.textContent = clickedOccurrence.status;
                    }
                    if(detalheOcorrenciaTipoAssistencia) detalheOcorrenciaTipoAssistencia.textContent = clickedOccurrence.tipoAssistencia;
                    if(detalheOcorrenciaDataHora) detalheOcorrenciaDataHora.textContent = formatDateTimeForDisplay(clickedOccurrence.dataHora);
                    if(detalheOcorrenciaDescricao) detalheOcorrenciaDescricao.textContent = clickedOccurrence.descricao;
                    
                    if(detalheOcorrenciaEquipes) {
                        if (clickedOccurrence.equipesAlocadas && clickedOccurrence.equipesAlocadas.length > 0) {
                            detalheOcorrenciaEquipes.textContent = clickedOccurrence.equipesAlocadas.join(', ');
                        } else {
                            detalheOcorrenciaEquipes.textContent = "Nenhuma equipe alocada.";
                        }
                    }
                    modalDetalhesOcorrenciaInstance.show();
                }
            });
        });
    }

    function aplicarFiltrosErenderizar() {
        const termoPesquisa = searchOcorrenciasInput ? searchOcorrenciasInput.value.toLowerCase() : "";
        const dataFiltro = filtroDataOcorrenciaInput ? filtroDataOcorrenciaInput.value : ""; 
        const tipoFiltro = filtroTipoAssistenciaSelect ? filtroTipoAssistenciaSelect.value : "";
        const statusFiltro = filtroStatusOcorrenciaSelect ? filtroStatusOcorrenciaSelect.value : "";

        let ocorrenciasFiltradas = occurrencesData.filter(o => {
            const correspondePesquisa = termoPesquisa === "" ||
                o.id.toLowerCase().includes(termoPesquisa) ||
                o.localizacao.toLowerCase().includes(termoPesquisa) ||
                o.tipoAssistencia.toLowerCase().includes(termoPesquisa) ||
                o.descricao.toLowerCase().includes(termoPesquisa) ||
                o.status.toLowerCase().includes(termoPesquisa) ||
                formatDateTimeForDisplay(o.dataHora).toLowerCase().includes(termoPesquisa) ||
                (o.equipesAlocadas && o.equipesAlocadas.join(', ').toLowerCase().includes(termoPesquisa));

            const correspondeData = dataFiltro === "" || (o.dataHora && o.dataHora.startsWith(dataFiltro));
            
            const correspondeTipo = tipoFiltro === "" || o.tipoAssistencia === tipoFiltro;
            const correspondeStatus = statusFiltro === "" || o.status === statusFiltro;

            return correspondePesquisa && correspondeData && correspondeTipo && correspondeStatus;
        });
        renderOccurrencesTable(ocorrenciasFiltradas);
    }


    if (formNovaOcorrencia) {
        formNovaOcorrencia.addEventListener('submit', function(event) {
            event.preventDefault();
            const localizacao = document.getElementById('ocorrenciaLocalizacao').value.trim();
            const tipoAssistencia = document.getElementById('ocorrenciaTipoAssistencia').value;
            const status = document.getElementById('ocorrenciaStatus').value;
            const dataHoraInput = document.getElementById('ocorrenciaDataHora').value; 
            const descricao = document.getElementById('ocorrenciaDescricao').value.trim();
            
            const equipesAlocadasSelecionadas = [];
            if (checkboxesEquipesContainer) {
                const checkboxes = checkboxesEquipesContainer.querySelectorAll('.form-check-input:checked');
                checkboxes.forEach(checkbox => {
                    equipesAlocadasSelecionadas.push(checkbox.value);
                });
            }

            if (!localizacao || !tipoAssistencia || !status || !dataHoraInput || !descricao) {
                alert('Por favor, preencha todos os campos obrigatórios da ocorrência.');
                return;
            }

            if (modoEdicao && idOcorrenciaEmEdicao) {
                const index = occurrencesData.findIndex(o => o.id === idOcorrenciaEmEdicao);
                if (index !== -1) {
                    occurrencesData[index] = {
                        ...occurrencesData[index], 
                        localizacao,
                        status,
                        tipoAssistencia,
                        dataHora: dataHoraInput, 
                        descricao,
                        equipesAlocadas: equipesAlocadasSelecionadas
                    };
                    alert('Ocorrência atualizada com sucesso!');
                } else {
                    alert('Erro ao encontrar ocorrência para atualizar.');
                }
            } else {
                const novaOcorrencia = {
                    id: `#${nextOccurrenceIdNum++}`,
                    localizacao,
                    status,
                    tipoAssistencia,
                    dataHora: dataHoraInput, 
                    descricao,
                    equipesAlocadas: equipesAlocadasSelecionadas 
                };
                occurrencesData.unshift(novaOcorrencia); 
                alert('Nova ocorrência registrada com sucesso!');
            }
            
            aplicarFiltrosErenderizar(); 
            resetarFormularioNovaOcorrencia();
            if (modalNovaOcorrenciaInstance) modalNovaOcorrenciaInstance.hide();
            if (ocorrenciasOffcanvasInstance && ocorrenciasOffcanvasInstance.hide) {
                 try { ocorrenciasOffcanvasInstance.hide(); } catch(e) {}
            }
        });
    }

    if (btnEditarOcorrenciaNoModalDetalhes) {
        btnEditarOcorrenciaNoModalDetalhes.addEventListener('click', function() {
            if (!idOcorrenciaEmEdicao) { 
                alert("Não foi possível identificar a ocorrência para edição. Por favor, abra os detalhes da ocorrência novamente.");
                return;
            }
            const ocorrenciaParaEditar = occurrencesData.find(o => o.id === idOcorrenciaEmEdicao);
            if (ocorrenciaParaEditar) {
                modoEdicao = true;
                preencherFormularioParaEdicao(ocorrenciaParaEditar);
                if (modalDetalhesOcorrenciaInstance) modalDetalhesOcorrenciaInstance.hide();
                if (modalNovaOcorrenciaInstance) modalNovaOcorrenciaInstance.show();
            } else {
                alert("Ocorrência não encontrada para edição.");
            }
        });
    }

    if (modalNovaOcorrenciaElement) {
        modalNovaOcorrenciaElement.addEventListener('hidden.bs.modal', function () {
            if (modoEdicao) { 
                resetarFormularioNovaOcorrencia();
            }
        });
    }
    
    if (btnAtualizarListaOcorrencias) {
        btnAtualizarListaOcorrencias.addEventListener('click', function() {
            aplicarFiltrosErenderizar(); 
            if (ocorrenciasOffcanvasInstance && ocorrenciasOffcanvasInstance.hide) {
                try { ocorrenciasOffcanvasInstance.hide(); } catch(e) {}
            }
        });
    }

    if (searchOcorrenciasInput) {
       searchOcorrenciasInput.addEventListener('input', aplicarFiltrosErenderizar);
    }
    if (filtroDataOcorrenciaInput) {
        filtroDataOcorrenciaInput.addEventListener('change', aplicarFiltrosErenderizar);
    }
    if (filtroTipoAssistenciaSelect) {
        filtroTipoAssistenciaSelect.addEventListener('change', aplicarFiltrosErenderizar);
    }
    if (filtroStatusOcorrenciaSelect) {
        filtroStatusOcorrenciaSelect.addEventListener('change', aplicarFiltrosErenderizar);
    }

    if (btnLimparFiltrosOcorrencias) {
        btnLimparFiltrosOcorrencias.addEventListener('click', function() {
            if (searchOcorrenciasInput) searchOcorrenciasInput.value = '';
            if (filtroDataOcorrenciaInput) filtroDataOcorrenciaInput.value = '';
            if (filtroTipoAssistenciaSelect) filtroTipoAssistenciaSelect.value = '';
            if (filtroStatusOcorrenciaSelect) filtroStatusOcorrenciaSelect.value = '';
            aplicarFiltrosErenderizar();
        });
    }

    const dataHoraInputOcorrencia = document.getElementById('ocorrenciaDataHora');
    if (dataHoraInputOcorrencia && !dataHoraInputOcorrencia.value) {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localNow = new Date(now.getTime() - offset); 
        try {
            dataHoraInputOcorrencia.value = localNow.toISOString().slice(0, 16);
        } catch (e) {}
    }

    popularCheckboxesEquipes();
    popularFiltroTipoAssistencia(); 
    aplicarFiltrosErenderizar(); 
});