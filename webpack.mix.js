const mix = require('laravel-mix');

mix.scripts([
      'resources/js/contactform.js',
      'resources/js/main.js'
   ], 'public/js/cuesta-light19.js')
   .scripts([
      'resources/lib/jquery/jquery.min.js',
      'resources/lib/jquery/jquery-migrate.min.js',
      'resources/lib/bootstrap/js/bootstrap.bundle.min.js',
      'resources/lib/easing/easing.min.js',
      'resources/lib/mobile-nav/mobile-nav.js',
      'resources/lib/wow/wow.min.js',
      'resources/lib/owlcarousel/owl.carousel.min.js',
   ], 'public/js/vendors.js')
   .styles([
      'resources/lib/bootstrap/css/bootstrap.min.css',
      'resources/lib/font-awesome/css/font-awesome.min.css',
      'resources/lib/animate/animate.min.css',
      'resources/lib/ionicons/css/ionicons.min.css',
      'resources/lib/owlcarousel/assets/owl.carousel.min.css',
      'resources/css/style.css'
   ], 'public/css/cuesta-light19.min.css')
   .copyDirectory('resources/lib/font-awesome/fonts', 'public/fonts')
   .copyDirectory('resources/lib/ionicons/fonts', 'public/fonts')
   .copyDirectory('resources/img', 'public/img'); 
