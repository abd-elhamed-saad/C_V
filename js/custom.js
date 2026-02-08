/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false

    });
	
    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }
    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }
    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 950,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');


    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        // Desktop: 4 cards per row (8 projects show as 2 rows).
        if (winWidth > 1199) {
            columnNumb = 4;
        } else if (winWidth > 991) {
            columnNumb = 4;
        } else if (winWidth > 768) {
            columnNumb = 3;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        var containerWidth = container.width(),
            columnNumb = splitColumns(),
            postWidth = containerWidth / columnNumb;

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    if ($.fn.imagesLoaded) {
        container.imagesLoaded(function() {
            setColumns();
            container.isotope('reLayout');
        });
    } else {
        setColumns();
        container.isotope('reLayout');
    }


    $(window).bind('resize', function() {
        setProjects();
    });

    $(window).on('load', function() {
        setProjects();
    });

   $(".fancybox").fancybox();

    $('#portfolio_wrapper').on('click', '.portfolio-item .hover-bg', function(e) {
        if ($(e.target).closest('a').length) {
            return;
        }
        $(this).closest('.portfolio-item').find('a.fancybox-main').first().trigger('click');
    });
});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();
