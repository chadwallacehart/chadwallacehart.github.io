/**
 * Created by chad on 12/9/16.
 */
(function(ext) {

    var fetchHeaders = new Headers();
    var fetchInit = { method: 'GET',
        headers: fetchHeaders,
        mode: 'cors',
        cache: 'default' };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        fetch('https://192.168.100.31/status', fetchInit)
            .then(function (response) {
                    //console.log(response);
                    if (response.ok) {
                        return {status: 2, msg: 'Ready'};

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
                        return {status: 1, msg: 'Error'};
                    }
                }
            )
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                return {status: 0, msg: 'Error'};
            });
    };

    // Functions for block with type 'w' will get a callback function as the
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        var wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };

    ext.wait_time = function(wait, callback) {
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
           callback();
        }, wait*1000);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
            ['w', 'wait for %n seconds', 'wait_time', '1']
        ],

        url: "https://chadwallacehart.github.io"
    };

    // Register the extension
    ScratchExtensions.register('piRover Control extension', descriptor, ext);
})({});

//Failed attempt to write in front of the flash screen
/*
$(document).load(function(){
    $("body").append('<div class="modal-content" stype="height:50%;width:50%;z-index:100"><p>Hello modal!</p></div>');
});
    */