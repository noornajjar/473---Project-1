var main = function () {
	"use strict";

    $(".glyphicon.glyphicon-search").on("click", function(){
        
        window.location.href = "search.html";
        
        $.get("http://localhost:3000/users/", function(users) {
            
            var $htmlInsert;
            
            users.forEach(function(user) {
			
                $htmlInsert = $("<article class=\"search-result row\">" +
                                "<div class=\"col-xs-12 col-sm-12 col-md-3\">" + 
                                    "<a href=\"#\" title=\"Lorem ipsum\" class=\"thumbnail\"><img src=" + user.src + " alt=\"Lorem ipsum\" /></a>" +
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
            });
        });
    
    });

};
$(document).ready(main);