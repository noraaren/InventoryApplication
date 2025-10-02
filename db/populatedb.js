const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS movies(
    MovieID SERIAL PRIMARY KEY,
    Image VARCHAR(255),
    Description VARCHAR(255),
    Title VARCHAR(255),
    Genre VARCHAR(50),
    Actors TEXT[],
    Year INT,
    Rating DECIMAL(2,1)
);

INSERT INTO movies (Image, Description, Title, Genre, Actors, Year, Rating) 
VALUES
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9q3OPIolLtV-OnkzBzQgT1ETU3OdvBY-dg&s', 'A movie about a boy who wants to be a superhero', 'The Amazing Spider-Man', 'Action, Adventure, Sci-Fi', ARRAY['Andrew Garfield', 'Emma Stone', 'Rhys Ifans'], 2012, 7.0),
  ('https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 'A billionaire industrialist and genius inventor builds a powered exoskeleton and becomes the armored superhero Iron Man', 'Iron Man', 'Action, Adventure, Sci-Fi', ARRAY['Robert Downey Jr.', 'Gwyneth Paltrow', 'Jeff Bridges'], 2008, 7.9),
  ('https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg', 'The Avengers must stop Thanos from collecting all six Infinity Stones', 'Avengers: Infinity War', 'Action, Adventure, Drama', ARRAY['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'], 2018, 8.4),
  ('https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 'A team of professional thieves plans to pull off the ultimate heist', 'Inception', 'Action, Sci-Fi, Thriller', ARRAY['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'], 2010, 8.8),
  ('https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests', 'The Dark Knight', 'Action, Crime, Drama', ARRAY['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'], 2008, 9.0),
  ('https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', 'A young woman is swept into a fantasy world where she must battle the forces of evil', 'The Wizard of Oz', 'Adventure, Family, Fantasy', ARRAY['Judy Garland', 'Frank Morgan', 'Ray Bolger'], 1939, 8.1),
  ('https://m.media-amazon.com/images/M/MV5BMjE0MjNjNDEtYjJhMC00YzFhLWE3YzctM2Y2YzQ0YjQ5YzQ5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', 'A young wizard discovers his magical heritage and attends Hogwarts School', 'Harry Potter and the Philosopher''s Stone', 'Adventure, Family, Fantasy', ARRAY['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint'], 2001, 7.6),
  ('https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU3MDM0Mw@@._V1_.jpg', 'A computer hacker learns about the true nature of reality', 'The Matrix', 'Action, Sci-Fi', ARRAY['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], 1999, 8.7),
  ('https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YTktNTE0NDVhOGM3M2FhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', 'A young lion prince is cast out of his pride by his cruel uncle', 'The Lion King', 'Animation, Adventure, Drama', ARRAY['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'], 1994, 8.5),
  ('https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg', 'A young girl moves to a new town and discovers a secret world of spirits', 'Spirited Away', 'Animation, Adventure, Family', ARRAY['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'], 2001, 8.6),
  ('https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', 'A young boy befriends a friendly alien stranded on Earth', 'E.T. the Extra-Terrestrial', 'Adventure, Family, Sci-Fi', ARRAY['Henry Thomas', 'Dee Wallace', 'Peter Coyote'], 1982, 7.8),
  ('https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg2MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_.jpg', 'A space merchant vessel receives a distress call from an alien planet', 'Alien', 'Horror, Sci-Fi, Thriller', ARRAY['Sigourney Weaver', 'Tom Skerritt', 'John Hurt'], 1979, 8.4),
  ('https://m.media-amazon.com/images/M/MV5BMTY3MjI1NDU1NV5BMl5BanBnXkFtZTcwODQ0NTMzNA@@._V1_.jpg', 'A young woman falls in love with a vampire', 'Twilight', 'Drama, Fantasy, Romance', ARRAY['Kristen Stewart', 'Robert Pattinson', 'Taylor Lautner'], 2008, 5.2),
  ('https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg', 'A young woman discovers she has magical powers and attends a school for witches', 'The Craft', 'Drama, Fantasy, Horror', ARRAY['Robin Tunney', 'Fairuza Balk', 'Neve Campbell'], 1996, 6.4),
  ('https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', 'A young man discovers he has the power to manipulate time', 'About Time', 'Comedy, Drama, Fantasy', ARRAY['Domhnall Gleeson', 'Rachel McAdams', 'Bill Nighy'], 2013, 7.8);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://aaronren:732293@localhost:5432/movies",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();