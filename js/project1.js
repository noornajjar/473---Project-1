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
				window.location.href = "userpage.html?useremail="+useremail;
        });
        loggedIn = useremail;
		return false;
	});	
    
    $.get("http://localhost:3000/users/", function(users) {
        var $insertName,
			$insertDescription,
            email;
	    //$("main .aboutme").empty();
        email = window.location.search.replace("?", "").substr(10);
        users.forEach(function(users) {
			if(users.email === email){
                $insertName = $(".name");
                $insertName.text(users.name);
                $insertDescription = $("#about .plain-content p");
                $insertDescription.text(users.description);
            }
		});
	});
};
$(document).ready(main);
