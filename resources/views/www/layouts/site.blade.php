<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <title>@yield('title') Complete Auto Repair Services for Titusville, Mims area</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="keywords">
  <meta content="" name="description">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">


  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Favicons -->
  <link href="{{ URL::asset('img/favicon.ico') }}" rel="icon">
  <link href="{{ URL::asset('img/logo180^2.png') }}" rel="apple-touch-icon">

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">

  <!-- Stylesheet File -->
  <link href="{{ URL::asset('css/theme.css') }}" rel="stylesheet">
</head>

<body>
  <header id="header" class="fixed-top">
    <div class="container">

      <div class="logo float-left">
        {{-- <h1 class="text-light"><a href="#header"><span>Beatty</span></a></h1> --}}
        <a href="#intro" class="scrollto"><img src="{{ URL::asset('img/logo.png') }}" alt="Beatty's" class="img-fluid"></a>
      </div>

      <nav class="main-nav float-right d-none d-lg-block">
        <ul>
        <li {{ Request::route()->getName() == 'home' ? 'class="active"' : '' }}><a href="{{ URL::to('/#intro') }}">Home</a></li>
          <li><a href="{{ URL::to('/#about') }}">About Beatty's</a></li>
          <li><a href="{{ URL::to('/#why-us') }}">Why choose us?</a></li>
          <li class="drop-down {{ Request::route()->getName() != 'home' ? 'active' : '' }}"><a href="/services">Services</a>
            <ul>
              <li><a href="/services/axle_cv_joint_driveshaft_repair">Axle, CV Joint, Driveshaft Repair</a></li>
              <li><a href="/services/belts_and_hoses">Belts &amp; Hoses</a></li>
              <li><a href="/services/brake_repair">Brake Repair</a></li>
              <li><a href="/services/climate_control_systems">Climate Control Systems</a></li>
              <li><a href="/services/cooling_system_repair">Cooling System Repair</a></li>
              <li><a href="/services/diesel_engine_repair">Diesel Engine Repair</a></li>
              <li><a href="/services/differential_repair">Differential Repair</a></li>
              <li><a href="/services/electrical_and_electronic_systems">Electrical &amp; Electronic Systems</a></li>
              <li><a href="/services/engine_diagnostics_and_performance">Engine Diagnostics &amp; Performance</a></li>
              <li><a href="/services/exhaust_system_repair">Exhaust System Repair</a></li>
              <li><a href="/services/four_wheel_drive_system">Four Wheel Drive System</a></li>
              <li><a href="/services/preventive_maintenance">Preventive Maintenance</a></li>
              <li><a href="/services/starting_charging_and_batteries">Starting, Charging &amp; Batteries</a></li>
              <li><a href="/services/steering_and_suspension_system">Steering & Suspension System</a></li>
              <li><a href="/services/transmission_repair">Transmission Repair</a></li>
            </ul>
          </li> 
          <li><a href="{{ URL::to('/#contact') }}">Contact Us</a></li>
        </ul>
      </nav><!-- .main-nav -->
      
    </div>
  </header><!-- #header -->

  {{-- <!--==========================
    Intro Section
  ============================--> --}}
@yield('intro')

  <main id="main">
    @yield('content')
  </main>

  {{-- <!--==========================
    Footer
  ============================--> --}}
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-4 col-md-6 footer-info">
            <h3>NewBiz</h3>
            <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat consequat mauris nunc congue.</p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Menu</h4>
            <ul>
              <li><a href="{{ URL::to('/') }}">Home</a></li>
              <li><a href="{{ URL::to('/#about') }}">About us</a></li>
              <li><a href="{{ URL::to('/#services') }}">Services</a></li>
            </ul>
          </div>

          <div class="col-lg-6 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              631b Childre Ave <br>
              Titusville, FL 32796<br>
              <strong>Phone:</strong> <a href="+13212891668">(321) 289-1668</a><br>
              <strong>Email:</strong> <a href="mailto:gary@beattysautorepair.com">gary@beattysautorepair.com</a><br>
            </p>

            <div class="social-links">
              <a target="_blank" href="https://facebook.com/Autumotive" class="facebook"><i class="fa fa-facebook"></i></a>
              <a target="_blank" href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
              <a target="_blank" href="https://www.yelp.com/biz/beattys-auto-repair-titusville" class="yelp"><i class="fa fa-yelp"></i></a>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Beatty's Auto Repair</strong>. All Rights Reserved
      </div>
    </div>
  </footer><!-- #footer -->

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
  <div id="preloader"></div>

  <!-- JavaScript -->
  <script src="{{ URL::asset('js/vendors.js') }}"></script>
  <script src="{{ URL::asset('js/cuesta-light19.js') }}"></script>

</body>
</html>
