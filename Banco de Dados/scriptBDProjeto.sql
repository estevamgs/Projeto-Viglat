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
idRegistro int,
idSensor int,
dt_Hora datetime default now(),
umidade int,
temperatura int,
primary key(idRegistro,idSensor),
constraint fkSensor foreign key (idSensor) references sensor(idSensor)
);

CREATE TABLE situacao (
idSituacao int,
SensorId int,
dtHora datetime default now(),
situacaoSensor varchar(25) check(situacaoSensor in ('Captando registro', 'Não captando registro')),
descricao varchar(150),
primary key (idSituacao,SensorId),
constraint sensorFk foreign key (SensorId) references sensor(idSensor)
);

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
('Câmara Principal - Atalaia', 1200.0, 2);

-- 6. Sensores DHT11 instalados nas câmaras
INSERT INTO sensor (nome, tipo, localizacao, camaraId) VALUES
('Sensor DHT11 - Entrada Câmara 01', 'DHT11', 'próximo à porta de entrada', 1),
('Sensor DHT11 - Centro Câmara 01', 'DHT11', 'centro da câmara - nível médio', 1),
('Sensor DHT11 - Fundos Câmara 02', 'DHT11', 'fundo da câmara - parede leste', 2),
('Sensor DHT11 - Atalaia Principal', 'DHT11', 'teto central da câmara', 3),
('Sensor DHT11 - Atalaia Reserva', 'DHT11', 'lateral direita próximo ao duto', 3);

-- 7. Situações dos sensores
INSERT INTO situacao (idSituacao, SensorId, situacaoSensor, descricao) VALUES
(1, 1, 'Captando registro', 'Sensor operando normalmente desde a instalação'),
(1, 2, 'Captando registro', 'Sensor operando normalmente - calibrado mensalmente'),
(1, 3, 'Não captando registro', 'Sensor com falha de conexão - necessita manutenção'),
(1, 4, 'Captando registro', 'Sensor novo instalado na semana passada'),
(1, 5, 'Captando registro', 'Sensor operando com leituras estáveis');

desc registro;

select * from registro;

select user,host from mysql.user;

create user 'usuarioApi'@'%' identified by '2004Poder1@';

grant insert on projetopi.* to 'usuarioApi'@'%';

flush privileges;

