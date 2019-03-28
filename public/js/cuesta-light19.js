jQuery(document).ready(function (jQuery) {
  "use strict"; //Contact

  jQuery('form.contactForm').submit(function () {
    var f = jQuery(this).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    f.children('input').each(function () {
      // run all inputs
      var i = jQuery(this); // current input

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
            if (!i.is(':checked')) {
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

        i.next('.validation').html(ierror ? i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input' : '').show('blind');
      }
    });
    f.children('textarea').each(function () {
      // run all inputs
      var i = jQuery(this); // current input

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

        i.next('.validation').html(ierror ? i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input' : '').show('blind');
      }
    });
    if (ferror) return false;else var str = jQuery(this).serialize();
    var action = jQuery(this).attr('action');
    jQuery.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function success(msg) {
        // alert(msg);
        if (msg == 'OK') {
          jQuery("#sendmessage").addClass("show");
          jQuery("#errormessage").removeClass("show");
          jQuery('.contactForm').find("input, textarea").val("");
        } else {
          jQuery("#sendmessage").removeClass("show");
          jQuery("#errormessage").addClass("show");
          jQuery('#errormessage').html(msg);
        }
      }
    });
    return false;
  });
});

(function (jQuery) {
  "use strict"; // Preloader (if the #preloader div exists)

  jQuery(window).on('load', function () {
    if (jQuery('#preloader').length) {
      jQuery('#preloader').delay(100).fadeOut('slow', function () {
        jQuery(this).remove();
      });
    }
  }); // Back to top button

  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.back-to-top').fadeIn('slow');
    } else {
      jQuery('.back-to-top').fadeOut('slow');
    }
  });
  jQuery('.back-to-top').click(function () {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  }); // Initiate the wowjs animation library

  new WOW().init(); // Header scroll class

  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery('#header').addClass('header-scrolled');
    } else {
      jQuery('#header').removeClass('header-scrolled');
    }
  });

  if (jQuery(window).scrollTop() > 100) {
    jQuery('#header').addClass('header-scrolled');
  } // Smooth scroll for the navigation and links with .scrollto classes


  jQuery('.main-nav a, .mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);

      if (target.length) {
        var top_space = 0;

        if (jQuery('#header').length) {
          top_space = jQuery('#header').outerHeight();

          if (!jQuery('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        jQuery('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if (jQuery(this).parents('.main-nav, .mobile-nav').length) {
          jQuery('.main-nav .active, .mobile-nav .active').removeClass('active');
          jQuery(this).closest('li').addClass('active');
        }

        if (jQuery('body').hasClass('mobile-nav-active')) {
          jQuery('body').removeClass('mobile-nav-active');
          jQuery('.mobile-nav-toggle i').toggleClass('ion-ios-menu');
          jQuery('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  }); // Navigation active state on scroll

  var nav_sections = jQuery('section');
  var main_nav = jQuery('.main-nav, .mobile-nav');
  var main_nav_height = jQuery('#header').outerHeight();
  jQuery(window).on('scroll', function () {
    var cur_pos = jQuery(this).scrollTop();
    nav_sections.each(function () {
      var top = jQuery(this).offset().top - main_nav_height,
          bottom = top + jQuery(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#' + jQuery(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  }); // Testimonials carousel (uses the Owl Carousel library)

  jQuery(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });
  jQuery(".intro-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    items: 1,
    slideSpeed: 3500
  });
})(jQuery);
