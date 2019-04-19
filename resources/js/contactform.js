jQuery(document).ready(function(jQuery) {
    "use strict";
  
    //Contact
    jQuery('form.contactForm').submit(function() {
      var f = jQuery(this).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
  
      f.children('input').each(function() { // run all inputs
  
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
          i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
        }
      });
      if (ferror) return false;
      else var str = jQuery(this).serialize();
      var action = jQuery(this).attr('action');
      jQuery.ajax({
        type: "POST",
        url: action,
        data: str,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(msg) {
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
  