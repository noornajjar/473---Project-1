var loggedIn = "";

var main = function () {
	"use strict";

    $("#singlebutton").on("click", function(event){
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
		userphone = $("#txtPhone").val();
		usergender = $("#txtGender").val();
		userwebsite = $("#txtWebsite").val();
		userdescription = $("#txtDescription").val();
		$.post("http://localhost:3000/users", 
		   {
			email : useremail,
			password : userpassword,
			name : username,
			description : userdescription,
			gender : usergender,
			dob : userbirthdate,
            login: true
		    }, function() {
				window.location.href = "userpage.html";
        });
        loggedIn = useremail;
		return false;
	});	
    
    $.get("http://localhost:3000/users/", function(users) {
        var $weldiv,
            $span,
            $i,
            $insertName,
			$insertDescription;
	//$("main .aboutme").empty();
        users.forEach(function(users) {
			console.log("in user loop");
            console.log(users.login);
			if(users.login){
                console.log(users.name);
                $insertName = $(".name");
                $insertName.text(users.name);
                $insertDescription = $("#about .plain-content p");
                $insertDescription.text(users.description);
            }
		});
	});
	console.log("this works!");
};
$(document).ready(main);
