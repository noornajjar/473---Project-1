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

                $(".name").text(users.name);
                $(".description").text(users.description);
                $('#email').text(email);
            }
		});
        
        // This code is used from: http://stackoverflow.com/questions/36082781/change-a-paragraph-of-text-to-a-textarea
        var $orgTxt="",$newTxt="";

        $('.edit').on('click', function(){
            $orgTxt=$('.description').text();
            $('.description').addClass('editable').prop('contenteditable',true);
            $(this).addClass('hide');
            $('.save, .cancel').removeClass('hide');


        });

        $('.save').on('click', function(){
            $newTxt=$('.description').text();
            //add code to PUT to json
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
	});
    
    

};
$(document).ready(main);
