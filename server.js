// Import the Express Library.
const express = require('express');//
const app = express();

app.use(express.static('static_files'));

const fakeDatabase = {
    'Phillip': {job: 'Professor', pet: 'Cat.jpg'},
    'John': {job: 'Student', pet: 'Dog.jpg'},
    'Carol': {job: 'Engineer', pet: 'Bear.jpg'}
};

app.get('/users', function(request, response) {
    
    const allUserNames = Object.keys(fakeDatabase);
    console.log('All users names: ', allUserNames);
    response.send(allUserNames);

});

app.get('/users/:userid', function(request, response) {
    const nameToLookUp = request.params.userid;
    const val = fakeDatabase[nameToLookUp];
    console.log(nameToLookUp, '-->', val);
    if(val) {
        response.send(val);
    }
    else {
        response.send({}); //failed, so return an empty object instead of undefined
    };
    


});






const port = 3000;

app.listen(port, function() {
    console.log('Server is listening on start at http://locathost: ' + 3000 + '/');
});
