/**
 * Created by chad on 12/9/16.
 */
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
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
            [' ', 'wait for %n seconds', 'wait_time', '1']
        ],

        url: "https://chadwallacehart.github.io"
    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})({});