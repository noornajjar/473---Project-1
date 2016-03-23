
    "use strict";
    function getParameterByName( name ){
    var regexS = "[\\?&]"+name+"=([^&#]*)", 
  regex = new RegExp( regexS ),
  results = regex.exec( window.location.search );
  if( results == null ){
    return "";
  } else{
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}



    /* ========================================= click button event ========================================*/
       function editTextArea() {   
       
        //var strUrl = "http://localhost:3000/users";
         var strUrl = "http://localhost:3000/users";
        var userEmail, 
            userpassword,
            userName,
            userDescription, 
            userGender,
            userDoB,
            userId;
        var userLogin = false;           
        var $newBio = document.getElementById("bio").value;

        userEmail = getParameterByName('useremail');
         console.log(userEmail);
        
jQuery.ajax({
            type: 'GET',
            url: strUrl,
            success: function(users) {                 
                users.forEach(function(user) {

                    if(userEmail === user.email) {
                        userEmail = user.email,
                        userpassword = user.password;
                        userName = user.name;
                        userDescription = user.description;
                        userGender = user.gender;
                        userDoB = user.dob;
                        userLogin = user.login;                       
                        userId = user.id;  
                        console.log("test: "+userId);                                             
                    }                                          
               });
            },
            async: false
        });
    

        var newUser = {
            "email": userEmail,
            "password": userpassword,
            "name": userName,            
            "gender": userGender,
            "dob": userDoB,
            "id" : userId,
            "description" : $newBio
           
        };
        console.log(userLogin);
        console.log(userEmail);
        console.log(userId); 
        console.log($newBio);  
        /*
        $.ajax({
            type: 'POST',
            url: strUrl,
            user: newUser,
            success: function(user, status) {
               console.log("sasa, this works!");  
            },
            dataType: 'json',
            async: false
        });
        */

        //$.put("http://localhost:3000/users/"+userId, 
        $.post("http://localhost:3000/users", 
           {
            email : userEmail,
            password : userpassword,
            name : userName,
            description : $newBio,
            gender : userGender,
            dob : userDoB,
            login: true,
            id : userId
            }, function() {          
                console.log("post!");  
        });
    } // end button click

