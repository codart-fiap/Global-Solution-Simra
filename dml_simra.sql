
-- DML AREA DE RISCO

INSERT INTO T_SIM_AREA_DE_RISCO(id_area_de_risco, nome, localizacao , limiar_alerta, grau_de_risco) VALUES (1, 'Àrea 1', 'Zona Noroeste - São Paulo', 100.0, 'BAIXO');
INSERT INTO T_SIM_AREA_DE_RISCO(id_area_de_risco, nome, localizacao , limiar_alerta, grau_de_risco) VALUES (2, 'Àrea 2', 'Centro - São Paulo', 300.0, 'MÉDIO');
INSERT INTO T_SIM_AREA_DE_RISCO(id_area_de_risco, nome, localizacao , limiar_alerta, grau_de_risco) VALUES (3, 'Àrea teste', 'Centro - São Paulo', 200.0, 'ALTO');

INSERT INTO T_SIM_AREA_DE_RISCO(id_area_de_risco, nome, localizacao, limiar_alerta, grau_de_risco) 
VALUES (4, 'Área excluida', 'Centro - São Paulo', 400.0, 'ALTO');

UPDATE T_SIM_AREA_DE_RISCO SET nome = 'Àrea 3' WHERE ID_AREA_DE_RISCO = 3;


SELECT * FROM T_SIM_AREA_DE_RISCO;


-- DML SENSORES

INSERT INTO T_SIM_SENSORES (id_sensor, localizacao, tipo, leitura_atual, unidade, status, id_area_de_risco)
VALUES (1,'Rio Tietê - Ponte Velha, Piqueri','Nível de Água',2.5,'m','ATIVO',1);


INSERT INTO T_SIM_SENSORES (id_sensor, localizacao, tipo, leitura_atual, unidade, status, id_area_de_risco)
VALUES (2,'Córrego do moinho - Morro Verder, Vila Prudente','Chuva',350.0,'mm/hr','ATIVO',2);

INSERT INTO T_SIM_SENSORES (id_sensor, localizacao, tipo, leitura_atual, unidade, status, id_area_de_risco)
VALUES (3,'Encosta do Rio Tamanduateí - Pq. D. Pedro ||, Centro','Chuva',700.0,'mm/hr','INATIVO',3);

INSERT INTO T_SIM_SENSORES (id_sensor, localizacao, tipo, leitura_atual, unidade, status, id_area_de_risco)
VALUES (4,'endereço inválido','Chuva',NULL,NULL,'INATIVO',4);

UPDATE T_SIM_SENSORES SET localizacao = 'Rio Tietê', tipo = 'Nível de Água' WHERE id_sensor = 4;

DELETE FROM T_SIM_SENSORES WHERE id_sensor = 4;

SELECT * FROM T_SIM_SENSORES;


-- DML EQUIPE RESGATE

INSERT INTO T_SIM_EQUIPE_RESGATE (id_equipe_resgate,nome, contato, disponivel, id_area_de_risco) VALUES (1,'Corpo de Bombeiros', '193', 1, 1);
INSERT INTO T_SIM_EQUIPE_RESGATE (id_equipe_resgate,nome, contato, disponivel, id_area_de_risco) VALUES (2,'Defesa Civil', '199', 1, 2);
INSERT INTO T_SIM_EQUIPE_RESGATE (id_equipe_resgate,nome, contato, disponivel, id_area_de_risco) VALUES (3,'Samu', '192', 1, 3);
INSERT INTO T_SIM_EQUIPE_RESGATE (id_equipe_resgate,nome, contato, disponivel, id_area_de_risco) VALUES (4,'Polícia Civil', '190', 1, 4);

UPDATE T_SIM_EQUIPE_RESGATE SET nome = 'Médicos Sem Fronteira', disponivel = 0, contato = '(21) 3796-8700' WHERE id_equipe_resgate = 4;

DELETE FROM T_SIM_EQUIPE_RESGATE WHERE id_area_de_risco = 4;

SELECT * FROM T_SIM_EQUIPE_RESGATE;

-- DML ALERTA

INSERT INTO T_SIM_ALERTA (id_alerta, titulo, descricao, gravidade, id_area_de_risco)
VALUES (1,'ALERTA BAIXO','Nível de Chuva em area de risco 1  esta normal, (2.5 m)','ATENÇÃO',1);

INSERT INTO T_SIM_ALERTA (id_alerta, titulo, descricao, gravidade, id_area_de_risco)
VALUES (2,'ALERTA MÉDIO','Nível de Chuva em area de risco 2  esta médio, (350.0 mm/hr)','EMERGÊNCIA',2);

INSERT INTO T_SIM_ALERTA (id_alerta, titulo, descricao, gravidade, id_area_de_risco)
VALUES (3,'ALERTA ALTO','Nível de Chuva em area de risco 3  esta alto, (700.0 mm/hr)','CRÍTICO',3);

INSERT INTO T_SIM_ALERTA (id_alerta, titulo, descricao, gravidade, id_area_de_risco)
VALUES (4,'ALERTA FALSO (EXCLUIR)','Nível de Chuva em area de risco 4  esta alto, (700.0 mm/hr)','CRÍTICO',4);

UPDATE T_SIM_ALERTA SET descricao = 'Nível de Chuva em area de risco 4  esta normal, (2.5 mm/hr)' WHERE id_alerta = 4;

DELETE FROM T_SIM_ALERTA WHERE id_alerta = 4;

SELECT * FROM T_SIM_ALERTA;

-- DML OCORRÊNCIA ALAGAMENTO

INSERT INTO T_SIM_OCORRENCIA_ALAGAMENTO (
    id_ocorrencia_alagamento,
    status,
    localizacao,
    descricao,
    tipo_ajuda,
    id_area_de_risco) VALUES (
        1,
        'CONCLUÍDO',
        'Rio Tietê - Ponte Velha, Piqueri',
        'Carros ilhados no viaduto.',
        'Reboque e Resgate',
        1);

INSERT INTO T_SIM_OCORRENCIA_ALAGAMENTO (
    id_ocorrencia_alagamento,
    status,
    localizacao,
    descricao,
    tipo_ajuda,
    id_area_de_risco) VALUES (
        2,
        'EM ATENDIMENTO',
        'Córrego do moinho - Morro Verder, Vila Prudente',
        'Alagamento na rua, água entrando nas casas.',
        'Resgate e Abrigo',
        2);

INSERT INTO T_SIM_OCORRENCIA_ALAGAMENTO (
    id_ocorrencia_alagamento,
    status,
    localizacao,
    descricao,
    tipo_ajuda,
    id_area_de_risco) VALUES (
        3,
        'PENDENTE',
        'Encosta do Rio Tamanduateí - Pq. D. Pedro ||, Centro',
        'Rio transbordando.',
        'Evacuação e Resgate',
        3);

INSERT INTO T_SIM_OCORRENCIA_ALAGAMENTO (
    id_ocorrencia_alagamento,
    status,
    localizacao,
    descricao,
    tipo_ajuda,
    id_area_de_risco) VALUES (
        4,
        'PENDENTE',
        'endereço inválido',
        'Alagamento na rua, água entrando nas casas.',
        'Resgate e Abrigo',
        4);

UPDATE T_SIM_OCORRENCIA_ALAGAMENTO SET localizacao = 'Rio Tietê - Ponte Velha, Piqueri', descricao = 'Carros ilhados no viaduto.' WHERE id_ocorrencia_alagamento = 4;

DELETE FROM T_SIM_OCORRENCIA_ALAGAMENTO WHERE id_ocorrencia_alagamento = 4;

SELECT * FROM T_SIM_OCORRENCIA_ALAGAMENTO;

DELETE FROM T_SIM_AREA_DE_RISCO WHERE id_area_de_risco = 4;

-- DML ABRIGO

INSERT INTO T_SIM_ABRIGO (id_abrigo, nome, endereco, capacidade, vagas_disponiveis, telefone)
VALUES (1,'CEU Parque São Rafael (Leste)','Av. Ragueb Chohfi, 1400 - Pq São Rafael. São Paulo - SP', 120, 25, '(11) 98765-11111');

INSERT INTO T_SIM_ABRIGO (id_abrigo, nome, endereco, capacidade, vagas_disponiveis, telefone)
VALUES (2,'Ginásio Ibirapuera (Sul)','Rua Manual da Nobrega, 1361 -Ibirapuera, São Paulo - SP', 180, 40, '(11) 98765-2222');

INSERT INTO T_SIM_ABRIGO (id_abrigo, nome, endereco, capacidade, vagas_disponiveis, telefone)
VALUES (3,'Centro Cultural da Juventude (Norte)','Av. Dep. Emíliio Carlos, 3641 - V. dos Andrades, São Paulo - SP', 150, 30, '(11) 98765-3333');

INSERT INTO T_SIM_ABRIGO (id_abrigo, nome, endereco, capacidade, vagas_disponiveis, telefone)
VALUES (4, 'Abrigo Inválido (Oeste)','endereço inválido', 150, 50, '(11) 98765-2222');

UPDATE T_SIM_ABRIGO SET nome = 'Abrigo Temporário (Oeste)', endereco = 'Rua Exemplo, 123 - Bairro, São Paulo - SP', capacidade = 200, vagas_disponiveis = 50, telefone = '(11) 98765-1542' WHERE id_abrigo = 4;

SELECT * FROM T_SIM_ABRIGO;


-- DML Pessoa Abrigada

INSERT INTO T_SIM_PESSOA_ABRIGADA (id_pessoa_abrigada, nome, idade, genero, id_abrigo) VALUES (1, 'João da Silva', 30, 'MASCULINO', 1);
INSERT INTO T_SIM_PESSOA_ABRIGADA (id_pessoa_abrigada, nome, idade, genero, id_abrigo) VALUES (2, 'Maria Oliveira', 25, 'FEMININO', 2);
INSERT INTO T_SIM_PESSOA_ABRIGADA (id_pessoa_abrigada, nome, idade, genero, id_abrigo) VALUES (3, 'Carlos Souza', 28, 'OUTRO', 3);
INSERT INTO T_SIM_PESSOA_ABRIGADA (id_pessoa_abrigada, nome, idade, genero, id_abrigo) VALUES (4, 'Ana Santos', 22, 'FEMININO', 4);

UPDATE T_SIM_PESSOA_ABRIGADA SET nome = 'desconhecido', idade = 23, genero = 'FEMININO' WHERE id_pessoa_abrigada = 4;

DELETE FROM T_SIM_PESSOA_ABRIGADA WHERE id_pessoa_abrigada = 4;

SELECT * FROM T_SIM_PESSOA_ABRIGADA;

-- DML VOLUNTÁRIO 

INSERT INTO T_SIM_VOLUNTARIO (id_voluntario, nome, telefone, especialidade, disponivel, id_abrigo)
VALUES (1, 'Pedro Almeida', '(11) 98765-4321', 'Enfermeiro', 1, 1);

INSERT INTO T_SIM_VOLUNTARIO (id_voluntario, nome, telefone, especialidade, disponivel, id_abrigo)
VALUES (2, 'Maria Oliveira', '(11) 98765-4322', 'Médico', 1, 2);

INSERT INTO T_SIM_VOLUNTARIO (id_voluntario, nome, telefone, especialidade, disponivel, id_abrigo)
VALUES (3, 'Carlos Souza', '(11) 98765-4323', 'Assistente Social', 1, 3);

INSERT INTO T_SIM_VOLUNTARIO (id_voluntario, nome, telefone, especialidade, disponivel, id_abrigo)
VALUES (4, 'Ana Santos', '(11) 98765-4324', 'Psicólogo', 1, 4);

UPDATE T_SIM_VOLUNTARIO SET especialidade = 'desempregado' WHERE id_voluntario = 4;

DELETE FROM T_SIM_VOLUNTARIO WHERE id_voluntario = 4;

SELECT * FROM T_SIM_VOLUNTARIO;

DELETE FROM T_SIM_ABRIGO WHERE id_abrigo = 4;




COMMIT;