/*//code source and instructions on how to work photo upload: http://tonyspiro.com/uploading-resizing-images-fly-node-js-express/
//getting jquery to work in node.js: http://www.hacksparrow.com/jquery-with-node-js.html
var express = require("express"),
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
    var new_location = 'uploads/';

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
            users = {};
        console.log("entered login in");
        $.get("http://localhost:3000/users", function(data) {
            Object.assign(users, data);
        });
        console.log(users);
        users.forEach(function (user){
            if(user.email === $email) {
                console.log("email validtaed");
                if (user.password !== $passwd) {
                    console.log("the password and email do not match");
                }
                else {
                    console.log($email);
                    window.location.href = "userpage.html?useremail="+$email;
                }
            }
        });
        console.log("email does not exist");
    });// end submit

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
        }); //end post /users

		return false;
	});	// end singlebutton

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
                data:JSON.stringify({email: email,
                                      name: name,
                                      password: psswd,
                                      description: $newTxt,
                                      gender: gend,
                                      dob: dob,
                                      phone: phone,
                                      login: login,
                                      id: id
                                  }),
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
     });// end .get (users)


        //=========================================  resume  ==============================================================
    $.get("http://localhost:3000/resumes/", function(resumes) {
        var email,
            id=-1,
            compA,
            compAtitle,
            compAdFrom,
            compAdTill,
            compAdescripL,
            compAdescripR;
        var compB,
            compBtitle,
            compBdFrom,
            compBdTill,
            compBdescripL,
            compBdescripR;
        var School,
            Major,
            eduFrom,
            eduTill,
            eduDescripL,
            eduDescripR;
        var skillA,
            skillAdescrip;
        var skillB,
            skillBdescrip;
        var skillC,
            skillCdescrip;

        email = window.location.search.replace("?", "").substr(10);

        //if new user if will not exe.
        resumes.forEach(function(resume) {
            if(resume.email === email){
                compA = resume.company1;
                compAtitle = resume.title1;
                compAdFrom = resume.datefrom1;
                compAdTill = resume.datetill1;
                compAdescripL = resume.jobdescription1left;
                compAdescripR = resume.jobdescription1right;

                compB = resume.company2;
                compBtitle = resume.title2;
                compBdFrom = resume.datefrom2;
                compBdTill = resume.datetill2;
                compBdescripL = resume.jobdescription2left;
                compBdescripR = resume.jobdescription2right;

                School = resume.school;
                Major = resume.major;
                eduFrom = resume.yearfrom;
                eduTill = resume.yearto;
                eduDescripL = resume.edudescriptionleft;
                eduDescripR = resume.edudescriptionright;

                skillA = resume.skill1title;
                skillAdescrip = resume.skill1description;
                skillB = resume.skill2title;
                skillBdescrip = resume.skill2description;
                skillC = resume.skill3title;
                skillCdescrip = resume.skill3description;
                id = resume.id;
console.log("first get id:", id);

                $("#job1 .jobtitle h3 div").text(compA);
                $("#job1 .jobtitle h4 div").text(compAtitle);
                $("#job1 .datefrom .resumeEdit").text(compAdFrom);
                $("#job1 .datetill .resumeEdit").text(compAdTill);
                $("#job1 #job1left .resumeEdit").text(compAdescripL);
                $("#job1 .column-last .resumeEdit").text(compAdescripR);

                $("#job2 .jobtitle h3 div").text(compB);
                $("#job2 .jobtitle h4 div").text(compBtitle);
                $("#job2 .datefrom .resumeEdit").text(compBdFrom);
                $("#job2 .datetill .resumeEdit").text(compBdTill);
                $("#job2 #job2left .resumeEdit").text(compBdescripL);
                $("#job2 .column-last .resumeEdit").text(compBdescripR);

                $("#edu .jobtitle h3 div").text(School);
                $("#edu .jobtitle h4 div").text(Major);
                $("#edu .datefrom .resumeEdit").text(eduFrom);
                $("#edu .datetill-f .resumeEdit").text(eduTill);
                $("#edu #eduleft .resumeEdit").text(eduDescripL);
                $("#edu .column-last .resumeEdit").text(eduDescripR);

                $("#skill1 h4 div").text(skillA);
                $("#skill1des").text(skillAdescrip);

                $("#skill2 h4 div").text(skillB);
                $("#skill2des").text(skillBdescrip);

                $("#skill3 h4 div").text(skillC);
                $("#skill3des").text(skillCdescrip);
            }
        }); //end resumes.forEach


        var $orgTxt="",
            $NEWcompA = "Connectivity Group LLC",
            $NEWcompAdFrom = "2011",
            $NEWcompAdTill = "Present",
            $NEWcompAdescripL = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida",
            $NEWcompAdescripR = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida",
            $NEWcompAtitle = "Art-Director";
       var  $NEWcompB = "ABC Construction",
            $NEWcompBtitle = "Web Designer",
            $NEWcompBdFrom = "2011",
            $NEWcompBdTill = "Present",
            $NEWcompBdescripL = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida",
            $NEWcompBdescripR = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida";
       var  $NEWSchool = "Lorem Ipsum University",
            $NEWMajor = "Graphic Designer",
            $NEWeduFrom = "2011",
            $NEWeduTill = "Present",
            $NEWeduDescripL = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida",
            $NEWeduDescripR = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin, ac pharetra diam convallis. Integer lobortis justo tempus odio gravida";
       var  $NEWskillA = "Graphic Designer",
            $NEWskillAdescrip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin";
       var  $NEWskillB = "Graphic Designer",
            $NEWskillBdescrip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin";
       var  $NEWskillC = "Graphic Designer",
            $NEWskillCdescrip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla libero a nibh sollicitudin";

//===========================post resume =====================================
//if it is new user.
var dbLength;
if (email !== "" &&id === -1)
{
    var strUrl = "http://localhost:3000/users";
    //var dbLength;
    jQuery.ajax({
        type: 'GET',
        url: strUrl,
        success: function(data) {
            dbLength = data.length;
console.log("inside if statement id == -1: dbLength=", dbLength);
        },
        async: false
    });
    id = dbLength;

    var newResume = {
        "email": email,
        "company1": $NEWcompA,
        "title1": $NEWcompAtitle,
        "datefrom1": $NEWcompAdFrom,
        "datetill1": $NEWcompAdTill,
        "jobdescription1left": $NEWcompAdescripL,
        "jobdescription1right": $NEWcompAdescripR,
        "company2": $NEWcompB,
        "title2": $NEWcompBtitle,
        "datefrom2": $NEWcompBdFrom,
        "datetill2": $NEWcompBdTill,
        "jobdescription2left": $NEWcompBdescripL,
        "jobdescription2right": $NEWcompBdescripR,
        "school": $NEWSchool,
        "major": $NEWMajor,
        "yearfrom": $NEWeduFrom,
        "yearto": $NEWeduTill,
        "edudescriptionleft": $NEWeduDescripL,
        "edudescriptionright": $NEWeduDescripR,
        "skill1title": $NEWskillA,
        "skill1description": $NEWskillAdescrip,
        "skill2title": $NEWskillB,
        "skill2description": $NEWskillBdescrip,
        "skill3title": $NEWskillC,
        "skill3description": $NEWskillCdescrip,
        "id": dbLength
    };

    console.log(email);

    var resumeUrl = "http://localhost:3000/resumes";
    $.ajax({
        type: 'POST',
        url: resumeUrl,
        data: newResume,
        success: function(data, status) {
console.log("post success");
        },
        dataType: 'json',
        async: false
    });
}//end if
//=========================== end post resume =====================================

console.log("outside if id==-1 statement, id=", id);

        $(".editR").on("click", function(){
            $orgTxt=$(".resumeEdit").text();
            $(".resumeEdit").addClass("editable").prop("contenteditable",true);
            $(this).addClass("hide");
            $(".saveR, .cancelR").removeClass("hide");
        });


        $('.saveR').on('click', function(){
console.log("new resume id is", id);
            $NEWcompA =  $("#job1 .jobtitle h3 div").text();
            $NEWcompAtitle = $("#job1 .jobtitle h4 div").text();
            $NEWcompAdFrom = $("#job1 .datefrom .resumeEdit").text();
            $NEWcompAdTill = $("#job1 .datetill .resumeEdit").text();
            $NEWcompAdescripL =$("#job1 #job1left .resumeEdit").text();
            $NEWcompAdescripR = $("#job1 .column-last .resumeEdit").text();

            $NEWcompB = $("#job2 .jobtitle h3 div").text();
            $NEWcompBtitle = $("#job2 .jobtitle h4 div").text();
            $NEWcompBdFrom = $("#job2 .datefrom .resumeEdit").text();
            $NEWcompBdTill = $("#job2 .datetill .resumeEdit").text();
            $NEWcompBdescripL = $("#job2 #job2left .resumeEdit").text();
            $NEWcompBdescripR = $("#job2 .column-last .resumeEdit").text();

            $NEWSchool = $("#edu .jobtitle h3 div").text();
            $NEWMajor = $("#edu .jobtitle h4 div").text();
            $NEWeduFrom = $("#edu .datefrom .resumeEdit").text();
            $NEWeduTill = $("#edu .datetill-f .resumeEdit").text();
            $NEWeduDescripL = $("#edu #eduleft .resumeEdit").text();
            $NEWeduDescripR = $("#edu .column-last .resumeEdit").text();

            $NEWskillA = $("#skill1 h4 div").text();
            $NEWskillAdescrip = $("#skill1des").text();

            $NEWskillB = $("#skill2 h4 div").text();
            $NEWskillBdescrip = $("#skill2des").text();

            $NEWskillC = $("#skill3 h4 div").text();
            $NEWskillCdescrip = $("#skill3des").text();

           $.ajax({
                type:"PUT",
                url:"http://localhost:3000/resumes/"+id.toString(),
                dataType: "json",
                data:JSON.stringify({
                                      email: email,
                                      company1: $NEWcompA,
                                      title1: $NEWcompAtitle,
                                      datefrom1: $NEWcompAdFrom,
                                      datetill1: $NEWcompAdTill,
                                      jobdescription1left: $NEWcompAdescripL,
                                      jobdescription1right: $NEWcompAdescripR,
                                      company2: $NEWcompB,
                                      title2: $NEWcompBtitle,
                                      datefrom2: $NEWcompBdFrom,
                                      datetill2: $NEWcompBdTill,
                                      jobdescription2left: $NEWcompBdescripL,
                                      jobdescription2right: $NEWcompBdescripR,
                                      school: $NEWSchool,
                                      major: $NEWMajor,
                                      yearfrom: $NEWeduFrom,
                                      yearto: $NEWeduTill,
                                      edudescriptionleft: $NEWeduDescripL,
                                      edudescriptionright: $NEWeduDescripR,
                                      skill1title: $NEWskillA,
                                      skill1description: $NEWskillAdescrip,
                                      skill2title: $NEWskillB,
                                      skill2description: $NEWskillBdescrip,
                                      skill3title: $NEWskillC,
                                      skill3description: $NEWskillCdescrip,
                                      id: id
                                   }),
                  contentType: "application/json"
            });
console.log("updated 1st newCompany is:",  $NEWcompA);
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

    });// end .get (resumes)
};
$(document).ready(main);
