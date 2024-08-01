create database innovatube;
use innovatube;

create table users(
id int primary key not null,
name varchar(50),
lastName varchar(50),
userName varchar(50),
email varchar(50),
password varchar(50)
);

create table favoriteVideos(
id int primary key not null,
idUser int,
video text,
FOREIGN KEY (idUser) REFERENCES users(id)
);



