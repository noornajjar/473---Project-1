var main = function() {
    "use strict";

    //create new person
    /*var $desc;
    $(".mdl-textfield button").on("click", function(event) {
        var $new_actor;
        if ($(".mdl-textfield input").val() != "") {
            $new_actor = $(".mdl-textfield input").val();
            $(".mdl-textfield input").val("");
            $.post("http://localhost:3000/actors", {
                "name": $new_actor,
                "starred": false
            }, function() {
                window.location.reload();
            });
        }
    });

    //create actors list
    $.get("http://localhost:3000/actors/", function(actors) {
        var $div,
            $span,
            $i,
            $a;

        $("main .demo-list-action").empty();
        actors.forEach(function(actor) {
            $div = $("<div>").addClass("mdl-list__item");
            $span = $("<span>").addClass("mdl-list__item-primary-content");
            $i = $("<i>").addClass("material-icons mdl-list__item-avatar").text("person");
            $span.append($i);
            $span.append("<span>").text(actor.name);
            $a = $("<a>").addClass("mdl-list__item-secondary-action").attr("href", "#");
            if (actor.starred) {
                $a.append("<i>").addClass("material-icons").text("star");
            } else {
                $a.append("<i>").addClass("material-icons").text("star_border");
            }

            // change state of star
            $a.on("click", function() {
                var actorId = actor.id;
                var url = "http://localhost:3000/actors/" + actorId;
                var starValue = actor.starred;
                starValue += "";
                if (starValue === "false") {
                    starValue = true;
                } else {
                    starValue = false;
                }
                $.ajax({
                        "url": url,
                        "type": "PUT",
                        "data": {
                            "starred": starValue,
                            "name": actor.name
                        },
                    })
                    .done(function() {
                        window.location.reload();
                    })
                    .fail(function(err) {});
            });

            $div.append($span);
            $div.append($a);
            $("main .demo-list-action").append($div);
        });

    });*/
	
	//populate description
	//create actors list
    $.get("http://localhost:3000/users/", function(users) {
        var $weldiv,
            $span,
            $i,
            $a,
			$p;
	//$("main .aboutme").empty();
        users.forEach(function(users) {
			console.log("in user loop");
			$weldiv = $("<div>").addClass("plain-content");
			$("main").append($weldiv);
			$p = $("<p>");
			$p.text(users.description);
			$weldiv.append($p);

		});
	});
	console.log("this works!");

};

$(document).ready(main);