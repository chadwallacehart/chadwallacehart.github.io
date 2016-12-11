/**
 * Created by chad on 12/9/16.
 */
(function(ext) {

    var xhr = new XMLHttpRequest();


    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        xhr.open("GET", "https://192.168.100.31/status", false);
        xhr.send();

        if (xhr.status == "200"){
            if (xhr.statusText == "ready")
                return {status: 2, msg: 'Ready'};
            else
                return {status: 1, msg: 'Waiting'};
        }
        else {
            return {status: 0, msg: 'Error'};
        }

        console.log(xhr.status + " " + xhr.statusText);

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
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})({});

//Failed attempt to write in front of the flash screen
/*
$(document).load(function(){
    $("body").append('<div class="modal-content" stype="height:50%;width:50%;z-index:100"><p>Hello modal!</p></div>');
});
    */