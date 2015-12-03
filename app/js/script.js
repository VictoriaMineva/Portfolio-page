$(document).ready(function(){
    $('.hamburger-icon').click(function(){
        $(this).toggleClass('open');
    });

    $(window).on('resize', function(){
        var win = $(this); 

        if (win.width() >= 820) { 
            $(".hamburger-menu").hide();
            $('.hamburger-icon').removeClass('open');
        }
    });

    function openMenu() {
        $(".hamburger-menu").animate({
            height: 'toggle'
        }, 1000 );
    }

    var loaded = false;
    var oTop = $('#skills-left').offset().top - window.innerHeight;
    var timeline_items = $('.timeline-text:not(.expanded)');
    var sections = $('section');
    var nav = $('nav');
    var nav_height = nav.outerHeight();

    checkPosition();

    $(window).scroll(function(){
        checkPosition();
    });

    function checkPosition(){ 
        var pTop = $(window).scrollTop();

        if( pTop > oTop ){
            if(!loaded) {
                loaded = true;
                loadChart();
            }
        } 

        timeline_items.each(function () {
            var elementTop = $(this).offset().top - window.innerHeight;

            if( pTop > elementTop ) {
                $(this).addClass("expanded");
            }
        });

        sections.each(function() {
            var top = $(this).offset().top - nav_height;
            var bottom = top + $(this).outerHeight();

            if (pTop >= top && pTop <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id') + '"]').addClass('active');
            }
        }); 
    }  
});