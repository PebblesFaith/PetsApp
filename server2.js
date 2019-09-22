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


    

app.get('/users', function(request, response) {
    db.all('SELECT name FROM users_to_pets ', function (err, rows) {

        console.log(rows);
        const allUserNames = rows.map(e => e.name);
        console.log(allUserNames);
        response.send(allUserNames); 
  

    
    });
    
});

