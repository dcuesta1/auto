const mix = require("laravel-mix");

mix.scripts([
      'resources/js/main.js',
      'resources/js/mobile-nav.js',
      'resources/js/contactform.js'
  ], 'public/js/cuesta-light.js')
  // .babel('public/js/cuesta-light19.es6.js', 'public/js/cuesta-light19.js')
  .scripts([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/dist/jquery-migrate.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/jquery.easing/jquery.easing.min.js',
    'node_modules/wow.js/dist/wow.min.js',
    'node_modules/owl.carousel/dist/owl.carousel.min.js',
  ], 'public/js/vendors.js')
  .scripts([
    'public/js/vendors.js',
    'public/js/cuesta-light.js',
  ], 'public/js/cuesta-light.min.js')
  .sass('resources/sass/theme.scss', 'public/css', {
    outputStyle: mix.inProduction ? 'compressed' : 'expanded'
  })
   // .copyDirectory('resources/lib/font-awesome/fonts', 'public/fonts')
   .copyDirectory('resources/images', 'public/images');

// version
if (mix.inProduction) {
   mix.version();
 }
