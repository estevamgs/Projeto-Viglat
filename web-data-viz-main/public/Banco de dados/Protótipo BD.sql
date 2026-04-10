CREATE DATABASE PROJETOPI;
USE PROJETOPI;

CREATE TABLE temperatura (
  idTemp INT PRIMARY KEY AUTO_INCREMENT,
  dt_Hora DATETIME DEFAULT current_timestamp,
  temperatura INT
  );
  
  CREATE TABLE umidade (
  idUmidade INT PRIMARY KEY AUTO_INCREMENT,
  dt_Hora DATETIME DEFAULT current_timestamp,
  umidade INT
  );
  
  SELECT * FROM temperatura;
  
  SELECT * FROM umidade;
  
  truncate temperatura;
  
  truncate umidade;
    
  drop table temperatura;
  
  drop table umidade;