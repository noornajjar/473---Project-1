





jQuery(document).ready(function() {

    /* --------------------------------------------------------------------------- */
    /*  Easytabs
    /* --------------------------------------------------------------------------- */

    var $content            = $("#content");

    $content.easytabs({
        tabs                : "> div > div > ul > li",
        animate             : true,
        updateHash          : true,
        animationSpeed      :'normal',
    });

    
    /* --------------------------------------------------------------------------- */
    /*    Knob Progressbar Plugin
    /* --------------------------------------------------------------------------- */

	$(function($) {

                $(".knob").knob({
                    change : function (value) {
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                        //console.log(this.$.attr('value'));
                        console.log("release : " + value);
                    },
                    cancel : function () {
                        console.log("cancel : ", this);
                    },
                    draw : function () {

                        // "tron" case
                        if(this.$.data('skin') == 'tron') {

                            var a = this.angle(this.cv)  // Angle
                                , sa = this.startAngle          // Previous start angle
                                , sat = this.startAngle         // Start angle
                                , ea                            // Previous end angle
                                , eat = sat + a                 // End angle
                                , r = 1;

                            this.g.lineWidth = this.lineWidth;

                            this.o.cursor
                                && (sat = eat - 0.3)
                                && (eat = eat + 0.3);

                            if (this.o.displayPrevious) {
                                ea = this.startAngle + this.angle(this.v);
                                this.o.cursor
                                    && (sa = ea - 0.3)
                                    && (ea = ea + 0.3);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                            this.g.stroke();

                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();

                            return false;
                        }
                    }
                });

                // Example of infinite knob, iPod click wheel
                var v, up=0,down=0,i=0
                    ,$idir = $("div.idir")
                    ,$ival = $("div.ival")
                    ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
                    ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
                $("input.infinite").knob(
                                    {
                                    min : 0
                                    , max : 20
                                    , stopper : false
                                    , change : function () {
                                                    if(v > this.cv){
                                                        if(up){
                                                            decr();
                                                            up=0;
                                                        }else{up=1;down=0;}
                                                    } else {
                                                        if(v < this.cv){
                                                            if(down){
                                                                incr();
                                                                down=0;
                                                            }else{down=1;up=0;}
                                                        }
                                                    }
                                                    v = this.cv;
                                                }
                                    });
            });




    /* --------------------------------------------------------------------------- */
    /*    Contact Form
    /* --------------------------------------------------------------------------- */

    var $contactform  = $('#contact-form'),
        $success      = '<strong>Success!</strong> Your message was sent.';

    // Validate form on keyup and submit
    $contactform.validate({
        rules: {
            name: {
                required    : true,
                minlength   : 1
            },
            email: {
                required    : true,
                email       : true
            },
            message: {
                required    : true,
                minlength   : 1
            }
        },
        messages: {
            name: {
                required    : "Please enter your name.",
                minlength   : jQuery.format("Your name needs to be at least {0} characters")
            },
            email: {
                required    : "Please enter your email address.",
                minlength   : "You entered an invalid email address."
            },
            message: {
                required    : "Please enter a message.",
                minlength   : jQuery.format("Enter at least {0} characters")
            }
        },
    });

// Send the email
    $contactform.submit(function(){
        if ($contactform.valid()){
            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: $(this).serialize(),
                success: function(msg) {
                    if (msg == 'SEND') {
                        response = '<div class="alert success">'+ $success +'</div>';
                    }
                    else {
                        response = '<div class="error">'+ msg +'</div>';
                    }
                    $(".error,.success").remove();
                    $contactform.prepend(response);
                }
             });
            return false;
        }
        return false;
    });


    /* --------------------------------------------------------------------------- */
    /*  9. Fancybox
    /* --------------------------------------------------------------------------- */

    $(".folio").fancybox({
        closeBtn        : false,
        padding         : 0,
        openEffect      : 'elastic',
        closeEffect     : 'elastic',
        nextEffect      : 'elastic',
        prevEffect      : 'elastic',
        helpers : {
            overlay : {
                css : {
                    'background' : 'rgba(51, 51, 51, 0.8)'
                }
            },
            title : {
                type : 'over'
            }
        }
    });






    /*----------------------------------------------------*/
    /*  Isotope Portfolio Filter
    /*----------------------------------------------------*/

    (function() {

        // Portfolio settings
        var $container          = $('.project-feed');
        var $filter             = $('.project-feed-filter');


        

        // Filter items when filter link is clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('current');
            $(this).addClass('current');
            $container.isotope({ 
                filter             : selector,
                animationOptions   : {
                animationDuration  : 750,
                easing             : 'linear',
                queue              : false,
                }
            });
            return false;
        });




    })();


    /* --------------------------------------------------------------------------- */
    /*  13. Back to Top
    /* --------------------------------------------------------------------------- */

    $("#back-top").hide();
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    $('#back-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });





    /* --------------------------------------------------------------------------- */
    /*  Google Maps
    /* --------------------------------------------------------------------------- */

    var $latlng             = new google.maps.LatLng(34.021453,-118.785027),
        $myOptions          = {
            zoom            : 16,
            center          : $latlng,
            panControl      : false,
            zoomControl     : true,
            scaleControl    : false,
            mapTypeControl  : false,
            mapTypeId       : google.maps.MapTypeId.ROADMAP
        },
        $tabContact         = ('tab-contact');

    $content.bind('easytabs:after', function(evt,tab,panel) {
        if ( tab.hasClass($tabContact) ) {
            var $map = new google.maps.Map(document.getElementById("map"), $myOptions);
            var marker = new google.maps.Marker({
                position: $latlng,
                map: $map, 
                title: ""
            });
        }
    });



		

});
