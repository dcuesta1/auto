@extends('www.layouts.site')

@section('title', $title)

@section('intro', '')

@section('content')
<section id="services-page">

  <div class="container">
    <div class="row">
      <div class="col-12">

        <div class="section-header">
          <h2>{{ $title }}</h2>
        </div>

        @foreach ($sections as $section)
          <div class="about-container">
            <header class="section-header">
              <h3>{{ $section['title'] }}</h3>
            </header>
            {{ $section['desc'] }}
          </div>
        @endforeach
      </div>
    </div>
    <div id="services" class="row">
      @foreach ($services as $service)
          <div data-anchor="{{ url()->current() }}/{{ $service['file'] }}" class="services-item clickable col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-duration="1.4s">
            <div class="box">
              <div class="icon">
              <div class="shop-icon shop-icon-{{$icon}}"></div>
              </div>
            <h4 class="title"><a href="{{ url()->current() }}/{{ $service['file'] }}">{{ $service['title'] }}</a></h4>
            <p class="description">{{ $service['desc'] }}..</p>
            </div>
          </div>
      @endforeach
    </div>
  </div>
</section>
@endsection
