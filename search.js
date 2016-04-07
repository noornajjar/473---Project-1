// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/* global _:false */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */


var main = function () {
	"use strict";
    
    $.get("http://localhost:3000/users/", function(users) {
        
        var $htmlInsert,
            $numOfResult = 0,
            randomUsers = _.shuffle(users);
            
        randomUsers.forEach(function(user) {
            
            $htmlInsert = $("<article class=\"search-result row\">" +
                            "<div class=\"col-xs-12 col-sm-12 col-md-3\">" + 
                                "<a href=\"userpage.html?useremail=" + user.email + "\" title=\"Lorem ipsum\" class=\"thumbnail\"><img src=" + user.src + " alt=\"Lorem ipsum\" /></a>" +
                            "</div>" + 
                            "<div class=\"col-xs-12 col-sm-12 col-md-2\">" +
                                "<ul class=\"meta-search\">" +
                                    "<li><i class=\"glyphicon glyphicon-user\"></i> <span>" + user.name + "</span></li>" +
                                    "<li><i class=\"glyphicon glyphicon-tags\"></i> <span>" + user.title + "</span></li>" +
                                "</ul>" +
                            "</div>" +
                            "<span class=\"clearfix borda\"></span>" +
                        "</article>");
            
            $(".col-xs-12.col-sm-6.col-md-12").append($htmlInsert); 

            $numOfResult += 1;
        });
        
        $("#resultNum").text($numOfResult);
    });
    

};
$(document).ready(main);