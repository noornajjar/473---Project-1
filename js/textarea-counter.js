
    "use strict";
    /* ========================================= click button event ========================================*/
       function editTextArea() {       
        var strUrl = "http://localhost:3000/users";
        
        var userEmail, 
            userpassword,
            userName,
            userGender,
            userDoB,
            userId,
            userDescription;             
        var $newBio = document.getElementById("bio").value;
        
jQuery.ajax({
            type: 'GET',
            url: strUrl,
            success: function(users) {
            users.forEach(function(user) {                            
                userEmail = user.email,
                userpassword = user.password;
                userName = user.name;
                
                userGender = user.gender;
                userDoB = user.dob;
                userId = user.id;
                userDescription = user.description;

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
                //window.location.href = "userpage.html";
                console.log("sasa, this works!");  
        });
    } // end button click

