import mysql from 'mysql2';

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world'
});

// Test connection

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// query to identify names of countries with population greater than 8 million
connection.query('SELECT name FROM country WHERE population > 8000000', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Countries with population greater than 8 million:', results);
});

// query the names of the countries that have land in their name
connection.query('SELECT name FROM country WHERE name LIKE "%land%"', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Countries with land in their name:', results);
});


// query the names of the cities with population in between 500,000 and 1 million
connection.query('SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Cities with population between 500,000 and 1 million:', results);
});

// query the name of all the countries on the continent ‘Europe’?

connection.query('SELECT name FROM country WHERE continent = "Europe"', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Countries in Europe:', results);
});

// query list all the countries in the descending order of their surface areas

connection.query('SELECT name FROM country ORDER BY surfacearea DESC', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Countries in descending order of surface area:', results);
});

// query the names of all the cities in the Netherlands

connection.query('SELECT name FROM city WHERE countrycode = "NLD"', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Cities in the Netherlands:', results);
});

// query the population of Rotterdam

connection.query('SELECT population FROM city WHERE name = "Rotterdam"', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Population of Rotterdam:', results);
});

// query top 10 countries by surface area

connection.query('SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Top 10 countries by surface area:', results);
});

// query the top 10 most populated cities

connection.query('SELECT name FROM city ORDER BY population DESC LIMIT 10', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Top 10 most populated cities:', results);
});

// query the population of the world

connection.query('SELECT SUM(population) AS world_population FROM country', (err, results) => {
    if (err) {
        console.error('Error querying the database:', err);
        return;
    }
    console.log('Population of the world:', results);
});

// close the connection
connection.end((err) => {
    if (err) {
        console.error('Error closing the database:', err);
        return;
    }
    console.log('Closed the database connection');
});
