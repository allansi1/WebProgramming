

CREATE DATABASE IF NOT EXISTS nodedb2;

USE nodedb2;

CREATE TABLE students(
  id INT  NOT NULL  AUTO_INCREMENT, 
  fam_name VARCHAR(30) NOT NULL, 
  giv_name VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
);


CREATE TABLE courses(
  id VARCHAR(10)  NOT NULL, 
  title VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE enrollments(
  s_id INT NOT NULL, 
  c_id VARCHAR(10)  NOT NULL,  
  PRIMARY KEY (s_id, c_id),
  FOREIGN KEY (s_id) REFERENCES students(id),
  FOREIGN KEY (c_id) REFERENCES courses(id)
);



INSERT INTO courses (id,title) 
VALUES ('c001','Mathematics'), 
       ('c002','Computer Science'),
       ('c003','French'),
       ('c004','History');
