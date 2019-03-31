@extends('www.layouts.site')

@section('title', $title)

@section('intro', '')

@section('content')
<section id="services-page">

  <div class="section-header">
    <h2>{{ $title }}</h2>
  </div>

  @foreach ($sections as $section)
  <div class="container clearfix">
    
    <header class="section-header">
    <h3>{{ $section['title'] }}</h3>
    </header>

    <div class="row about-container">
      {{ $section['desc'] }}
    </div>
  </div>
  @endforeach

    @foreach ($services as $service)
    <div class="row">
      <div class="">
    </div>
  <a href="{{ url()->current() }}/{{ $service['file'] }}">{{ $service['title'] }}</a><br>
    @endforeach
</section>
@endsection