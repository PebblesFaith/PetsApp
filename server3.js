// Import the Express Library.
const express = require('express');//
const app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('Pets.db');

app.use(express.static('static_files'));

const port = 3000;

app.listen(port, function() {
    console.log('Server is listening on start at http://locathost: ' + 3000 + '/');
});


    

// Queries
app.get('/users/:userId', function(request, response) {
    // Matches ':userId' above.
    const nameToLookUp = request.params.userId;
    db.all(
        'SELECT * FROM users_to_pets WHERE name = $name',
        {
        $name: nameToLookUp,
        },
        processRows);
  

    function processRows(err, rows) {
        console.log(rows);
        if (rows.lenght > 0) {
            response.send(rows.$name);
        }
        else {

        }

    };
    
});
