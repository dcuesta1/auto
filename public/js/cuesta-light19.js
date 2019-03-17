jQuery(document).ready(function($) {
    "use strict";
  
    //Contact
    $('form.contactForm').submit(function() {
      var f = $(this).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
  
      f.children('input').each(function() { // run all inputs
  
        var i = $(this); // current input
        var rule = i.attr('data-rule');
  
        if (rule !== undefined) {
          var ierror = false; // error flag for current input
          var pos = rule.indexOf(':', 0);
          if (pos >= 0) {
            var exp = rule.substr(pos + 1, rule.length);
            rule = rule.substr(0, pos);
          } else {
            rule = rule.substr(pos + 1, rule.length);
          }
  
          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true;
              }
              break;
  
            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true;
              }
              break;
  
            case 'email':
              if (!emailExp.test(i.val())) {
                ferror = ierror = true;
              }
              break;
  
            case 'checked':
              if (! i.is(':checked')) {
                ferror = ierror = true;
              }
              break;
  
            case 'regexp':
              exp = new RegExp(exp);
              if (!exp.test(i.val())) {
                ferror = ierror = true;
              }
              break;
          }
          i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
        }
      });
      f.children('textarea').each(function() { // run all inputs
  
        var i = $(this); // current input
        var rule = i.attr('data-rule');
  
        if (rule !== undefined) {
          var ierror = false; // error flag for current input
          var pos = rule.indexOf(':', 0);
          if (pos >= 0) {
            var exp = rule.substr(pos + 1, rule.length);
            rule = rule.substr(0, pos);
          } else {
            rule = rule.substr(pos + 1, rule.length);
          }
  
          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true;
              }
              break;
  
            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true;
              }
              break;
          }
          i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
        }
      });
      if (ferror) return false;
      else var str = $(this).serialize();
      var action = $(this).attr('action');
      if( ! action ) {
        action = 'contactform/contactform.php';
      }
      $.ajax({
        type: "POST",
        url: action,
        data: str,
        success: function(msg) {
          // alert(msg);
          if (msg == 'OK') {
            $("#sendmessage").addClass("show");
            $("#errormessage").removeClass("show");
            $('.contactForm').find("input, textarea").val("");
          } else {
            $("#sendmessage").removeClass("show");
            $("#errormessage").addClass("show");
            $('#errormessage').html(msg);
          }
  
        }
      });
      return false;
    });
  
  });
  
(function ($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });
    $('#portfolio-flters li').on( 'click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
  
      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

