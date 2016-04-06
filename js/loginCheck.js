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
						console.log("in for each");
						var dest =  window.location.href + "/userpage.html?useremail=" + email;
						//dest.replace("index.html", "");
						//dest +=	"/userpage.html?useremail=" + email;
						console.log("About to redirect to " + dest);
						console.log(window);
						window.location.assign(dest);
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