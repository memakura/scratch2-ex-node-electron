"use strict";

var express = require('express');
var exapp = express();

function startServer () {
    var server = exapp.listen(12345, function(){
        console.log("Server start... listening port " + server.address().port);
    });
}

var volume = 0;

exapp.get('/poll', (req, res) => {
    res.send("volume " + volume);
});

exapp.get('/playBeep', (req, res) => {
    console.log("play beep!");
    process.stderr.write("\x07"); // to prevent new line (instead of console.log)
    res.send("OK");
});

exapp.get('/setVolume/:volume', (req, res) => {
    var tmp_volume = req.params.volume;
    if(tmp_volume >= 0 && tmp_volume <= 10){
        volume = tmp_volume;
        console.log("set volume= " + volume);
    }else{
        console.log("out of range: " + tmp_volume);
    }
    res.send("OK");
});

