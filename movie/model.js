import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'sml12345',
    database: 'movie-db',
});

await connection.connect();

export async function getAll(userId) {
    const query =
        'SELECT Movies.*, (SELECT rating FROM Ratings WHERE movie = Movies.id AND user = ?) AS rating, (SELECT AVG(rating) FROM Ratings WHERE movie = Movies.id) AS allRatings FROM Movies WHERE Movies.user = ? OR public = 1';
    const [data] = await connection.query(query, [userId, userId]);
    return data;
}

async function insert(movie, userId) {
    const query =
        'INSERT INTO Movies (title, year, public, user) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(query, [
        movie.title,
        movie.year,
        movie.public,
        userId,
    ]);
    return {...movie, id: result.insertId };
}

async function update(movie, userId) {
    const query =
        'UPDATE Movies SET title = ?, year = ?, public = ?, user = ? WHERE id = ?';
    await connection.query(query, [
        movie.title,
        movie.year,
        movie.public,
        userId,
        movie.id,
    ]);
    return movie;
}

export async function get(id, userId) {
    const query =
        'SELECT Movies.*, (SELECT rating FROM Ratings WHERE movie = ? AND user = ?) AS rating, (SELECT AVG(rating) FROM Ratings WHERE movie = ?) AS allRatings FROM Movies WHERE id = ? AND (Movies.user = ? OR public = 1)';
    const [data] = await connection.query(query, [id, userId, id, id, userId]);
    return data.pop();
}

export async function remove(id, userId) {
    const query = 'DELETE FROM Movies WHERE id = ? AND (user = ? OR public = 1)';
    await connection.query(query, [id, userId]);
    return;
}

export function save(movie, userId) {
    if (movie.id) {
        return update(movie, userId);
    }
    return insert(movie, userId);
}

export async function updateRate(movie, userId, rating) {
    const query = 'UPDATE Ratings SET rating = ? WHERE user = ? AND movie = ?;';
    await connection.query(query, [rating, userId, movie.id]);
    return movie;
}

export async function insertRate(movie, userId, rating) {
    const query = 'INSERT INTO Ratings (rating, user, movie) VALUES (?, ?, ?);';
    await connection.query(query, [rating, userId, movie.id]);
    return movie;
}

export async function checkRate(movie, userId) {
    const query = 'SELECT rating FROM Ratings WHERE user = ? AND movie = ?;'
    const [data] = await connection.query(query, [userId, movie.id]);
    return data.length;
}

export async function rate(movie, userId, rate) {
    var checkRateArray = await checkRate(movie, userId);
    if (checkRateArray > 0) {
        return updateRate(movie, userId, rate);
    }
    return insertRate(movie, userId, rate);
}