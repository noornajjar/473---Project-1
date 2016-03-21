var main = function () {
	"use strict";

		$("#singlebutton").on("click", function(event){
			var username,
				userbirthdate,
				useremail,
				userpassword,
				userphone,
				usergender,
				userdescription;
			username = $("#txtName").val();
			userbirthdate = $("#txtBirthDate").val();
		var new_name = $("#txtName").val();
		var new_birthday = $("#txtBirthDate").val();
		console.log(new_name);
		console.log(new_birthday);
		alert(new_name);
	});	
};
$(document).ready(main);



		// if ($(".mdl-textfield input").val() != "") {
		// 	$new_actor = $(".mdl-textfield input").val();
		// 	$(".mdl-textfield input").val("");
		// 		$.post("http://localhost:3000/actors", {
		// 			"name" : $new_actor,
		// 			"starred" : false
		// 		}, function() {
		// 			window.location.reload();
		// 		});
		// }


		// if($(".description input").val() !== ""){
		// $desc = $<p>.text($(".description input").val());
		//}
