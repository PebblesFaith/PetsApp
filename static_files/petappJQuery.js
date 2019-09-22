$(document).ready(function() {
    console.log('Hello Browser!!!');

    $('#readButton').click(function() {
        const requestURL = 'users/' + $('#nameBox').val();
        console.log('making ajax request to : ', requestURL);

        $.ajax({
            url: requestURL,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('You have received some data!', data);

                // Apply Error Case if statement analysis.
                if (data.job && data.pet) {
                    $('#status').html('Successfully fetched data at URL:' + requestURL);
                    $('#jobDiv').html('My title is ' + data.job);
                    $('#petImage').attr('src', data.pet).attr('width', '300px');
                }
                else {
                    $('#status').html('ERROR: Request could not find data URL: ' + requestURL);
                    $('#jobDiv').html('');
                    $('#petImage').attr('src', '').attr('width', '0px');
                }
            }
        });

    });


    $('#allUsersButton').click(function() {       

        $.ajax({
            url: 'users/',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log('You received some data!', data);
                $('#status').html('All users: ' + data);
            }
        });        
    });

    $('#insertButton').click(function() {
        console.log('Insert Button clicked!!!');
        $.ajax({
            url: 'users',
            type: 'POST',
            data: {
                    name: $('#insertNameBox').val(),
                    job: $('#insertJobBox').val(),
                    pet: $('#insertPetBox').val(),
            },
            success: function(data) {
                $('#status').html(data.message);                
            }


        });
        
    });





    // What does an AJAX Error Handler means, well, whenever there is an error in making an AJAX call function, as above, if any of these above
    // AJAX functions does not handle correctly then the AJAX function below is a catch-all function for the above
    // AJAX functions. The AJAX Error Handler below says, if something is wrong with the above click handler functions.
    $(document).ajaxError(function() {
        $('#status').html('ERROR: Unknown AJAX ERROR!');

    });

});