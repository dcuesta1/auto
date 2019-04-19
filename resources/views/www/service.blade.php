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

      <div class="row about-container">
        <h3>{{ $section['title'] }}</h3>
        <p>{{ $section['desc'] }}</p>
      </div>
      
      @endforeach
    </div>
  </div>
</section>
@endsection
