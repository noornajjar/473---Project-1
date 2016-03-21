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
				dob : userbirthdate 
			    }, function() {
					window.location.reload();
				});
			return false;
	});	
};
$(document).ready(main);
