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

desc registro;

insert into sensor values
(default,'Sensor de Temperatura e Umidade','DHT11','acima da escada',null);

select * from registro;

select user,host from mysql.user;

create user 'usuarioApi'@'%' identified by '2004Poder1@';

grant insert on projetopi.* to 'usuarioApi'@'%';

flush privileges;

