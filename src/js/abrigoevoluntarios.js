// --- DADOS GLOBAIS ---
let nextShelterId = 1;

let sheltersData = [
    {id: nextShelterId++, nome: "CEU Parque São Rafael (Leste)", endereco: "Av. Ragueb Chohfi, 1400 - Pq. São Rafael, São Paulo - SP", capacidade: 120, vagasDisponiveis: 25, telefone: "(11) 98765-1111"},
    {id: nextShelterId++, nome: "Ginásio Ibirapuera (Sul)", endereco: "Rua Manuel da Nóbrega, 1361 - Ibirapuera, São Paulo - SP", capacidade: 180, vagasDisponiveis: 40, telefone: "(11) 98765-2222"},
    {id: nextShelterId++, nome: "Centro Cultural da Juventude (Norte)", endereco: "Av. Dep. Emílio Carlos, 3641 - V. dos Andrades, São Paulo - SP", capacidade: 150, vagasDisponiveis: 30, telefone: "(11) 98765-3333"},
    {id: nextShelterId++, nome: "Memorial da América Latina (Oeste)", endereco: "Av. Mário de Andrade, 664 - Barra Funda, São Paulo - SP", capacidade: 200, vagasDisponiveis: 50, telefone: "(11) 98765-4444"},
    {id: nextShelterId++, nome: "Estação da Luz (Centro)", endereco: "Praça da Luz, s/n - Luz, São Paulo - SP", capacidade: 100, vagasDisponiveis: 10, telefone: "(11) 98765-5500"},
    {id: nextShelterId++, nome: "CEU Vila Curuçá (Leste II)", endereco: "Av. Marechal Tito, 3452 - Vila Curuçá, São Paulo - SP", capacidade: 130, vagasDisponiveis: 60, telefone: "(11) 98765-1122"},
    {id: nextShelterId++, nome: "Clube Tietê (Norte II)", endereco: "Av. Santos Dumont, 843 - Luz, São Paulo - SP", capacidade: 160, vagasDisponiveis: 20, telefone: "(11) 98765-3344"},
    {id: nextShelterId++, nome: "Praça da Sé (Ponto de Apoio Central)", endereco: "Praça da Sé - Sé, São Paulo - SP", capacidade: 90, vagasDisponiveis: 15, telefone: "(11) 98765-5555"}
];

let nextVolunteerId = 1;
const initialVolunteersData = [ 
    { id: nextVolunteerId++, nome: "Ana Silva", telefone: "(11) 91111-1111", especialidade: "Médico", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Bruno Costa", telefone: "(21) 92222-2222", especialidade: "Resgate", disponibilidade: "Indisponível" },
    { id: nextVolunteerId++, nome: "Carlos Dias", telefone: "(31) 93333-3333", especialidade: "Logística", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Daniela Eve", telefone: "(41) 94444-4444", especialidade: "Comunicação", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Eduardo Farias", telefone: "(51) 95555-5555", especialidade: "Primeiros Socorros", disponibilidade: "Indisponível" },
    { id: nextVolunteerId++, nome: "Fernanda Lima", telefone: "(11) 96666-1111", especialidade: "Cozinha", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Gustavo Borges", telefone: "(21) 97777-2222", especialidade: "Limpeza", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Helena Martins", telefone: "(31) 98888-3333", especialidade: "Apoio Psicológico", disponibilidade: "Indisponível" },
    { id: nextVolunteerId++, nome: "Igor Nogueira", telefone: "(41) 99999-4444", especialidade: "Logística", disponibilidade: "Disponível" },
    { id: nextVolunteerId++, nome: "Juliana Alves", telefone: "(51) 91234-5555", especialidade: "Outra", disponibilidade: "Disponível", observacao: "Tradutora Libras" }
];

let volunteersData = [...initialVolunteersData];

document.addEventListener('DOMContentLoaded', function() {

    const sheltersTableBody = document.getElementById('sheltersTableBody');
    const volunteersTableBody = document.getElementById('volunteersTableBody');
    const formNovoAbrigo = document.getElementById('formNovoAbrigo');
    const modalNovoAbrigoElement = document.getElementById('modalNovoAbrigo');
    const modalNovoAbrigo = bootstrap.Modal.getInstance(modalNovoAbrigoElement) || new bootstrap.Modal(modalNovoAbrigoElement);
    const formNovoVoluntario = document.getElementById('formNovoVoluntario');
    const modalNovoVoluntarioElement = document.getElementById('modalNovoVoluntario');
    let modalNovoVoluntario = bootstrap.Modal.getInstance(modalNovoVoluntarioElement) || new bootstrap.Modal(modalNovoVoluntarioElement);
    
    const managementOffcanvasElement = document.getElementById('managementOffcanvas');

    const btnListarAbrigosOffcanvas = document.getElementById('btnListarAbrigosOffcanvas');
    const btnRemoverAbrigoOffcanvas = document.getElementById('btnRemoverAbrigoOffcanvas');
    const btnListarPessoasNoAbrigo = document.getElementById('btnListarPessoasNoAbrigo');
    const btnRemoveVolunteerOffcanvas = document.getElementById('btnRemoveVolunteerOffcanvas');

    const modalListarPessoasElement = document.getElementById('modalListarPessoas');
    let modalListarPessoasInstance = null;
    if (modalListarPessoasElement) modalListarPessoasInstance = new bootstrap.Modal(modalListarPessoasElement);
    const listarPessoasAbrigoNomeElement = document.getElementById('listarPessoasAbrigoNome');
    const totalPessoasNoAbrigoElement = document.getElementById('totalPessoasNoAbrigo');
    const listaPessoasAbrigoElement = document.getElementById('listaPessoasAbrigo');

    const modalSelecionarAbrigoParaListarPessoasElement = document.getElementById('modalSelecionarAbrigoParaListarPessoas');
    let modalSelecionarAbrigoParaListarPessoasInstance = null;
    if (modalSelecionarAbrigoParaListarPessoasElement) modalSelecionarAbrigoParaListarPessoasInstance = new bootstrap.Modal(modalSelecionarAbrigoParaListarPessoasElement);
    const selectAbrigoParaListarPessoasElement = document.getElementById('selectAbrigoParaListarPessoas');
    const btnConfirmarSelecaoAbrigoParaListarPessoasElement = document.getElementById('btnConfirmarSelecaoAbrigoParaListarPessoas');
    const semAbrigosParaSelecionarMsgElement = document.getElementById('semAbrigosParaSelecionar');

    const modalSelecionarAbrigoParaExcluirElement = document.getElementById('modalSelecionarAbrigoParaExcluir');
    let modalSelecionarAbrigoParaExcluirInstance = null;
    if (modalSelecionarAbrigoParaExcluirElement) modalSelecionarAbrigoParaExcluirInstance = new bootstrap.Modal(modalSelecionarAbrigoParaExcluirElement);
    const selectAbrigoParaExcluirElement = document.getElementById('selectAbrigoParaExcluir');
    const btnConfirmarExclusaoAbrigoElement = document.getElementById('btnConfirmarExclusaoAbrigo');
    const semAbrigosParaExcluirMsgElement = document.getElementById('semAbrigosParaExcluirMsg');

    const modalSelecionarVoluntarioParaExcluirElement = document.getElementById('modalSelecionarVoluntarioParaExcluir');
    let modalSelecionarVoluntarioParaExcluirInstance = null;
    if (modalSelecionarVoluntarioParaExcluirElement) modalSelecionarVoluntarioParaExcluirInstance = new bootstrap.Modal(modalSelecionarVoluntarioParaExcluirElement);
    const selectVoluntarioParaExcluirElement = document.getElementById('selectVoluntarioParaExcluir');
    const btnConfirmarExclusaoVoluntarioElement = document.getElementById('btnConfirmarExclusaoVoluntario');
    const semVoluntariosParaExcluirMsgElement = document.getElementById('semVoluntariosParaExcluirMsg');

    const specialtyFilterButton = document.getElementById('specialtyFilterButton');
    const specialtyDropdownMenu = document.getElementById('specialtyDropdownMenu');
    const availabilityFilterButton = document.getElementById('availabilityFilterButton');
    const availabilityDropdownMenu = document.getElementById('availabilityDropdownMenu');

    let currentSpecialtyFilter = 'Todos';
    let currentAvailabilityFilter = 'Todos';

    function updateOffcanvasButtonStates() {
        if (btnRemoverAbrigoOffcanvas) {
            btnRemoverAbrigoOffcanvas.disabled = sheltersData.length === 0;
        }
        if (btnListarPessoasNoAbrigo) {
            btnListarPessoasNoAbrigo.disabled = sheltersData.length === 0;
        }
        if (btnRemoveVolunteerOffcanvas) {
            btnRemoveVolunteerOffcanvas.disabled = volunteersData.length === 0;
        }
    }

    function renderSheltersTable(shelters) { 
        if (!sheltersTableBody) { console.error("Tabela de abrigos não encontrada!"); return; }
        
        sheltersTableBody.innerHTML = ''; 

        if (shelters.length === 0) {
            sheltersTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum abrigo cadastrado.</td></tr>';
        } else {
            shelters.forEach(shelter => {
                const row = sheltersTableBody.insertRow();
                row.setAttribute('data-id', shelter.id);
                row.insertCell().textContent = shelter.nome;
                const addressCell = row.insertCell();
                const addressLink = document.createElement('a');
                addressLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shelter.endereco)}`;
                addressLink.textContent = shelter.endereco;
                addressLink.target = "_blank";
                addressCell.appendChild(addressLink);
                row.insertCell().textContent = shelter.capacidade;
                row.insertCell().textContent = shelter.vagasDisponiveis;
                row.insertCell().textContent = shelter.telefone || 'N/D';
            });
        }
        updateOffcanvasButtonStates(); 
    }

    function renderVolunteersTable(volunteers) {
        if (!volunteersTableBody) { console.error("Tabela de voluntários não encontrada!"); return; }
        volunteersTableBody.innerHTML = '';

        if (volunteers.length === 0) {
            volunteersTableBody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum voluntário cadastrado.</td></tr>';
        } else {
            volunteers.forEach(volunteer => {
                const row = volunteersTableBody.insertRow();
                row.setAttribute('data-id', volunteer.id);
                row.insertCell().textContent = volunteer.nome;
                row.insertCell().textContent = volunteer.telefone;
                row.insertCell().textContent = volunteer.especialidade;
                row.insertCell().textContent = volunteer.disponibilidade;
            });
        }
        updateOffcanvasButtonStates();
    }

    function exibirModalListaPessoas(shelter) {
        if (!shelter || !modalListarPessoasInstance) { console.error("exibirModalListaPessoas: Abrigo ou instância do modal nulos."); return; }
        if (!listarPessoasAbrigoNomeElement || !totalPessoasNoAbrigoElement || !listaPessoasAbrigoElement) {console.error("exibirModalListaPessoas: Elementos internos do modal não encontrados."); return; }

        listarPessoasAbrigoNomeElement.textContent = shelter.nome;
        listaPessoasAbrigoElement.innerHTML = '';
        const numeroDePessoasExemplo = 45;
        totalPessoasNoAbrigoElement.textContent = `Total de ${numeroDePessoasExemplo} pessoa(s) neste abrigo (exemplo):`;
        for (let i = 1; i <= numeroDePessoasExemplo; i++) {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `Pessoa de Exemplo ${i}`;
            listaPessoasAbrigoElement.appendChild(listItem);
        }
        modalListarPessoasInstance.show();
    }

    function filterAndRenderVolunteers() {
        const filteredVolunteers = volunteersData.filter(volunteer => {
            const specialtyMatch = (currentSpecialtyFilter === 'Todos' || volunteer.especialidade === currentSpecialtyFilter);
            const availabilityMatch = (currentAvailabilityFilter === 'Todos' || volunteer.disponibilidade === currentAvailabilityFilter);
            return specialtyMatch && availabilityMatch;
        });
        renderVolunteersTable(filteredVolunteers);
    }

    function setupFilters() {
        if (specialtyDropdownMenu && specialtyFilterButton) {
            specialtyDropdownMenu.addEventListener('click', function(event) {
                if (event.target.classList.contains('dropdown-item')) {
                    event.preventDefault();
                    currentSpecialtyFilter = event.target.textContent;
                    specialtyFilterButton.textContent = currentSpecialtyFilter === 'Todos' ? 'Especialidade' : `Especialidade: ${currentSpecialtyFilter}`;
                    filterAndRenderVolunteers();
                }
            });
        }
        if (availabilityDropdownMenu && availabilityFilterButton) {
            availabilityDropdownMenu.addEventListener('click', function(event) {
                if (event.target.classList.contains('dropdown-item')) {
                    event.preventDefault();
                    currentAvailabilityFilter = event.target.textContent;
                    availabilityFilterButton.textContent = currentAvailabilityFilter === 'Todos' ? 'Disponibilidade' : `Disponibilidade: ${currentAvailabilityFilter}`;
                    filterAndRenderVolunteers();
                }
            });
        }
    }

    if (formNovoAbrigo) {
        formNovoAbrigo.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('shelterName').value.trim();
            const endereco = document.getElementById('shelterAddress').value.trim();
            const capacidade = parseInt(document.getElementById('shelterCapacity').value);
            const vagasDisponiveis = parseInt(document.getElementById('shelterVacancies').value);
            const telefone = document.getElementById('shelterPhone').value.trim();
            if (!nome || !endereco || isNaN(capacidade) || isNaN(vagasDisponiveis)) {
                alert('Por favor, preencha todos os campos obrigatórios (Nome, Endereço, Capacidade, Vagas).'); return;
            }
            if (vagasDisponiveis > capacidade) {
                alert('O número de vagas disponíveis não pode ser maior que a capacidade total.'); return;
            }
            const novoAbrigo = { id: nextShelterId++, nome, endereco, capacidade, vagasDisponiveis, telefone };
            sheltersData.push(novoAbrigo);
            renderSheltersTable(sheltersData); 
            formNovoAbrigo.reset();
            modalNovoAbrigo.hide();
            alert('Novo abrigo registrado com sucesso!');
            updateOffcanvasButtonStates(); 
        });
    }

    if (formNovoVoluntario) {
        formNovoVoluntario.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('volunteerName').value.trim();
            const telefone = document.getElementById('volunteerPhone').value.trim();
            const especialidade = document.getElementById('volunteerSpecialty').value;
            const disponibilidade = document.getElementById('volunteerAvailability').value;
            if (!nome || !telefone || especialidade === "" || disponibilidade === "") {
                let mensagemErro = "Por favor, preencha todos os campos obrigatórios do voluntário.";
                if (especialidade === "") mensagemErro = "Por favor, selecione uma especialidade para o voluntário.";
                else if (disponibilidade === "") mensagemErro = "Por favor, selecione uma disponibilidade para o voluntário.";
                alert(mensagemErro); return;
            }
            const novoVoluntario = { id: nextVolunteerId++, nome, telefone, especialidade, disponibilidade };
            volunteersData.push(novoVoluntario);
            filterAndRenderVolunteers(); 
            formNovoVoluntario.reset();
            if (modalNovoVoluntario && typeof modalNovoVoluntario.hide === 'function') modalNovoVoluntario.hide();
            alert('Novo voluntário adicionado com sucesso!');
            updateOffcanvasButtonStates();
        });
    }

    if (btnListarPessoasNoAbrigo && modalSelecionarAbrigoParaListarPessoasInstance && selectAbrigoParaListarPessoasElement) {
        btnListarPessoasNoAbrigo.addEventListener('click', () => {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(managementOffcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();

            if (sheltersData.length === 0) {
                selectAbrigoParaListarPessoasElement.innerHTML = '<option value="">Nenhum abrigo disponível</option>';
                selectAbrigoParaListarPessoasElement.disabled = true;
                if (semAbrigosParaSelecionarMsgElement) semAbrigosParaSelecionarMsgElement.style.display = 'block';
                if (btnConfirmarSelecaoAbrigoParaListarPessoasElement) btnConfirmarSelecaoAbrigoParaListarPessoasElement.disabled = true;
            } else {
                selectAbrigoParaListarPessoasElement.innerHTML = '<option value="">Selecione um abrigo...</option>';
                sheltersData.forEach(shelter => {
                    const option = document.createElement('option');
                    option.value = shelter.id;
                    option.textContent = shelter.nome;
                    selectAbrigoParaListarPessoasElement.appendChild(option);
                });
                selectAbrigoParaListarPessoasElement.disabled = false;
                if (semAbrigosParaSelecionarMsgElement) semAbrigosParaSelecionarMsgElement.style.display = 'none';
                if (btnConfirmarSelecaoAbrigoParaListarPessoasElement) btnConfirmarSelecaoAbrigoParaListarPessoasElement.disabled = false;
            }
            modalSelecionarAbrigoParaListarPessoasInstance.show();
        });
    }
    if (btnConfirmarSelecaoAbrigoParaListarPessoasElement && selectAbrigoParaListarPessoasElement) {
        btnConfirmarSelecaoAbrigoParaListarPessoasElement.addEventListener('click', () => {
            const abrigoIdSelecionado = parseInt(selectAbrigoParaListarPessoasElement.value);
            if (!abrigoIdSelecionado) {
                alert("Por favor, selecione um abrigo da lista."); return;
            }
            const abrigoSelecionado = sheltersData.find(s => s.id === abrigoIdSelecionado);
            if (abrigoSelecionado) {
                modalSelecionarAbrigoParaListarPessoasInstance.hide();
                exibirModalListaPessoas(abrigoSelecionado);
            } else {
                alert("Abrigo selecionado não encontrado. Por favor, tente novamente.");
            }
        });
    }

    // --- FLUXO DE EXCLUSÃO DE ABRIGO ---
    if (btnRemoverAbrigoOffcanvas && modalSelecionarAbrigoParaExcluirInstance && selectAbrigoParaExcluirElement && semAbrigosParaExcluirMsgElement && btnConfirmarExclusaoAbrigoElement) {
        btnRemoverAbrigoOffcanvas.addEventListener('click', () => {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(managementOffcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();
            
          
            if (sheltersData.length === 0) {
                selectAbrigoParaExcluirElement.innerHTML = '<option value="">Nenhum abrigo disponível</option>';
                selectAbrigoParaExcluirElement.disabled = true;
                semAbrigosParaExcluirMsgElement.style.display = 'block';
                btnConfirmarExclusaoAbrigoElement.disabled = true;
            } else {
                selectAbrigoParaExcluirElement.innerHTML = '<option value="">Selecione um abrigo para excluir...</option>';
                sheltersData.forEach(shelter => {
                    const option = document.createElement('option');
                    option.value = shelter.id;
                    option.textContent = `${shelter.nome} (ID: ${shelter.id})`;
                    selectAbrigoParaExcluirElement.appendChild(option);
                });
                selectAbrigoParaExcluirElement.disabled = false;
                semAbrigosParaExcluirMsgElement.style.display = 'none';
                btnConfirmarExclusaoAbrigoElement.disabled = false;
            }
            modalSelecionarAbrigoParaExcluirInstance.show();
        });
    }
    if (btnConfirmarExclusaoAbrigoElement && selectAbrigoParaExcluirElement) {
        btnConfirmarExclusaoAbrigoElement.addEventListener('click', () => {
            const abrigoIdParaExcluir = parseInt(selectAbrigoParaExcluirElement.value);
            if (!abrigoIdParaExcluir) {
                alert("Por favor, selecione um abrigo da lista para excluir."); return;
            }
            const abrigoParaExcluir = sheltersData.find(s => s.id === abrigoIdParaExcluir);
            if (!abrigoParaExcluir) {
                alert("Abrigo selecionado para exclusão não encontrado."); return;
            }
            if (confirm(`Tem certeza que deseja remover o abrigo "${abrigoParaExcluir.nome}"?`)) {
           
                sheltersData = sheltersData.filter(shelter => shelter.id !== abrigoIdParaExcluir);
                
               

                renderSheltersTable(sheltersData);
                alert('Abrigo removido com sucesso!');
                modalSelecionarAbrigoParaExcluirInstance.hide();
                updateOffcanvasButtonStates(); 
            }
        });
    }

    // --- FLUXO DE EXCLUSÃO DE VOLUNTÁRIO ---
    if (btnRemoveVolunteerOffcanvas && modalSelecionarVoluntarioParaExcluirInstance && selectVoluntarioParaExcluirElement && semVoluntariosParaExcluirMsgElement && btnConfirmarExclusaoVoluntarioElement) {
        btnRemoveVolunteerOffcanvas.addEventListener('click', () => {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(managementOffcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();

            if (volunteersData.length === 0) {
                selectVoluntarioParaExcluirElement.innerHTML = '<option value="">Nenhum voluntário disponível</option>';
                selectVoluntarioParaExcluirElement.disabled = true;
                semVoluntariosParaExcluirMsgElement.style.display = 'block';
                btnConfirmarExclusaoVoluntarioElement.disabled = true;
            } else {
                selectVoluntarioParaExcluirElement.innerHTML = '<option value="">Selecione um voluntário para excluir...</option>';
                volunteersData.forEach(volunteer => {
                    const option = document.createElement('option');
                    option.value = volunteer.id;
                    option.textContent = `${volunteer.nome} (ID: ${volunteer.id}, Esp: ${volunteer.especialidade})`;
                    selectVoluntarioParaExcluirElement.appendChild(option);
                });
                selectVoluntarioParaExcluirElement.disabled = false;
                semVoluntariosParaExcluirMsgElement.style.display = 'none';
                btnConfirmarExclusaoVoluntarioElement.disabled = false;
            }
            modalSelecionarVoluntarioParaExcluirInstance.show();
        });
    }
    if (btnConfirmarExclusaoVoluntarioElement && selectVoluntarioParaExcluirElement) {
        btnConfirmarExclusaoVoluntarioElement.addEventListener('click', () => {
            const voluntarioIdParaExcluir = parseInt(selectVoluntarioParaExcluirElement.value);
            if (!voluntarioIdParaExcluir) {
                alert("Por favor, selecione um voluntário da lista para excluir."); return;
            }
            const voluntarioParaExcluir = volunteersData.find(v => v.id === voluntarioIdParaExcluir);
            if (!voluntarioParaExcluir) {
                alert("Voluntário selecionado para exclusão não encontrado."); return;
            }
            if (confirm(`Tem certeza que deseja remover o voluntário "${voluntarioParaExcluir.nome}"?`)) {
                volunteersData = volunteersData.filter(volunteer => volunteer.id !== voluntarioIdParaExcluir);
                filterAndRenderVolunteers();
                alert('Voluntário removido com sucesso!');
                modalSelecionarVoluntarioParaExcluirInstance.hide();
                updateOffcanvasButtonStates();
            }
        });
    }
    
    if(btnListarAbrigosOffcanvas) {
        btnListarAbrigosOffcanvas.addEventListener('click', () => {
            renderSheltersTable(sheltersData);
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(managementOffcanvasElement);
            if (offcanvasInstance) offcanvasInstance.hide();
            if(sheltersTableBody.rows.length > 0) sheltersTableBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // INICIALIZAÇÃO
    renderSheltersTable(sheltersData);
    filterAndRenderVolunteers();
    setupFilters();
    updateOffcanvasButtonStates();
});



