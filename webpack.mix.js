const mix = require('laravel-mix');

mix.scripts([
      'resources/js/contactform.js',
      'resources/lib/mobile-nav/mobile-nav.js',
      'resources/js/main.js'
   ], 'public/js/cuesta-light19.es6.js')
   .babel('public/js/cuesta-light19.es6.js', 'public/js/cuesta-light19.js')
   .scripts([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/dist/jquery-migrate.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/jquery.easing/jquery.easing.min.js',
      'node_modules/wow.js/dist/wow.min.js',
      'node_modules/owl.carousel/dist/owl.carousel.min.js',
   ], 'public/js/vendors.js')
   .sass('resources/sass/theme.scss', 'public/css')
   .copyDirectory('resources/lib/font-awesome/fonts', 'public/fonts')
   .copyDirectory('resources/lib/ionicons/fonts', 'public/fonts')
   .copyDirectory('resources/img', 'public/img'); 

// versionning
if (mix.config.inProduction) {
   mix.version();
 }
