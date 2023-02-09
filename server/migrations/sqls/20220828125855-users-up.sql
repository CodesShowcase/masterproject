CREATE TYPE gastype AS ENUM ('diesel', 'e5', 'e10', '');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  avatar VARCHAR(160),
  car VARCHAR(40),
  gas gastype,
  alarm NUMERIC(3,2) CHECK (alarm > 0),
  tanksize INTEGER CHECK (tanksize > 0),
  mileage NUMERIC(3,1) CHECK (mileage > 0),
  yearlydriving INTEGER CHECK (yearlydriving > 0),
  location VARCHAR(80)
);

INSERT INTO users VALUES (1, 'The', 'Admin', 'admin', 'admin@gasprices.com', '$2b$10$y5SW4l9xqco9af0wQQH1aObRFCn39RKAqCriQD/Uq0h96hHfIqyn2', '/assets/images/avatar-anonymous.png', 'Ford F150', 'e5', 9.99, 150, 12.5, 12000, 'ARAL Bismarckstraße 2 Berlin');
-- admin password: 12345678

ALTER SEQUENCE users_id_seq RESTART WITH 2;
