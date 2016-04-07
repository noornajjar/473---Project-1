// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */


"use script";

$("#login-in").on("click", function(){
        var email = $("#exampleInputEmail2").val(),
            passwd = $("#exampleInputPassword2").val(),
            url = "http://localhost:3000/users/",
            loginvalid = false;
           
        console.log("entered login in-v");
        console.log(url + email + passwd);
		
		
	$.ajax({
      url: url,
	  type: 'GET',
      dataType: 'json',
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	 },
      success: function(users) {
         console.log("YAY");
		 users.forEach(function(user){
			 console.log("in for" + user.email);
			 console.log("type of user.email is " + typeof user.email);
			 console.log("type of email is " + typeof email);
			 console.log(user.email === email);
			 console.log(user.password === passwd);
			 console.log("<<" + user.email + ">> == <<" + email + ">>");

			 if(JSON.stringify(user.email) === JSON.stringify(email)){
					if (JSON.stringify(user.password) === JSON.stringify(passwd)) {
						loginvalid = true;
						var dest =  window.location.origin + "/userpage.html?useremail=" + email;
						console.log("in for each");
						//change login param in DB
						var putUrl = "http://localhost:3000/users/"+user.id.toString();
						$.ajax({
						type:"PUT",
						url:"http://localhost:3000/users/"+user.id.toString(),
						dataType: "json",
						data:JSON.stringify({
							email: user.email,
                            name: user.name,
                            password: user.password,
                            description: user.description,
                            gender: user.gender,
                            dob: user.dob,
                            phone: user.phone,
                            login: true,
                            id: user.id
                        }),
						contentType: "application/json",
						success: function(){
						console.log("in put function");
						window.location.assign(dest);
						return;
						}
						});
				/*		$.ajax(putUrl,
						{
						login: true
						}, function() {
							console.log("in post function");
						window.location.assign(dest);
						});*/
						//var dest =  window.location.origin + "/userpage.html?useremail=" + email;
						console.log("About to redirect to " + dest);
						console.log(window);
						//window.location.assign(dest);
						//break;
						return;
					}
			}
			
		 })
		 console.log(loginvalid);
		 if (loginvalid) {
			console.log("in window redirect");		
			return false;
			
    	} else {
    		console.log("the password and email do not match");
    		//alert("Invalid email/password combination!")
			return;
    	}
      }
	  
   }); //end of ajax
  

});