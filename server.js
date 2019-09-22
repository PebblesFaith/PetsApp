// Import the Express Library.
const express = require('express');//
const app = express();

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

const port = 3000;

app.listen(port, function() {
    console.log('Server is listening on start at http://locathost: ' + 3000 + '/');
});




// I want to run each database statement "serially" one after another.
// (If I do not do this then all database statement will run in parallel for which, I do not want.)
db.serialize(function() {
    //Create a database table.
    db.run('CREATE TABLE users_to_pets (name TEXT, job TEXT, pet TEXT)');

    // Insert three (3) rows of datat;
    db.run("INSERT INTO users_to_pets VALUES ('Phillip', 'Professor', 'Cat.jpg')");
    db.run("INSERT INTO users_to_pets VALUES ('John', 'Student', 'Dog.jpg')");
    db.run("INSERT INTO users_to_pets VALUES ('Carol', 'Engineer', 'Bear.jpg')");

    console.log('Successfully created the users_to_pets table in Pet.db database.');

    // Print users_to_pets table out in order to confirm contents were coded correctly.
    db.each("SELECT name, job, pet FROM users_to_pets", function (err, row) {
        console.log(row.name + ': ' + row.job + ' - ' + row.pet);
        });

    // To test, and open this URL in my browser:
    //     http://localhost:3000/users
    

});

db.close();


//app.get('/users', function(request, response) {
  //  db.all('SELECT name FROM users_to_pets', processRows);
    //function processRows(err, rows) {
    //    if (err) {
    //        console.log('ERROR: ' + err.message);
     //   }
   //     else {
     //       console.log(rows);
       //     const allUserNames = rows.map(e => e.name);

      //  }

   // }   
       

//});


db.serialize(function() {
    // Insert Values
    //db.run('INSERT INTO Contacts VALUES (2, "Zoey", "Noel", 36)');

    // Queries
    //app.get('/users', function(request, response) {
    db.all('SELECT * FROM users_to_pets', processRows);
    });

function processRows(err, rows) {
    if(err) {
        console.log("ERROR: " + err.message);
    }
    else {
       
            console.log(rows);
        }
    }

//});





   



/*const fakeDatabase = {
    'Phillip': {job: 'Professor', pet: 'Cat.jpg'},
    'John': {job: 'Student', pet: 'Dog.jpg'},
    'Carol': {job: 'Engineer', pet: 'Bear.jpg'}
};*/


    
    //const allUserNames = Object.keys(fakeDatabase);
    // Object keys
   // console.log('All users names are: ', allUserNames);
    //response.send(allUserNames);

//});





//app.get('/users/:userid', function(request, response) {
//    const nameToLookUp = request.params.userid;
//    const val = fakeDatabase[nameToLookUp];
//    console.log(nameToLookUp, '-->', val);
//    if(val) {
//        response.send(val);
//    }
//    else {
//        response.send({}); //failed, so return an empty object instead of undefined
//    };  


//});





