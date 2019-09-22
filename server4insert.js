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


app.get('/users', function(request, response) {
    db.all('SELECT name FROM users_to_pets', function (err, rows) {

        console.log(rows);
        const allUserNames = rows.map(e => e.name);
        console.log(allUserNames);
        response.send(allUserNames); 
    
    });    
});

// POST request is for posting new data to the server.
const bodyParser = require('body-parser');
// Connect to my web application.
app.use(bodyParser.urlencoded({extended: true}));
app.post('/users', function(request, response) {
    console.log(request.body);
    //response.send({});

    db.run(
        'INSERT INTO users_to_pets VALUES ($name, $job, $pet)',
        {
            $name: request.body.name,
            $job: request.body.job,
            $pet: request.body.pet
        },
        (err)  => {
            if (err) {
                response.send({message: 'error in app.post(/users)'});                
            }
            else {
                response.send({message: 'successfully run app.post(/users)'});
            }

        }

    );

});

