// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */


//code source and instructions on how to work photo upload: http://tonyspiro.com/uploading-resizing-images-fly-node-js-express/

"use strict";
var express = require("express"),
    app = express(),
    formidable = require("formidable"),
    util = require("util"),
    fs   = require("fs-extra"),
    qt   = require("quickthumb");


// Use quickthumb
app.use(qt.static(__dirname + "/"));

app.post("/upload*", function (req, res){

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {"content-type": "text/plain"});
    res.write("received upload:\n\n");
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on("end", function() {
    // Temporary location of our uploaded file 
    var temp_path = this.openedFiles[0].path;
    // The file name of the uploaded file 
    var file_name = req.param("filename");
    // Location where we want to copy the uploaded file 
    var new_location = "./img/";

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
      }
    });
  });
});

app.listen(8000);