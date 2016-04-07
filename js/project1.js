// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

var main = function () {
	"use strict";
    
    //clicked on search button
    $(".glyphicon.glyphicon-search").on("click", function(){
        
        window.location.href = "search.html";
    
    });
    
   //submit new user form data
    $("#singlebutton").on("click", function(){

        event.preventDefault();
		var username,
			userbirthdate,
			useremail,
			userpassword,
			userphone,
			usergender,
			userwebsite,
			userdescription,
            photosrc,
            fileExt = $("input[type=file]").val().split(".").pop(),
            filename;
		username = $("#txtName").val();
		userbirthdate = $("#txtBirthDate").val();
		useremail = $("#txtEmail").val();
		userpassword = $("#txtPassword").val();
		userphone = $("#txtPhone").val().replace(/\s+/g, "");
        userphone = ["(", userphone.slice(0,3), ")", userphone.slice(3,6), "-", userphone.slice(6)].join("");
		usergender = $("#txtGender").val();
		userwebsite = $("#txtWebsite").val();
		userdescription = $("#txtDescription").val();

        if(fileExt !== "") {
            filename = useremail+"."+fileExt;
            photosrc = "img/"+filename;
            var formData = new FormData();
            formData.append("image", $("input[type=file]")[0].files[0]);

            $.ajax({
                url: "http://localhost:8000/upload?filename="+filename,  //Server script to process data
                type: "POST",
                // Form data
                data: formData,
                //Options to tell jQuery not to process data or worry about content-type.
                contentType: false,
                processData: false
            });
        }
        else {
            photosrc = "";
        }
        
		$.post("http://localhost:3000/users",
        {
            email: useremail,
            password : userpassword,
            name : username,
            description : userdescription,
            gender : usergender,
            dob : userbirthdate,
            phone : userphone,
            login: true,
            src: photosrc
        }, function() {
				window.location.href = "userpage.html?useremail="+useremail;
        }); //end post /users

		return false;
	});	// end singlebutton

    $.get("http://localhost:3000/users/", function(users) {
        var email,
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
                $("#email").text(email);
                $("#userphone").append(phone);
                
                if(user.src === "") {
                    if(gend === "M"){
                        $("#img").css("backgroundImage", "url('img/male.jpg')");
                    }
                    else {
                        $("#img").css("backgroundImage", "url('img/female.jpg')");
                    }
                }
                else {
                    $("#img").css("backgroundImage", "url('"+user.src+"')");
                }
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

        $(".save").on("click", function(){
            $newTxt=$(".description").text();
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
            $(".description").removeClass("editable").prop("contenteditable",false);
            $(".save, .cancel").addClass("hide");
            $(".edit").removeClass("hide");

        });

        $(".cancel").on("click", function(){

            $(".description").text($orgTxt);
            $(".description").removeClass("editable").prop("contenteditable",false);
            $(".save, .cancel").addClass("hide");
            $(".edit").removeClass("hide");
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
        type: "GET",
        url: strUrl,
        success: function(data) {
            dbLength = data.length;

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

    var resumeUrl = "http://localhost:3000/resumes";
    $.ajax({
        type: "POST",
        url: resumeUrl,
        data: newResume,
        success: function() {},
        dataType: "json",
        async: false
    });
}//end if
//=========================== end post resume =====================================



        $(".editR").on("click", function(){
            $orgTxt=$(".resumeEdit").text();
            $(".resumeEdit").addClass("editable").prop("contenteditable",true);
            $(this).addClass("hide");
            $(".saveR, .cancelR").removeClass("hide");
        });


        $(".saveR").on("click", function(){

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
            $(".resumeEdit").removeClass("editable").prop("contenteditable",false);
            $(".saveR, .cancelR").addClass("hide");
            $(".editR").removeClass("hide");
        });


        $(".cancelR").on("click", function(){
            $(".resumeEdit").text($orgTxt);
            $(".resumeEdit").removeClass("editable").prop("contenteditable",false);
            $(".saveR, .cancelR").addClass("hide");
            $(".editR").removeClass("hide");
        });

    });// end .get (resumes)
};
$(document).ready(main);
