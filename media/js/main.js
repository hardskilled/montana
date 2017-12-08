$(document).ready(function($) {
    $(window).load(function() {
        $('.overlay').fadeOut(500, function() {
            $(this).remove();
        });

        $('.filtr-container').filterizr();

        $('.flexslider').flexslider({
            animation: "slide"
        });

        $(".flexslider ul.slides li").each(function(){
            var img = $(this).find('img');
            $(this).css('background', 'url('+img.attr('src')+')');
            img.remove();
        });

        /* --- Portfolio --- */

        $('.portfolio .tabs li a').click(function() {
            $('.portfolio .tabs li').removeClass('active');
            $(this).parent().addClass('active');
            $('.portfolio .works .work').fadeOut(200, function() {
                $('.portfolio .works .filtr-container').removeClass('filtr-hide');
            });

            return false;
        });

        $('.portfolio .works a').click(function() {
            var work = $('.portfolio .works .work');

            $(work).find('.image img').attr('src', $(this).find('img').attr('src'));
            $(work).find('.description h4').html($(this).find('.item-desc').html());
            $(work).find('.description p').html($(this).find('.description').html());

            $('.portfolio .works .filtr-container').addClass('filtr-hide');
            $(work).fadeIn(400, function(){});

            return false;
        });

        $('.portfolio .work a.close-button').click(function() {
            $('.portfolio .works .work').fadeOut(200, function() {
                $('.portfolio .works .filtr-container').removeClass('filtr-hide');
            });

            return false;
        });
    });
});

/* --- Google maps --- */

google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
    var mapOptions = {
        center: new google.maps.LatLng(40.7484799, -73.98542459999999),
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
        scaleControl: true,
        scrollwheel: true,
        panControl: true,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [ { "featureType": "landscape", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "transit", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },{ "stylers": [ { "hue": "#00aaff" }, { "saturation": -100 }, { "gamma": 2.15 }, { "lightness": 12 } ] },{ "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "lightness": 24 } ] },{ "featureType": "road", "elementType": "geometry", "stylers": [ { "lightness": 57 } ] } ],
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    var data = $('#map');
    var info = {
        title: $(data).data('title'),
        description: $(data).data('description'),
        telephone: $(data).data('telephone'),
        email: $(data).data('email'),
        web: $(data).data('web'),
        markericon: $(data).data('markericon'),
        latitude: $(data).data('latitude'),
        longitude: $(data).data('longitude')
    };

    if (info.title =='undefined'){ title ='';} else { title = info.title;}
    if (info.description =='undefined'){ description ='';} else { description = info.description;}
    if (info.telephone =='undefined'){ telephone ='';} else { telephone = info.telephone;}
    if (info.email =='undefined'){ email ='';} else { email = info.email;}
    if (info.web =='undefined'){ web ='';} else { web = info.web;}
    if (info.markericon =='undefined'){ markericon ='';} else { markericon = info.markericon;}
    marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(info.latitude, info.longitude),
        map: map,
        title: title,
        desc: description,
        tel: telephone,
        email: email,
        web: web
    });
    if (web.substring(0, 7) != "http://") {
        link = "http://" + web;
    } else {
        link = web;
    }
    bindInfoWindow(marker, map, title, description, telephone, email, web, link);

    function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
        var infoWindowVisible = (function () {
            var currentlyVisible = false;
            return function (visible) {
                if (visible !== undefined) {
                    currentlyVisible = visible;
                }
                return currentlyVisible;
            };
        }());
        var iw = new google.maps.InfoWindow();
        var open = function() {
            var html= "<div class='bubble-map'><h4>"+title+"</h4><p>"+desc+"<p><p>"+telephone+"<p><a href='mailto:"+email+"' >"+email+"<a><a href='"+link+"'' >"+web+"<a></div>";
            iw = new google.maps.InfoWindow({content:html});
            iw.open(map,marker);
            infoWindowVisible(true);
        };

        var onload = google.maps.event.addListener(map, 'tilesloaded', function() {
            open();
            google.maps.event.removeListener(onload);
        });

        google.maps.event.addListener(marker, 'click', function() {
            if (infoWindowVisible()) {
                iw.close();
                infoWindowVisible(false);
            } else {
                open();
            }
        });

        google.maps.event.addListener(iw, 'closeclick', function () {
            infoWindowVisible(false);
        });
    }
}