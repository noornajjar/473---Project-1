$("#btnSearch").on("click", function () {
    var searchtext = $("txtSearchStr").val(),
        url = "http://localhost:3000/users/",
        founduser = false,
        userdescription = '',
        $content;

    console.log("User clicked search");
    searchtext = JSON.stringify(searchtext);

    $.ajax({
        url: url,
        datatype: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        },
        success: function (users) {
            $content = $("<ul>");
            console.log("loaded users database");
            users.foreach(function (user) {
                userdescription = JSON.stringify(user.description);
                if (userdescription.includes(searchtext)) {
                    $content.append($("<li>").text(JSON.stringify(user.email)));
                }
            }); // end of users.foreach

            $content.append($("</ul>"));
            // add $content in the page.
            if (!founduser) {
                console.log("No users matching selected text");
            };
        }    // end of success
    }); // end of ajax
});
