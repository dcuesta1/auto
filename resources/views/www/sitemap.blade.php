@extends('www.layouts.site')

@section('title', 'Sitemap')

@section('intro', '')

@section('content')
<section id="services-page" style="font-size:14px">

  <div class="container">
    <div class="row">
      <div class="col-12">

        <div class="section-header">
          <h2>Sitemap</h2>
        </div>
      </div>
    </div>
    @include('www/partials/sitemap-section')
  </div>
</section>
@endsection
