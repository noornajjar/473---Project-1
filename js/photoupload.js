//code source and instructions on how to work photo upload: http://tonyspiro.com/uploading-resizing-images-fly-node-js-express/
//getting jquery to work in node.js: http://www.hacksparrow.com/jquery-with-node-js.html
var express = require("express"),
    $ = require('jquery'),
    app = express(),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    $    = require('jquery');

// Use quickthumb
app.use(qt.static(__dirname + '/'));

app.post('/userpage.html', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    // Temporary location of our uploaded file 
    var temp_path = this.openedFiles[0].path;
    // The file name of the uploaded file 
    var file_name = "profile.png";
    // Location where we want to copy the uploaded file 
    var new_location = '/img/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

app.listen(3000);