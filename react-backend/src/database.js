var async = require('async');
var fs = require('fs');
var pg = require('pg');

// Connect to the "teamfit" database.
var config = {
    user: 'root',
    host: 'localhost',
    database: 'teamfit',
    port: 26257
};

// Create a pool.
var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {

    // Close communication with the database and exit.
    var finish = function () {
        done();
        process.exit();
    };

    if (err) {
        console.error('could not connect to cockroachdb', err);
        finish();
    }
    async.waterfall([
            function (next) {
                // Create the 'users' table.
                client.query('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, password INT, name STRING);', next);
            },
            function (results, next) {
                // Insert three rows into the 'users' table.
                client.query('INSERT INTO users VALUES (2602678740, \'password\', \'Zayed\');', next);
            },
            function (results, next) {
                // Print out user's details.
                client.query('SELECT * FROM users;', next);
            },
        ],
        function (err, results) {
            if (err) {
                console.error('Error inserting into and selecting from users: ', err);
                finish();
            }

            console.log('User\'s info:');
            results.rows.forEach(function (row) {
                console.log(row);
            });

            finish();
        });
});