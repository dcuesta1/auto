@extends('www.layouts.site')

@section('title', $title)

@section('intro', '')

@section('content')
<section id="services-page">
  <div class="container clearfix">
    <div class="row">
      <header class="section-header">
        <h2>{{ $title }}</h2>
      </header>

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
