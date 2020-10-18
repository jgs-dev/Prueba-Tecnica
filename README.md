# PruebaTecnicaDesarrollador

This project is a full-stack done with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7. express/node.js and MySql for a work test to Diego Castellanos

## How to setup

- Run `npm install` to install all the dependencies for the front-end part of the app (angular), then navigate to Prueba-Tecnica-Server and  run `npm install` to install all the server-dependencies (node.js/express). Then create your MySQL database, this is the commands I used to create it
`create database gitei charset utf8 collate utf8_spanish_ci;
use gitei;
create table personas(
	id int primary key auto_increment,
    cedula bigint not null,
    nombre varchar(100) not null,
    apellido varchar(100) not null
);` afterwards start your database. 
- Go to Prueba-Tecnica-Server/src/index.js and change the `connection` data with your own login for the database.
- Run `ng serve --open`, you should have a window in `http://localhost:4200/` with the app runnin.  

