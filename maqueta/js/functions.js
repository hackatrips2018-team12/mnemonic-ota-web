/* ==============================================
	Preload
=============================================== */
$(window).load(function() { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow':'visible'});
	$(window).scroll();
})

/* ==============================================
	Sticky nav
=============================================== */
$(window).scroll(function(){
    'use strict';
    if ($(this).scrollTop() > 1){  
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }
});

/* ==============================================
	Menu
=============================================== */
$('a.open_close').on("click",function() {
	$('.main-menu').toggleClass('show');
	$('.layer').toggleClass('layer-is-visible');
});
$('a.show-submenu').on("click",function() {
	$(this).next().toggleClass("show_normal");
});
$('a.show-submenu-mega').on("click",function() {
	$(this).next().toggleClass("show_mega");
});
if($(window).width() <= 480){
	$('a.open_close').on("click",function() {
	$('.cmn-toggle-switch').removeClass('active')
});
}

$(window).bind('resize load',function(){
if( $(this).width() < 991 )
{
$('.collapse#collapseFilters').removeClass('in');
$('.collapse#collapseFilters').addClass('out');
}
else
{
$('.collapse#collapseFilters').removeClass('out');
$('.collapse#collapseFilters').addClass('in');
}   
});

/* ==============================================
	Overaly mask form + incrementer
=============================================== */
$('.expose').on("click",function(e){
	"use strict";
    $(this).css('z-index','2');
    $('#overlay').fadeIn(300);
});
$('#overlay').click(function(e){
	"use strict";
    $('#overlay').fadeOut(300, function(){
        $('.expose').css('z-index','1');
    });
});

/* ==============================================
	Common
=============================================== */
<!-- Tooltip -->	
$('.tooltip-1').tooltip({html:true});
	
 //accordion	
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('icon-plus icon-minus');
}
$('.panel-group').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

<!-- Button show/hide map -->	
 $(".btn_map").on("click", function() {
  var el = $(this);
  el.text() == el.data("text-swap") 
    ? el.text(el.data("text-original")) 
    : el.text(el.data("text-swap"));
});


/* ==============================================
	Animation on scroll
=============================================== */
new WOW().init();

/* ==============================================
	Video modal dialog + Parallax + Scroll to top + Incrementer
=============================================== */
$(function () {
'use strict';
$('.video').magnificPopup({type:'iframe'});	/* video modal*/
$('.parallax-window').parallax({}); /* Parallax modal*/
// Image popups

$('.magnific-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        gallery:{enabled:true}
    });
}); 

$('.dropdown-menu').on("click",function(e) {e.stopPropagation();});  /* top drodown prevent close*/

$('ul#top_tools li .dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(50);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(50);
});

/* Hamburger icon*/
var toggles = document.querySelectorAll(".cmn-toggle-switch"); 

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
    });
  };
  
  /* Scroll to top*/
  $(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on("click",function() {
		$('body,html').animate({scrollTop:0},500);
	});	
	
	/* Input incrementer*/
    $(".numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>');
    $(".button_inc").on("click", function () {

        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });
});

<!-- Cat nav onclick active -->	
$('ul#cat_nav li a').on('click', function(){
    $('ul#cat_nav li a.active').removeClass('active');
    $(this).addClass('active');
});

<!-- Map filter onclick active -->	
$('#map_filter ul li a').on('click', function(){
    $('#map_filter ul li a.active').removeClass('active');
    $(this).addClass('active');
});

<!-- Input range slider -->	
    $(function () {
		'use strict';
        $("#range").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: 0,
            max: 150,
            from: 30,
            to: 100,
            type: 'double',
            step: 1,
            prefix: "$",
            grid: true
        });

    });
