/*//code source and instructions on how to work photo upload: http://tonyspiro.com/uploading-resizing-images-fly-node-js-express/
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
    var new_location = 'img/';

    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
});

app.listen(8080);*/

var main = function () {
	"use strict";
    
    $("#login-nav").submit(function(){
        var $email = $("#exampleInputEmail2").val(),
            $passwd = $("#exampleInputPassword2").val(),
            url = "http://localhost:3000/users?email=".concat($email, "&password=", $passwd);

        console.log("entered login in");
        console.log(url);
        
        $.get(url, function(data) {
            console.log("entered get");
            if(data !== undefined || data.length !== 0){
                console.log($email);
                window.location.href = "userpage.html?useremail="+$email;
            }
            else {
                console.log("the password and email do not match");
            }
        });             
    });
    $("#singlebutton").on("click", function(){
		var username,
			userbirthdate,
			useremail,
			userpassword,
			userphone,
			usergender,
			userwebsite,
			userdescription;
		username = $("#txtName").val();
		userbirthdate = $("#txtBirthDate").val();
		useremail = $("#txtEmail").val();
		userpassword = $("#txtPassword").val();
		userphone = $("#txtPhone").val().replace(/\s+/g, '');
        userphone = ["(", userphone.slice(0,3), ")", userphone.slice(3,6), "-", userphone.slice(6)].join('');
        console.log(userphone);
		usergender = $("#txtGender").val();
		userwebsite = $("#txtWebsite").val();
		userdescription = $("#txtDescription").val();
        
		$.post("http://localhost:3000/users", 
        {
            email: useremail,
            password : userpassword,
            name : username,
            description : userdescription,
            gender : usergender,
            dob : userbirthdate,
            phone : userphone,
            login: true
        }, function() {
				window.location.href = "userpage.html?useremail="+useremail;
        });
        
		return false;
	});	
    
    $.get("http://localhost:3000/users/", function(users) {
        var $insertName,
			$insertDescription,
            email,
            name,
            psswd,
            desc,
            gend,
            dob,
            phone,
            login,
            id;

	    //$("main .aboutme").empty();
        email = window.location.search.replace("?", "").substr(10);
        //var user = users.email;
        users.forEach(function(user) {
			if(user.email === email){
                name = user.name;
                psswd = user.password;
                desc = user.description;
                gend = user.gender;
                dob = user.dob;
                phone = user.phone;
                login = user.login;
                id = user.id;
                $(".name").text(name);
                $(".description").text(desc);
                $('#email').text(email);
                $("#userphone").append(phone);
                /*if(gend === "male"){
                    $("#profile-pic").attr("src","img/male.jpg");
                }
                else {
                    $("#profile-pic").attr("src","img/female.jpg");
                }*/
            }
		});
        
        // This code is used from: http://stackoverflow.com/questions/36082781/change-a-paragraph-of-text-to-a-textarea
        var $orgTxt="",$newTxt="";

        $(".edit").on("click", function(){
            $orgTxt=$(".description").text();
            $(".description").addClass("editable").prop("contenteditable",true);
            $(this).addClass("hide");
            $(".save, .cancel").removeClass("hide");


        });

        $('.save').on('click', function(){
            $newTxt=$('.description').text();
            //add code to PUT to json
            $.ajax({ 
                type:"PUT", 
                url:"http://localhost:3000/users/"+id.toString(),
                dataType: "json",
                data:JSON.stringify({email: email, name: name, password: psswd, description: $newTxt, gender: gend, dob: dob, phone: phone, login: login}),
                contentType: "application/json"            
            });
            $('.description').removeClass('editable').prop('contenteditable',false);
            $('.save, .cancel').addClass('hide');
            $('.edit').removeClass('hide');
        
        });

        $('.cancel').on('click', function(){

            $('.description').text($orgTxt);
            $('.description').removeClass('editable').prop('contenteditable',false);
            $('.save, .cancel').addClass('hide');
            $('.edit').removeClass('hide');
        });
        
        var $orgTxt="",$newTxt="";

        $(".editR").on("click", function(){
            $orgTxt=$(".resumeEdit").text();
            $(".resumeEdit").addClass("editable").prop("contenteditable",true);
            $(this).addClass("hide");
            $(".saveR, .cancelR").removeClass("hide");


        });

        $('.saveR').on('click', function(){
            $newTxt=$('.resumeEdit').text();
            //add code to PUT to json
            /*$.ajax({ 
                type:"PUT", 
                url:"http://localhost:3000/users/"+id.toString(),
                dataType: "json",
                data:JSON.stringify({name: name.toString(), starred: "false"}),
                contentType: "application/json"            
            });*/
            $('.resumeEdit').removeClass('editable').prop('contenteditable',false);
            $('.saveR, .cancelR').addClass('hide');
            $('.editR').removeClass('hide');
        
        });

        $('.cancelR').on('click', function(){

            $('.resumeEdit').text($orgTxt);
            $('.resumeEdit').removeClass('editable').prop('contenteditable',false);
            $('.saveR, .cancelR').addClass('hide');
            $('.editR').removeClass('hide');
        });
	});
    
    

};
$(document).ready(main);
