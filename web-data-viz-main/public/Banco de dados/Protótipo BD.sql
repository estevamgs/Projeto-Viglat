CREATE DATABASE projetopi;
USE projetopi;

CREATE TABLE registro (
  idTemp INT PRIMARY KEY AUTO_INCREMENT,
  dt_Hora DATETIME DEFAULT current_timestamp,
  temperatura INT,
  umidade INT,
  );
  
  SELECT * FROM registro;

  truncate registro;
    
  drop table registro;
  