!function (e) {
  "use strict";

  e(window).on("load", function () {
    e("#preloader").length && e("#preloader").delay(100).fadeOut("slow", function () {
      e(this).remove();
    });
  }), e(window).scroll(function () {
    e(this).scrollTop() > 100 ? e(".back-to-top").fadeIn("slow") : e(".back-to-top").fadeOut("slow");
  }), e(".back-to-top").click(function () {
    return e("html, body").animate({
      scrollTop: 0
    }, 1500, "easeInOutExpo"), !1;
  }), new WOW().init(), e(window).scroll(function () {
    e(this).scrollTop() > 100 ? e("#header").addClass("header-scrolled") : e("#header").removeClass("header-scrolled");
  }), e(window).scrollTop() > 100 && e("#header").addClass("header-scrolled"), e(".main-nav a, .mobile-nav a, .scrollto").on("click", function () {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var a = e(this.hash);

      if (a.length) {
        var t = 0;
        return e("#header").length && (t = e("#header").outerHeight(), e("#header").hasClass("header-scrolled") || (t -= 20)), e("html, body").animate({
          scrollTop: a.offset().top - t
        }, 1500, "easeInOutExpo"), e(this).parents(".main-nav, .mobile-nav").length && (e(".main-nav .active, .mobile-nav .active").removeClass("active"), e(this).closest("li").addClass("active")), e("body").hasClass("mobile-nav-active") && (e("body").removeClass("mobile-nav-active"), e(".mobile-nav-toggle i").toggleClass("fa-times fa-bars"), e(".mobile-nav-overly").fadeOut()), !1;
      }
    }
  });
  var a = e("section"),
      t = e(".main-nav, .mobile-nav"),
      o = e("#header").outerHeight();
  e(window).on("scroll", function () {
    var n = e(this).scrollTop();
    a.each(function () {
      var a = e(this).offset().top - o,
          s = a + e(this).outerHeight();
      n >= a && n <= s && (t.find("li").removeClass("active"), t.find('a[href="#' + e(this).attr("id") + '"]').parent("li").addClass("active"));
    });
  }), e(".testimonials-carousel").owlCarousel({
    autoplay: !0,
    dots: !0,
    loop: !0,
    items: 1
  }), e(".services-item").on("click", function (e) {
    window.location.href = e.currentTarget.dataset.anchor;
  });
  var n = document.location.origin;
  e("#mobile_call_button").on("click", function (a) {
    e.ajax({
      url: n + "/track",
      headers: {
        "X-CSRF-TOKEN": e('meta[name="csrf-token"]').attr("content")
      },
      method: "POST",
      data: {
        item: "mobile_call_button"
      },
      success: function success(e) {
        console.log("succes: " + e);
      }
    });
  });
}(jQuery), function (e) {
  "use strict";

  if (e(".main-nav").length) {
    var a = e(".main-nav").clone().prop({
      "class": "mobile-nav d-lg-none"
    });
    e("body").append(a), e("body").prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>'), e("body").append('<div class="mobile-nav-overly"></div>'), e(document).on("click", ".mobile-nav-toggle", function (a) {
      e("body").toggleClass("mobile-nav-active"), e(".mobile-nav-toggle i").toggleClass("fa-times fa-bars"), e(".mobile-nav-overly").toggle();
    }), e(document).on("click", ".mobile-nav .drop-down > a", function (a) {
      a.preventDefault(), e(this).next().slideToggle(300), e(this).parent().toggleClass("active");
    }), e(document).click(function (a) {
      var t = e(".mobile-nav, .mobile-nav-toggle");
      t.is(a.target) || 0 !== t.has(a.target).length || e("body").hasClass("mobile-nav-active") && (e("body").removeClass("mobile-nav-active"), e(".mobile-nav-toggle i").toggleClass("fa-times fa-bars"), e(".mobile-nav-overly").fadeOut());
    });
  } else e(".mobile-nav, .mobile-nav-toggle").length && e(".mobile-nav, .mobile-nav-toggle").hide();
}(jQuery), jQuery(document).ready(function (e) {
  "use strict";

  e("form.contactForm").submit(function () {
    var a = e(this).find(".form-group"),
        t = !1,
        o = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    if (a.children("input").each(function () {
      var a = e(this),
          n = a.attr("data-rule");

      if (void 0 !== n) {
        var s = !1,
            l = n.indexOf(":", 0);

        if (l >= 0) {
          var i = n.substr(l + 1, n.length);
          n = n.substr(0, l);
        } else n = n.substr(l + 1, n.length);

        switch (n) {
          case "required":
            "" === a.val() && (t = s = !0);
            break;

          case "minlen":
            a.val().length < parseInt(i) && (t = s = !0);
            break;

          case "email":
            o.test(a.val()) || (t = s = !0);
            break;

          case "checked":
            a.is(":checked") || (t = s = !0);
            break;

          case "regexp":
            (i = new RegExp(i)).test(a.val()) || (t = s = !0);
        }

        a.next(".validation").html(s ? void 0 !== a.attr("data-msg") ? a.attr("data-msg") : "wrong Input" : "").show("blind");
      }
    }), a.children("textarea").each(function () {
      var a = e(this),
          o = a.attr("data-rule");

      if (void 0 !== o) {
        var n = !1,
            s = o.indexOf(":", 0);

        if (s >= 0) {
          var l = o.substr(s + 1, o.length);
          o = o.substr(0, s);
        } else o = o.substr(s + 1, o.length);

        switch (o) {
          case "required":
            "" === a.val() && (t = n = !0);
            break;

          case "minlen":
            a.val().length < parseInt(l) && (t = n = !0);
        }

        a.next(".validation").html(n ? null != a.attr("data-msg") ? a.attr("data-msg") : "wrong Input" : "").show("blind");
      }
    }), t) return !1;
    var n = e(this).serialize(),
        s = e(this).attr("action");
    return e.ajax({
      type: "POST",
      url: s,
      data: n,
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
      },
      success: function success(a) {
        "OK" == a ? (e("#sendmessage").addClass("show"), e("#errormessage").removeClass("show"), setTimeout(function () {
          $("#sendmessage").removeClass("show");
        }, 4e3), e(".contactForm").find("input, textarea").val("")) : (e("#sendmessage").removeClass("show"), e("#errormessage").addClass("show"), e("#errormessage").html(a));
      }
    }), !1;
  });
});
