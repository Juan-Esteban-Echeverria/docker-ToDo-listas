CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE todos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre varchar(255) NOT NULL,
    descripcion varchar(255) NOT NULL,
    fecha DATE NOT NULL DEFAULT NOW()
);

INSERT INTO todos (nombre, descripcion) VALUES ('Fron End', 'Crear vistas');
INSERT INTO todos (nombre, descripcion) VALUES ('Back End', 'Conectar la base de datos');
INSERT INTO todos (nombre, descripcion) VALUES ('Data Base', 'crear la base de datos');

