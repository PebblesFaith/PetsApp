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


    
app.get('/users/:userId', function(request, response) {
    // Matches ':userId' above.
    const nameToLookUp = request.params.userId;
    // SQL Query
    db.all(
        'SELECT * FROM users_to_pets WHERE name = $name',
        // Parameters to pass into the SQL Query.
        {
        $name: nameToLookUp
        },      
  
        // Callback function to run when the Query  finishes.
        function (err, rows) {
            console.log(rows);
            if (rows.length > 0) {
                response.send(rows[0]);
            }
            else {
                // Failed, so returns an empty object instead of underfined.
                response.send({});

            }

    });
    
});
