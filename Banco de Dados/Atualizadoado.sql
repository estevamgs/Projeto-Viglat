CREATE DATABASE projetopi;
USE projetopi;

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
senha varchar(30)
);

CREATE TABLE fazenda (
idFazenda int primary key auto_increment,
nome varchar(45),
enderecoId int,
constraint fkEndereco foreign key (enderecoId) references endereco(idEndereco)
);

CREATE TABLE fazenda_produtor (
fkFazenda int,
fkUsuario int,
cargo varchar(45),
primary key(fkFazenda, fkUsuario),
foreign key (fkFazenda) references fazenda(idFazenda),
foreign key (fkUsuario) references usuario(idUsuario)
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
    idAlerta INT AUTO_INCREMENT,
    SensorId INT,
    registroId INT,
    dtHora DATETIME DEFAULT NOW(),
    quantidade INT,
    PRIMARY KEY (idAlerta, SensorId),
    CONSTRAINT sensorFk
        FOREIGN KEY (SensorId)
        REFERENCES sensor(idSensor)
);

-- 2. Endereços das fazendas
INSERT INTO endereco (cep, complemento, numLogradouro) VALUES
('37945000', 'Zona Rural - Bairro São José', 'S/N'),
('13430000', 'Sítio Atalaia - Km 15', '125'),
('37464000', 'Fazenda Boa Vista - Estrada Real', '42');

-- 3. Usuários administradores/fazendeiros vinculados às empresas
INSERT INTO usuario (nome, email, senha) VALUES
('Carlos Henrique Oliveira', 'carlos.henrique@minasqueijos.com', 'Minas@2024'),
('Ana Paula Ferreira', 'ana.ferreira@fazendaatalaia.com', 'Atalaia#2024'),
('Roberto Silva Canastra', 'roberto.canastra@serraqueijos.com', 'Canastra!99');

-- 4. Fazendas vinculadas às empresas e endereços
INSERT INTO fazenda (nome, enderecoId) VALUES
('Fazenda São José da Serra', 1),
('Fazenda Atalaia Paulista', 2);

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


INSERT INTO fazenda_produtor (fkFazenda, fkUsuario, cargo) VALUES
(1, 1, 'Administrador'),
(2, 2, 'Administrador'),
(1, 3, 'Produtor'),
(2, 3, 'Consultor');
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

desc registro;
SHOW VARIABLES LIKE 'port';
USE projetopi;
SHOW TABLES;

SELECT * FROM sensor WHERE camaraId = 1;
SELECT * FROM registro;

select * from usuario;

ALTER TABLE registro
MODIFY COLUMN idRegistro INT AUTO_INCREMENT;

select * from usuario;

TRUNCATE TABLE alerta;

INSERT INTO alerta (SensorId, registroId, dtHora, quantidade) VALUES 
( 1, 133, NOW() - INTERVAL 6 DAY, 1),
( 4, 142, NOW() - INTERVAL 6 DAY, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 2, 137, NOW() - INTERVAL 4 DAY, 1),
( 10, 160, NOW() - INTERVAL 4 DAY, 1),
( 11, 163, NOW() - INTERVAL 4 DAY, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 3, 140, NOW() - INTERVAL 2 DAY, 1),
( 12, 168, NOW() - INTERVAL 2 DAY, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 1, 134, NOW() - INTERVAL 1 DAY, 1),
( 5, 145, NOW() - INTERVAL 1 DAY, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 11, 164, NOW() - INTERVAL 18 HOUR, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 2, 138, NOW() - INTERVAL 12 HOUR, 1),
( 6, 148, NOW() - INTERVAL 12 HOUR, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 10, 162, NOW() - INTERVAL 6 HOUR, 1),
( 12, 167, NOW() - INTERVAL 6 HOUR, 1);

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade) VALUES 
( 11, 165, NOW() - INTERVAL 2 HOUR, 1);

INSERT INTO registro (idSensor, dt_Hora, umidade, temperatura)
VALUES (1, NOW(), 65, 32); 

INSERT INTO alerta ( SensorId, registroId, dtHora, quantidade)
VALUES ( 1, LAST_INSERT_ID(), NOW(), 1);

INSERT INTO registro (idSensor, dt_Hora, umidade, temperatura)
VALUES (1, NOW(), 65, 32);

INSERT INTO alerta (SensorId, registroId, dtHora, quantidade)
VALUES ( 1, LAST_INSERT_ID(), NOW(), 1);

INSERT INTO registro (idSensor, dt_Hora, umidade, temperatura)
VALUES (7, NOW(), 99, 34);

DELIMITER $$

CREATE TRIGGER trg_gerar_alerta_automatico
AFTER INSERT ON registro
FOR EACH ROW
BEGIN
    IF NEW.temperatura > 22 OR NEW.temperatura < 18 
       OR NEW.umidade > 90 OR NEW.umidade < 80 THEN
       
        INSERT INTO alerta (SensorId, registroId, dtHora, quantidade)
        VALUES (
            NEW.idSensor,
            NEW.idRegistro,
            NEW.dt_Hora,
            1
        );
        
    END IF;
END$$

DELIMITER ;

CREATE VIEW situacao_atual AS
SELECT
    s.nome AS sensor,
    u.nome AS usuario,
    f.nome AS fazenda,
    r.temperatura,
    r.umidade,
    CASE
        WHEN r.temperatura > 26
          OR r.temperatura < 15
          OR r.umidade > 95
          OR r.umidade < 70
        THEN 'Crítico'
        WHEN r.temperatura > 22
          OR r.temperatura < 18
          OR r.umidade > 90
          OR r.umidade < 80
        THEN 'Alerta'
        ELSE 'Ideal'
    END AS estado
	FROM sensor s
	JOIN camara c
		ON s.camaraId = c.idCamara
	JOIN fazenda f
		ON c.fazendaId = f.idFazenda
	JOIN fazenda_produtor fp
		ON f.idFazenda = fp.fkFazenda
	JOIN usuario u
		ON fp.fkUsuario = u.idUsuario
	JOIN registro r
		ON r.idSensor = s.idSensor;
        
select * from situacao_atual;

select * from registro;