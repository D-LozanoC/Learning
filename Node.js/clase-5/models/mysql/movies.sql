-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS moviesdb;

-- Usar
USE moviesdb;
-- Crear tabla movies 
CREATE TABLE movies (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(255) NOT NULL,
	year INT NOT NULL,
	director VARCHAR(255) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movies(id),
	genre_id INT REFERENCES genres(id),
	PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES 
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-fi'),
('Romance'),
('Animated');

INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), "Interstellar", 2014, "Cristopher Nolan", 180, "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg", 8.6),
(UUID_TO_BIN(UUID()), "The Matrix", 1999, "Lana Wachowski", 136, "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg", 8.7),
(UUID_TO_BIN(UUID()), "The Lion King", 1994, "Roger Allers, Rob Minkoff", 88, "https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg", 8.5);


INSERT INTO movie_genres (movie_id, genre_id)
VALUES
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movies WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movies WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movies WHERE title = 'The Lion King'), (SELECT id FROM genre WHERE name = 'Animated'));


SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate
FROM movies as m 
JOIN movie_genres as mg 
JOIN genre as g 
WHERE g.id = mg.genre_id AND m.id = mg.movie_id AND g.name = '';

SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.`name` FROM movies as m JOIN movie_genres as mg JOIN genre as g WHERE m.id = mg.movie_id AND g.id = mg.genre_id AND LOWER(g.name) = 'action';

SELECT BIN_TO_UUID(m.id), title, year, director, duration, poster, rate FROM movies;

SELECT * FROM genre;