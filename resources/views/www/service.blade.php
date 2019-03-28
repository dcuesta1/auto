@extends('www.layouts.site')

@section('title', $title)

@section('intro', '')

@section('content')
<section id="services-page">
        <div class="container clearfix">

      <header class="section-header">
      <h3>{{ $title }}</h3>
      </header>

      <div class="row about-container">
        {{ $desc }}
      </div>
    </div>
</section>
@endsection