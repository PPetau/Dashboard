/*!
    
 =========================================================
 * Paper Dashboard - v1.1.2
 =========================================================
 
 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 */


var navbar_hidden = false;
var notification_count = 0;

$(document).ready(function () {

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    if (window.innerWidth <= 991) {
        $('.tt-sidebar').addClass("hide-left");
        $('.content').addClass("content-padding-left");
        $('.navbar-hide').addClass("hover");
        navbar_hidden = true;
    }

    // Back-To-Top Button erstellen
    // Der Button wird mit JavaScript erzeugt und vor dem Ende des body eingebunden.
    var backtotop = ['<div class="backtotop"><div class="backtotop-morph"></div></div>'].join("");
    $("body").append(backtotop)

    // Der Button wird ausgeblendet
    $(".backtotop").hide();

    // Funktion für das Scroll-Verhalten
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) { // Wenn X Pixel gescrolled wurde
                $('.backtotop').fadeIn();
            } else {
                $('.backtotop').fadeOut();
            }
        });

        $('.backtotop').click(function () { // Klick auf den Button
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });

});

// On Error404 open Error-Page
$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status == 404) {
        $("#content").load("./TTError404.html");
    }
});

// Hide and Show Navbar with Buttonclick
$('.navbar-hide').on("click", function (Event) {
    if (!navbar_hidden) {
        $('.tt-sidebar').addClass("hide-left");
        $('.content').addClass("content-padding-left");
        $('.navbar-hide').addClass("hover");
        navbar_hidden = true;
    } else {
        $('.tt-sidebar').removeClass("hide-left");
        $('.content').removeClass("content-padding-left");
        $('.navbar-hide').removeClass("hover");
        navbar_hidden = false;
    }
});

$('.nav.side-menu').find('li > a').on('click', function (Event) {
    var c = $(this).parent();
    c.is(".active-section") ? ($("ul:first", c).slideUp(500, function () {
        c.removeClass("active-section");
    })) : (c.parent().is(".child_menu") ? $('tt-sidebar').is(".hide-left") && ($('.nav.side-menu').find("li").removeClass("active-section"), $('.nav.side-menu').find("li ul").slideUp(500, function () {
        c.removeClass("active-section");
    })) : ($('.nav.side-menu').find("li").removeClass("active-section"), $('.nav.side-menu').find("li ul").slideUp()), c.addClass("active-section"), $("ul:first", c).slideDown(500))
});

// Load HTML in #CONTEXT
$("li.link").on("click", function (Event) {
    $("#content").load("./" + this.classList[1] + ".html")
    $('li.link').each(function (Event) {
        $(this).removeClass("current-page");
    });
    $(this).addClass("current-page");
});

// Hide Sidebar when Screen <= 991px
window.onresize = function () {
    if (window.innerWidth <= 991) {
        if (!navbar_hidden) {
            $('.tt-sidebar').addClass("hide-left");
            $('.content').addClass("content-padding-left");
            $('.navbar-hide').addClass("hover");
            navbar_hidden = true;
        }
    } else if (navbar_hidden) {
        $('.tt-sidebar').removeClass("hide-left");
        $('.content').removeClass("content-padding-left");
        $('.navbar-hide').removeClass("hover");
        navbar_hidden = false;
    }
}


function TopRightNotification(_type, _icon, _text, _url) {
    notification_count = notification_count + 1;
    $.notify({
        icon: _icon,
        message: _text,
        url: _url
    }, {
        type: _type,
        if (_type = undefined) {
            type: 'warning';
        },
        offset: {
            y: 65,
            x: 10
        },
        timer: 400,
        placement: {
            from: "top",
            align: "right"
        },
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutTop'
        }
    });

    $('#Notifications').append('<li><a class=Notification ' + _icon + ' .' + _url + '> ' + _text + '</a></li>');
}

function BottomRightNotification(_type, _icon, _text, _url) {
    notification_count = notification_count + 1;
    $.notify({
        icon: _icon,
        message: _text,
        url: _url
    }, {
        type: _type,
        if (_type = undefined) {
            type: 'warning';
        },
        offset: {
            y: 25,
            x: 85
        },
        timer: 400,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutTop'
        }
    });

    $('#Notifications').append('<li><a class="Notification ' + _icon + ' .' + _url + '"> ' + _text + '</a></li>');
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
