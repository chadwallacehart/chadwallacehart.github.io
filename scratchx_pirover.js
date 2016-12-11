/**
 * Created by chad on 12/9/16.
 */
(function(ext) {

    var fetchHeaders = new Headers();
    var fetchInit = { method: 'GET',
        headers: fetchHeaders,
        mode: 'cors',
        cache: 'default' };
    var piRoverReady = "waiting";

    function connectionCheck(){
        setInterval(function(){
            fetch('https://192.168.100.31/status', fetchInit)
                .then(function (response) {
                        console.log(response);
                        if (response.ok) {
                            piRoverReady = true;
                            /*return response.text()
                             .then(function (text) {
                             if (text == "ready") {
                             return {status: 2, msg: 'Ready'};
                             console.log(text);
                             }
                             else
                             return {status: 1, msg: 'Waiting'};
                             });
                             */
                        }
                        else{
                            piRoverReady = false;
                        }
                    }
                )
                .catch(function (error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    piRoverReady = false;
                    //return {status: 0, msg: 'Error'};
                });
        }, 10000);

    }


    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        if (piRoverReady == true)
            return {status: 2, msg: 'Ready'};
        else if (piRoverReady == "waiting")
            return {status: 1, msg: "Waiting to load"};
        else
            return {status: 0, msg: 'Error'};
    };

    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.

    ext.piRover = function(command, time, callback){

      var url = "https://192.168.100.31/" + command + "/" + time;
        fetch(url, fetchInit)
            .then(function (response) {
                console.log(response);
            })
            .catch();
        window.setTimeout(function() {
            callback();
        }, wait*time);
    };

    ext.piRoverOff = function(){
        var url = "https://192.168.100.31/" + off;
        fetch(url, fetchInit)
            .then()
            .catch();
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            //['w', 'wait for %n seconds', 'wait_time', '1'],
            ['w', '%n for %n seconds', 'piRover', 'forward', '1'],
            ['w', '%n for %n seconds', 'piRover', 'backward', '1'],
            ['w', '%n for %n seconds', 'piRover','spinright', '1'],
            ['w', '%n for %n seconds', 'piRover','spinleft', '1'],
            ['w', '%n for %n seconds', 'piRover','disc', '1'],
            [' ', 'Stop all piRover functions', 'piRoverOff', 'off']
        ],

        url: "https://chadwallacehart.github.io"
    };

    // Register the extension
    ScratchExtensions.register('piRover Control extension', descriptor, ext);


    //start
    console.log("started");
    connectionCheck();

})({});



//Failed attempt to write in front of the flash screen
/*
$(document).load(function(){
    $("body").append('<div class="modal-content" stype="height:50%;width:50%;z-index:100"><p>Hello modal!</p></div>');
});
    */