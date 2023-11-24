CREATE DATABASE mtdb1;
use mtdb1;

CREATE TABLE hotel(
id_ht VARCHAR(15) NOT NULL,
desc_ht VARCHAR(20) NOT NULL,
PRIMARY KEY (id_ht));

create table room(
id_rt VARCHAR(15) NOT NULL,
desc_rt VARCHAR(20) NOT NULL,
PRIMARY KEY (id_rt));

creat table visitors(
id_v INT NOT NULL AUTO_INCREMENT,
fam_name VARCHAR(30) NOT NULL,
giv_name VARCHAR(30) NOT NULL,
sex CHAR(1) NOT NULL,
num_perso INT NOT NULL,
num_days INT NOT NULL,
hotel_type VARCHAR(15) NOT NULL,
room_type VARCHAR(15) NOT NULL,
PRIMARY KEY (id_v),
FOREIGN KEY (hotel_type) REFERENCES hotel(id_ht),
FOREIGN KEY (room_type) REFERENCES room(id_rt));

create table activities(
id_act VARCHAR(15) NOT NULL,
desc_act VARCHAR(20) NOT NULL,
price DECIMAL(7,2) NOT NULL,
PRIMARY KEY (id_act));

create table enrollments(
id_v INT NOT NULL
id_act VARCHAR(15) NOT NULL,
PRIMARY KEY (id_v, id_act)
FOREIGN KEY (id_v) REFERENCES visitors(id_v),
FOREIGN KEY (id_act) REFERENCES activities(id_act));

insert into hotel(id_ht, desc_ht)
values 
( "s_1", "1 star"),
( "s_2", "2 stars"),
("s_3", "3 stars" ),
( "s_4", "4 stars" ),
( "s_5", "5 stars" );


insert into room (id_rt,desc_rt) 
values
( "single-room", "Single room"),
("semi-suite" ,  "Semi-suite"),
("suite" , "Suite"),
("double-suite" ,"Double suite");

inserto into activities (id_act, desc_act, price)
values 
("bus_tour", "City-bus-tours", 20.00 ),
( "spa", "Spa-Manage",  100.00 ),
("sport", "Sport Event", 150.00 ),
("bike", "Bike", 50.00 );