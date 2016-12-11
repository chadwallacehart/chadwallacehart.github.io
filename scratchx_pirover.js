/**
 * Created by chad on 12/9/16.
 */
(function(ext) {

    var fetchHeaders = new Headers();
    var fetchInit = { method: 'GET',
        headers: fetchHeaders,
        mode: 'cors',
        cache: 'default' };
    var piRoverReady = false;

    function connectionCheck(){
        setInterval(function(){
            fetch('https://192.168.100.31/status', fetchInit)
                .then(function (response) {
                        //console.log(response);
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

//        return {status: 2, msg: 'Ready'};

        if (piRoverReady == true)
            return {status: 2, msg: 'Ready'};
        else
            return {status: 0, msg: 'Error'};
    };

    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.
/*
    ext.wait_time = function(wait, callback) {
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
           callback();
        }, wait*1000);
    };


    ext.forward = function(time, callback) {
        var url = "http://192.168.100.31/" + "forward/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
        window.setTimeout(function() {
            callback();
        }, wait*time);
    };

    ext.backward = function(time, callback) {
        var url = "http://192.168.100.31/" + "backward/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
        window.setTimeout(function() {
            callback();
        }, wait*time);
    };

    ext.spinright = function(time, callback) {
        var url = "http://192.168.100.31/" + "spinright/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
    };

    ext.spinleft = function(time, callback) {
        var url = "http://192.168.100.31/" + "spinleft/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
    };

    ext.disc = function(time, callback) {
        var url = "http://192.168.100.31/" + "disc/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
    };
*/

    ext.piRover = function(command, time, callback){
      var url = "http://192.168.100.31/" + command + "/" + time;
        fetch(url, fetchInit)
            .then()
            .catch();
        window.setTimeout(function() {
            callback();
        }, wait*time);
    };

    ext.piRoverOff = function(){
        var url = "http://192.168.100.31/" + off;
        fetch(url, fetchInit)
            .then()
            .catch();
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for %n seconds', 'wait_time', '1'],
            ['w', 'Forward for %n seconds', 'piRover', 'forward', '1'],
            ['w', 'Forward for %n seconds', 'piRover', 'backward', '1'],
            ['w', 'Turn right for %n seconds', 'piRover','spinright', '1'],
            ['w', 'Turn left for %n seconds', 'piRover','spinleft', '1'],
            ['w', 'Disc launcher for %n seconds', 'piRover','disc', '1'],
            [' '], 'Stop all Rover functions', 'piRoverOff', 'off'],

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