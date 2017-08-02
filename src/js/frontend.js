"use strict";




var front = {
    search: $('.search'),
    nav: $('.nav'),
    hamburger: $('.hamburger'),
    header: $('.header'),
    countSection: $('.app-count'),

    init: function () {
        this.events();
    },

    parallax: function (element,x,y){
        $(element).css({
            "transform": "translate("+ x+ "px, "+ y +"px)"
        });
    },

    counters: function () {
        $('.app-count__number').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');

            $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                {
                    duration: 1000,
                    easing:'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
        });
    },

    events: function () {
        $(document).on('click', '.search-b__link', function (e) {
            front.search.slideDown();
        });
        $(document).on('click', '.search__close', function (e) {
            front.search.slideUp();
        });

        $(document).on('click', '.hamburger', function (e) {
            if( front.hamburger.hasClass('hamburger-open')){
                front.hamburger.removeClass('hamburger-open');
                front.nav.fadeOut();
            } else{
                front.search.slideUp();
                front.hamburger.addClass('hamburger-open');
                front.nav.fadeIn();
            }

        });

        $('.app-top').mousemove(function(e){
            var x1 = -(e.pageX + this.offsetLeft)/150;
            var y1 = -(e.pageY + this.offsetTop)/150;

            var x2 = -(e.pageX + this.offsetLeft)/100;
            var y2 = -(e.pageY + this.offsetTop)/100;

            var x3 = -(e.pageX + this.offsetLeft)/75;
            var y3 = -(e.pageY + this.offsetTop)/75;

            var x4 = -(e.pageX + this.offsetLeft)/175;
            var y4 = -(e.pageY + this.offsetTop)/175;


            front.parallax('.parallax__item-1',x1,y1);
            front.parallax('.parallax__item-2',x2*2,y2*2);
            front.parallax('.parallax__item-3',x3*3,y3*3);
            front.parallax('.parallax__item-4',x4*4,y4*4);

        });

        $(window).on('scroll',function(){
            var scroll = $(this).scrollTop();
            if(scroll > front.countSection.offset().top - $(window).height() / 1.5 ){
                front.counters();
            }
        });


    }
};





var flkty = new Flickity( '.carousel', {
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    wrapAround: true,
    prevNextButtons: false
});

function updateStatus(){
    var slideCurrent = $('.current-slide');
    var slideNumber = flkty.selectedIndex + 1;
    if (slideNumber > 4) {
        return false;
    }
    slideCurrent.text(slideNumber);
}

$(document).on('click', '.carousel-nav__prev', function () {
    flkty.flickity('previous');
});

$(document).on('click', '.carousel-nav__next', function () {
    flkty.flickity('next');
});

flkty.on('select',function(){
    updateStatus();
});




jQuery(function () {
    front.init();
});