CREATE DATABASE projetopi;
USE projetopi;

CREATE TABLE empresa (
idEmpresa int primary key auto_increment,
nome varchar(45),
cnpj char(14)
);

CREATE TABLE endereco (
idEndereco int primary key auto_increment,
cep char(8),
complemento varchar(45),
numLogradouro char(5)
);

CREATE TABLE usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(75),
senha varchar(30),
empresa_id int,
constraint fkEmp foreign key (empresa_id) references empresa(idEmpresa)
);

CREATE TABLE fazenda (
idFazenda int primary key auto_increment,
nome varchar(45),
empresaId int,
enderecoId int,
constraint fkEmpFazenda foreign key (empresaId) references empresa(idEmpresa),
constraint fkEndereco foreign key (enderecoId) references endereco(idEndereco)
);

CREATE TABLE camara (
idCamara int primary key auto_increment,
nomeCamara varchar(30),
capacidade float,
fazendaId int,
constraint fkFaz foreign key (fazendaId) references fazenda(idFazenda)
);

CREATE TABLE sensor (
idSensor int primary key auto_increment,
nome varchar(45),
tipo varchar(25),
localizacao varchar(45),
camaraId int,
constraint fkCam foreign key (camaraId) references camara(idCamara)
);


CREATE TABLE registro (
idRegistro int AUTO_INCREMENT,
idSensor int,
dt_Hora datetime default now(),
umidade int,
temperatura int,
primary key(idRegistro,idSensor),
constraint fkSensor foreign key (idSensor) references sensor(idSensor)
);

CREATE TABLE alerta(
    idAlerta INT,
    SensorId INT,
    registroId INT,
    dtHora DATETIME DEFAULT NOW(),
    quantidade INT,
    PRIMARY KEY (idAlerta, SensorId),
    CONSTRAINT sensorFk
        FOREIGN KEY (SensorId)
        REFERENCES sensor(idSensor)
);

SELECT
    idSituacao,
    SensorId,
    numero,
    CASE
        WHEN dht11_temperatura > 18 THEN 'Alerta'
        ELSE 'Ideal'
    END AS situacaoSensor_temperatura,
        CASE
        WHEN dht11_temperatura > 90 THEN 'Alerta'
        ELSE 'Ideal'
    END AS situacaoSensor_umidade
    
FROM situacao;

-- 1. Empresas produtoras de queijo artesanal
INSERT INTO empresa (nome, cnpj) VALUES
('Queijos Artesanais Minas Gerais LTDA', '12345678000190'),
('Fazenda Atalaia Paulista ME', '98765432000110'),
('Serra da Canastra Queijos EIRELI', '45678912000155');

-- 2. Endereços das fazendas
INSERT INTO endereco (cep, complemento, numLogradouro) VALUES
('37945000', 'Zona Rural - Bairro São José', 'S/N'),
('13430000', 'Sítio Atalaia - Km 15', '125'),
('37464000', 'Fazenda Boa Vista - Estrada Real', '42');

-- 3. Usuários administradores/fazendeiros vinculados às empresas
INSERT INTO usuario (nome, email, senha, empresa_id) VALUES
('Carlos Henrique Oliveira', 'carlos.henrique@minasqueijos.com', 'Minas@2024', 1),
('Ana Paula Ferreira', 'ana.ferreira@fazendaatalaia.com', 'Atalaia#2024', 2),
('Roberto Silva Canastra', 'roberto.canastra@serraqueijos.com', 'Canastra!99', 3);

-- 4. Fazendas vinculadas às empresas e endereços
INSERT INTO fazenda (nome, empresaId, enderecoId) VALUES
('Fazenda São José da Serra', 1, 1),
('Fazenda Atalaia Paulista', 2, 2);

-- 5. Câmaras de maturação nas fazendas
INSERT INTO camara (nomeCamara, capacidade, fazendaId) VALUES
('Câmara de Maturação 01', 500.0, 1),
('Câmara de Maturação 02', 750.0, 1),
('Câmara Principal - Atalaia', 1200.0, 2),
('Câmara de Maturação 04', 600, 1);


-- 6. Sensores DHT11 instalados nas câmaras
INSERT INTO sensor (nome, tipo, localizacao, camaraId) VALUES
('Sensor A - Câmara 01', 'DHT11', 'Entrada', 1),
('Sensor B - Câmara 01', 'DHT11', 'Centro', 1),
('Sensor C - Câmara 01', 'DHT11', 'Fundos', 1),

('Sensor A - Câmara 02', 'DHT11', 'Entrada', 2),
('Sensor B - Câmara 02', 'DHT11', 'Centro', 2),
('Sensor C - Câmara 02', 'DHT11', 'Fundos', 2),

('Sensor A - Câmara 03', 'DHT11', 'Entrada', 3),
('Sensor B - Câmara 03', 'DHT11', 'Centro', 3),
('Sensor C - Câmara 03', 'DHT11', 'Fundos', 3),

('Sensor A - Câmara 04', 'DHT11', 'Entrada', 4),
('Sensor B - Câmara 04', 'DHT11', 'Centro', 4),
('Sensor C - Câmara 04', 'DHT11', 'Fundos', 4);

-- insert dos registros de temperatura e umidade 

INSERT INTO registro (idRegistro, idSensor, umidade, temperatura)
VALUES
-- Câmara 1 
(133, 1, 82, 19),
(134, 1, 85, 20),
(135, 1, 88, 21),

(136, 2, 79, 18),
(137, 2, 84, 22),
(138, 2, 91, 23),

(139, 3, 81, 20),
(140, 3, 86, 21),
(141, 3, 89, 22),

-- Câmara 2

(142, 4, 76, 17),
(143, 4, 78, 18),
(144, 4, 92, 23),

(145, 5, 74, 24),
(146, 5, 80, 22),
(147, 5, 88, 21),

(148, 6, 93, 25),
(149, 6, 89, 22),
(150, 6, 77, 19),

-- Câmara 3 
(151, 7, 83, 19),
(152, 7, 85, 20),
(153, 7, 87, 21),

(154, 8, 82, 20),
(155, 8, 86, 21),
(156, 8, 90, 22),

(157, 9, 79, 18),
(158, 9, 84, 20),
(159, 9, 88, 21),

-- Câmara 4 
(160, 10, 68, 14),
(161, 10, 72, 16),
(162, 10, 96, 27),

(163, 11, 65, 28),
(164, 11, 70, 26),
(165, 11, 98, 30),

(166, 12, 69, 15),
(167, 12, 74, 17),
(168, 12, 97, 31);
select * from sensor JOIN usuario ON ;
-- 7. Situações dos sensores
INSERT INTO situacao (idSituacao, SensorId, situacaoSensor, descricao) VALUES
(1, 1, 'Captando registro', 'Sensor operando normalmente desde a instalação'),
(1, 2, 'Captando registro', 'Sensor operando normalmente - calibrado mensalmente'),
(1, 3, 'Não captando registro', 'Sensor com falha de conexão - necessita manutenção'),
(1, 4, 'Captando registro', 'Sensor novo instalado na semana passada'),
(1, 5, 'Captando registro', 'Sensor operando com leituras estáveis');

desc registro;



select user,host from mysql.user;

create user 'usuarioApi'@'%' identified by '2004Poder1@';
select * from usuario;

grant insert on projetopi.* to 'usuarioApi'@'%';

flush privileges;
SHOW VARIABLES LIKE 'port';
USE projetopi;
SHOW TABLES;

SELECT * FROM sensor WHERE camaraId = 1;
SELECT * FROM registro;

select * from usuario;

INSERT INTO registro (idSensor, temperatura, umidade)
VALUES
(1, 24, 86),
(1, 25, 88),
(1, 23, 84);

ALTER TABLE registro
MODIFY COLUMN idRegistro INT AUTO_INCREMENT;
SELECT
    u.idUsuario,
    u.nome AS usuario,
    f.nome AS fazenda,
    c.nomeCamara,
    s.idSensor,
    s.nome AS sensor,
    s.tipo,
    s.localizacao
FROM usuario u
JOIN empresa e
    ON u.empresa_id = e.idEmpresa
JOIN fazenda f
    ON f.empresaId = e.idEmpresa
JOIN camara c
    ON c.fazendaId = f.idFazenda
JOIN sensor s
    ON s.camaraId = c.idCamara
ORDER BY u.nome, c.nomeCamara, s.nome;

select * from usuario;
