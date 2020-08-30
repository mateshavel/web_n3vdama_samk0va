/* Document ready */
$(function () {

    //slick slider
    $('.hotels-slick').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        speed: 300,
        cssEase: 'ease',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    /*vertical: true,*/
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //filter hotels by country
    $(".country-filter").on('click', function (ev) {
        ev.preventDefault();
        $('.country-filter-wrapper').find('.country-filter').removeClass('active');
        $(this).addClass('active');
        //remove filtering
        $('.hotels-slick').slick('slickUnfilter');
        //get attribute from country link
        var attr = $(this).data('country-value');
        $('.hotels-slick').slick('slickFilter', $("div[data-country='" + attr + "']"));
    });


    $('.navbar').find('.nav-link').on('click', function (event) {
        event.preventDefault();
        var hash = this.hash;
        var viewportWidth = $(window).width();
        if(viewportWidth > 991 ) {
            scrollToAnchor(hash, 85);
        } else {
            $('.navbar-collapse').collapse('hide');
            scrollToAnchor(hash, 48);
        }
    });

    // Check if page is in scrolled state after loading/reloaded
    var scrollTop = $(this).scrollTop();
    if(scrollTop > 0) {
        $('.navbar').addClass('nav-wrapper-bg');
    }

    // Add background for navbar when start scrolling
    $(document).on( 'scroll', function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop > 0) {
            $('.navbar').addClass('nav-wrapper-bg');
        } else {
            var mobileMenu_visible = $("#navbarNav").is(":visible");
            if(!mobileMenu_visible || $( window ).width() >= 1024) {
                $('.navbar').removeClass('nav-wrapper-bg');
            }
        }
    });

    // Add background for mobile menu when shown
    $('#navbarNav').on('show.bs.collapse', function () {
        $('.navbar').addClass('nav-wrapper-bg');
    // Add background for mobile menu when shown
    }).on('hidden.bs.collapse', function () {
        var scrollTop = $(document).scrollTop();
        if(scrollTop === 0) {
            $('.navbar').removeClass('nav-wrapper-bg');
        }
    });

    /*Hide or show image when customer use mobile device*/
    ShowOrHideVideo();

    $('section#video img.video-opener-poster ').on('click', function () {
        ShowVideo();
    });

/*
    // Eva videos
    $('.video-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1
    });

    var nowPlaying = "none";

    $('.video-carousel iframe').hover(function(){
        nowPlaying = $(this).attr('src');
        $(this).attr('src',nowPlaying+'&autoplay=1');
    }, function(){
        $(this).attr('src',nowPlaying);
    });

    $.get('data/prehled.xml', function(xml) {
        var jsonText = JSON.stringify(xmlToJson(xml));
        console.log($.parseJSON(jsonText).PrehledKapacit.PrehledExportKapacita[0]);
    });
*/
});

function ShowOrHideVideo() {
    if ($(window).width() < 768) {
        $('section#video img.video-opener-poster').css('visibility', 'visible');
    } else {
        ShowVideo();
    }
}

function ShowVideo() {
    $('section#video img.video-opener-poster').css('visibility', 'hidden');
    $('video').get(0).play();
}


function scrollToAnchor(hash, offset) {
    $('html, body').animate({
        scrollTop: $(hash).offset().top - offset
    }, 500, function(){
        // Do something after animation is finished
    });
}