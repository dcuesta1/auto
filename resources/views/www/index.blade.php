@extends('www.layouts.site')

@section('title', '')

@section('intro')
<section id="intro" class="clearfix owl-carousel intro-carousel">
  <div class="intro-item" style="background: url('./img/slide3.jpg')">
    {{-- <div class="intro-img">
      <img src="img/intro-im.svg" alt="" class="img-fluid">
    </div> --}}
    <div class="intro-info">
      <h2>We provide<br><span>Problems</span><br>for your business!</h2>
      <div>
        <a href="#contact" class="btn-get-started scrollto">Contact us</a>
      </div>
    </div>
  </div>
  {{-- <div class="intro-item" style="background: url('./img/intro-bg.png')"></div> --}}
</section><!-- #intro -->
@endsection

@section('content')
    {{-- <!--==========================
      About Us Section
    ============================--> --}}
    <section id="about">
        <div class="container">
  
          <header class="section-header">
            <h3>About Us</h3>
            <p style="width: 100%; color:#4680ff; font-weight: bold; text-transform: uppercase">Beatty's Auto Repair is dedicated to providing quality service at affordable prices.</p>
          </header>
  
          <div class="row about-container">
  
            <div class="col-lg-6 content order-lg-1 order-2">
              {{-- <p>Our mechanic and car repair services include major and minor repairs, performance tuning, collision repair, and routine maintenance. We are committed to an atmosphere of honesty, integrity and competence; exceptional customer service that displays pride in our work and our team. Your car is fully insured from when we pick it up to when it is dropped off.</p> --}}
              <p>With over 40 years of experience, we can handle any mechanical repair. Our mechanics are provided with continual training and have the tools and equipment necessary to service and repair today's vehicles. We have access to all vehicles factory maintenance schedules and service specifications. We are equipped to work on all makes and models, and provide accurate auto repair estimates.</p>
              <div class="icon-box wow fadeInUp">
                <div class="icon"><i class="fa fa-shopping-bag"></i></div>
                <h4 class="title"><a href="">Eiusmod Tempor</a></h4>
                <p class="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
              </div>
  
              <div class="icon-box wow fadeInUp" data-wow-delay="0.2s">
                <div class="icon"><i class="fa fa-photo"></i></div>
                <h4 class="title"><a href="">Magni Dolores</a></h4>
                <p class="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
              </div>
  
            </div>
  
            <div class="col-lg-6 background order-lg-2 order-1 wow fadeInUp">
              <img src="img/mechanic-1.jpg" class="img-fluid" alt="">
            </div>
          </div>
  
          {{-- <div class="row about-extra">
            <div class="col-lg-6 wow fadeInUp">
              <img src="img/about-extra-1.svg" class="img-f" alt="">
            </div>
            <div class="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
              <h4>About the owner</h4>
              <p>I am an ASE certified 40 year experienced technician.  I diagnose problems before changing any parts to confirm the problem.  Here are some of the work that I'm an expert on: Computer Diagnostics, Engine Work, Drivability, AC Leak Detection, any and all engine work, will repair almost any aspect of the car including electrical, mechanical, windows, etc.</p>
            </div>
          </div> --}}

          <div class="row about-extra">
            <div class="col-lg-4 wow fadeInUp order-2 order-lg-2 gradient" id="testimonials">
              <div class="section-header">Our Customer<br> Reviews</div>
                <div class="owl-carousel testimonials-carousel wow fadeInUp">
      
                    <div class="testimonial-item">
                      <h3>Timothy Sharp</h3>
                      <p>
                          Gary is the best mechanic. His work is excellent. His rates are very fair. We have been taking our car to Gary for years. I highly recommend anyone in need of car repairs to take your car to Gary.
                        </p>
                    </div>
          
                    <div class="testimonial-item">
                      <h3>Nicole Fraine</h3>
                      <p>
                          Amazing mechanic! Fixed my heater pump for 20$ the day after Christmas, I appreciate it so much!!! Great great great mechanic. He has earned a customer for life!
                        </p>
                    </div>
          
                    <div class="testimonial-item">
                      <h3>Jim pack</h3>
                      <h4>Local Guide</h4>
                      <p>
                          The very best repair in town very fair and honest!
                        </p>
                    </div>
          
                    <div class="testimonial-item">
                      <h3>Candace</h3>
                      <p>
                          Best mechanic ever!!! He seems to know about any car, in a second. He can diagnose in minutes and is right on, he is super nice and very reasonable, and gets things done. I am blessed to have him as a mechanic!!!
                        </p>
                    </div>
      
                  </div>
            </div>
  
            <div class="col-lg-8 wow fadeInUp pt-4 pt-lg-0 order-1 order-lg-1">
              <h4>Quality Service</h4>
              <p>
                  At Beatty's Auto Repair, we understand that being without your vehicle can become quite a hassle. That is why we do our best to finish your car repairs and get your vehicle returned to you in a timely fashion. Our estimates are accurate, and repairs are appropriately priced so that you are not left spending an arm and a leg.
              </p>
              <p>
                  Whether it is a brake job, tune-up or a major repair, we can get the job done and get it done the right way the first time. When you need quality car repairs in the Titusville, Mims, Space Coast area, you can rely on us.
              </p>
            </div>
          </div>
        </div>
      </section><!-- #about -->
  
      {{-- <!--==========================
        Services Section
      ============================--> --}}
      <section id="services" class="section-bg">
        <div class="container">
  
          <header class="section-header">
            <h3>Services</h3>
            <p>Laudem latine persequeris id sed, ex fabulas delectus quo. No vel partiendo abhorreant vituperatoribus.</p>
          </header>
  
          <div class="row">
  
            <div class="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-analytics-outline" style="color: #ff689b;"></i></div>
                <h4 class="title"><a href="">Lorem Ipsum</a></h4>
                <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 wow bounceInUp" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-bookmarks-outline" style="color: #e9bf06;"></i></div>
                <h4 class="title"><a href="">Dolor Sitema</a></h4>
                <p class="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
              </div>
            </div>
  
            <div class="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-paper-outline" style="color: #3fcdc7;"></i></div>
                <h4 class="title"><a href="">Sed ut perspiciatis</a></h4>
                <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-speedometer-outline" style="color:#41cf2e;"></i></div>
                <h4 class="title"><a href="">Magni Dolores</a></h4>
                <p class="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
              </div>
            </div>
  
            <div class="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-world-outline" style="color: #d6ff22;"></i></div>
                <h4 class="title"><a href="">Nemo Enim</a></h4>
                <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
              <div class="box">
                <div class="icon"><i class="ion-ios-clock-outline" style="color: #4680ff;"></i></div>
                <h4 class="title"><a href="">Eiusmod Tempor</a></h4>
                <p class="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
              </div>
            </div>
  
          </div>
  
        </div>
      </section><!-- #services -->
  
      {{-- <!--==========================
        Why Us Section
      ============================--> --}}
      <section id="why-us" class="wow fadeIn">
        <div class="container">
          <header class="section-header">
            <h3>Why choose us?</h3>
            <p><b>We go the extra mile, so that you may drive that extra mile!</b></p>
          </header>
  
          <div class="row row-eq-height justify-content-center">
  
            <div class="col-lg-4 mb-4">
              <div class="card wow bounceInUp">
                <i class="fa fa-line-chart"></i>
                <div class="card-body">
                  <h5 class="card-title">EFFICIENCY</h5>
                  <p class="card-text">Whether you’re bringing a vehicle to our shop for auto repair or general maintenance, you can expect quick and efficient service. We respect that each of our clients’ time is valuable!</p>
                </div>
              </div>
            </div>
  
            <div class="col-lg-4 mb-4">
              <div class="card wow bounceInUp">
                <i class="fa fa-exclamation-circle"></i>
                <div class="card-body">
                  <h5 class="card-title">NO SURPRISES</h5>
                  <p class="card-text">At Beatty's Auto Repair, we’re upfront and honest. You’ll pay for only the auto repair services you’ve agreed to – and the price you’ll see on your auto repair invoice will be the price in the estimate.</p>
                </div>
              </div>
            </div>
  
            <div class="col-lg-4 mb-4">
              <div class="card wow bounceInUp">
                  <i class="fa fa-object-group"></i>
                <div class="card-body">
                  <h5 class="card-title">Eum ut aspernatur</h5>
                  <p class="card-text">Autem quod nesciunt eos ea aut amet laboriosam ab. Eos quis porro in non nemo ex. </p>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
  
      {{-- <!--==========================
        Partners Section
      ============================--> --}}
      <section id="clients">
  
        <div class="container">
  
          <div class="section-header">
            <h3>Our Trusted Partners</h3>
            
          </div>
  
          <div class="row no-gutters clients-wrap clearfix wow fadeInUp">
  
            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src="{{ URL::asset('img/partners/bennet.jpg') }}" class="img-fluid" alt="Bennet">
              </div>
            </div>
            
            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src="{{ URL::asset('img/partners/autozone.png') }}" class="img-fluid" alt="Autozone">
              </div>
            </div>
          
            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src="{{ URL::asset('img/partners/advance.jpg') }}" class="img-fluid" alt="Advance">
              </div>
            </div>
            
            <div class="col-lg-3 col-md-4 col-xs-6">
              <div class="client-logo">
                <img src="{{ URL::asset('img/partners/napa.svg') }}" class="img-fluid" alt="Bennet">
              </div>
            </div>
  
          </div>
  
        </div>
  
      </section>
  
      {{-- <!--==========================
        Contact Section
      ============================--> --}}
      <section id="contact" class="section-bg">
        <div class="container-fluid">
  
          <div class="section-header">
            <h3>Contact Us</h3>
          </div>
  
          <div class="row wow fadeInUp">
  
            <div class="col-lg-6">
              <div class="map mb-4 mb-lg-0">
                <iframe src="https://maps.google.com/maps?q=beattys%20auto%20repair&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" style="border:0; width: 100%; height: 312px;" allowfullscreen></iframe>
              </div>
            </div>
  
            <div class="col-lg-6">
              <div class="row">
                <div class="col-md-6 info">
                  <i class="ion-ios-email-outline"></i>
                  <p><a href="mailto:gary@beattysautorepair.com">gary@beattysautorepair.com</a></p>
                </div>
                <div class="col-md-6 info">
                  <i class="ion-ios-telephone-outline"></i>
                  <p><a href="tel:+13212891668">(321) 289-1668</a></p>
                </div>
              </div>
  
              <div class="form">
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage"></div>
                <form action="/contact" method="post" role="form" class="contactForm">
                  @csrf
                  <div class="form-row">
                    <div class="form-group col-lg-6">
                      <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                      <div class="validation"></div>
                    </div>
                    <div class="form-group col-lg-6">
                      <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                      <div class="validation"></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                    <div class="validation"></div>
                  </div>
                  <div class="text-center"><button type="submit" title="Send Message">Send Message</button></div>
                </form>
              </div>
            </div>
  
          </div>
  
        </div>
      </section><!-- #contact -->
@endsection