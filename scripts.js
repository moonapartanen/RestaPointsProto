var locations = [];
var maanimi;
var maay;
var maax;
var etumaa = [];
var map;

$(document).ready(function(){

	FrontMap();
	Roulette();
});
	
function FrontMap()
{
	
	map = new google.maps.Map(document.getElementById('frontmap'), {
		zoom: 15,
		center: new google.maps.LatLng(62.898997, 27.664062),
		styles:
		[
			{
				"featureType": "all",
				"elementType": "all",
				"stylers": [
				{
					"hue": "#ff0000"
				},
				{
					"saturation": -100
				},
				{
					"lightness": -30
				}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#353535"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#656565"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#505050"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#808080"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#454545"
					}
				]
			}
		]
	});
	
	var infowindow = new google.maps.InfoWindow();
		for (i = 0; i < etumaa.length; i++) 
		{  
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(etumaa[i][1], etumaa[i][2]),
			map: map,
			});
			
			addInfoWindow2(marker, etumaa[i][0]);		
		}
}
	
function addInfoWindow2(marker, message) 
{
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map, marker);
	});
	
	$("#palaaTakaisin").click(function() {
		infoWindow.close();
	});
}

function haku(maaurl)
{
	$(document).ready(function(){
		$.ajax({
			url: "haku.php?maa="+maaurl+"&map=1",
			method: "POST",
			datatype: 'json'
			}).done(function(response) {
				
				var place = JSON.parse(response);

				for(var i = 0; i < place.data.length; i++)
				{
					var koordi1 = place.data[i].koordi1.toString();
					var koordi2 = place.data[i].koordi2;
					var linkki = place.data[i].linkki;
					var nimi = place.data[i].nimi;
					locations.push(['<a id="maplink" href="'+linkki+'">'+nimi+'</a>',koordi1,koordi2, i+1]);
				} 
			
				MaaTaulu(maaurl);
		});
	});
}

function MaaTaulu(maaurl)
{
	$(document).ready(function(){
		$.ajax({
			url: "haku.php?maa="+maaurl+"&maat=1",
			method: "POST",
			datatype: 'json'
			}).done(function(response) {
				tieto = JSON.parse(response);
			 	
				for(var i = 0; i < tieto.data.length; i++){
					 var kuvaus = tieto.data[i].kuvaus.toString();
					 var kokemus = tieto.data[i].kokemus.toString();
					 var kokemusnimi = tieto.data[i].kokemusnimi.toString();
					 var posteri = tieto.data[i].posteri.toString();
					} 
				
			document.getElementById("maanKuvaus").innerHTML = kuvaus;
		    document.getElementById("maanNimi").innerHTML = maaurl.toUpperCase();
			document.getElementById("kokemus").innerHTML = "\"" + kokemus + "\"";
			document.getElementById("kokemusnimi").innerHTML = "-" + kokemusnimi;
			 
			if(posteri != null)
			{
				document.getElementById("posteri").innerHTML = "Katso posteri <a href='Posterit/" + posteri + "'>täältä</a>";
			}
			 
			myMap(maaurl);
		});
	});	
}

function myMap(maaurl)
{
	var marker, i;
	var maakeskitysx = locations[0][1];
	var maakeskitysy = locations[0][2];
	
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: new google.maps.LatLng(maakeskitysx,maakeskitysy),
		});

	var infowindow = new google.maps.InfoWindow();
		for (i = 0; i < locations.length; i++) 
		{  
			marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			});
			
			addInfoWindow(marker, locations[i][0]);		
		}
		
		locations = [];
		$("#maamodal").modal();
}

function addInfoWindow(marker, message) 
{
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map, marker);
	});
}
function Slot(el, max, step) {
    this.speed = 0; //speed of the slot at any point of time
    this.step = step; //speed will increase at this rate
    this.si = null; //holds setInterval object for the given slot
    this.el = el; //dom element of the slot
    this.maxSpeed = max; //max speed this slot can have
}
Slot.prototype.start = function() {
    var _this = this;
    $(_this.el).addClass('motion');
    $(_this.el).spStart();
    _this.si = window.setInterval(function() {
        if(_this.speed < _this.maxSpeed) {
            _this.speed += _this.step;
            $(_this.el).spSpeed(_this.speed);
        }
    }, 100);
};
Slot.prototype.stop = function() {
    var _this = this,
        limit = 30;
    clearInterval(_this.si);
    _this.si = window.setInterval(function() {
        if(_this.speed > limit) {
            _this.speed -= _this.step;
            $(_this.el).spSpeed(_this.speed);
        }
        if(_this.speed <= limit) {
            _this.finalPos(_this.el);
            $(_this.el).spSpeed(0);
            $(_this.el).spStop();
            clearInterval(_this.si);
            $(_this.el).removeClass('motion');
            _this.speed = 0;
        }
    }, 100);
};
Slot.prototype.finalPos = function() {
    var el = this.el,
        pos,
        posMin = 2000000000,
        best,
        bgPos,
        i,
        j,
        k;
 
    el_id = $(el).attr('id');
    pos = document.getElementById(el_id).style.backgroundPosition;
    pos = pos.split(' ')[1];
    pos = parseInt(pos, 10);
 
    for(i = 0; i < posArr.length; i++) {
        for(j = 0;;j++) {
            k = posArr[i] + (imgHeight * j);
            if(k > pos) {
                if((k - pos) < posMin) {
                    posMin = k - pos;
                    best = k;
                }
                break;
            }
        }
    }
 
    best += imgHeight + 4;
    bgPos = "0 " + best + "px";
    $(el).animate({
        backgroundPosition:"(" + bgPos + ")"
    }, {
        duration: 200
    });
};



$(document).ready(function(){
	if ( ($(window).height() + 100) < $(document).height() ) 
	{
		$('#top-link-block').removeClass('hidden').affix({
		offset: {top:10}
	});
	
	$("a[href='#yhteyshenkilotlinkki']").click(function() {
		$('html, body').animate({
		scrollTop: $("#yhteyshenkilot").offset().top
		}, 2000);
	});
	
	$("a[href='#infoalinkki']").click(function() {
		$('html, body').animate({
		scrollTop: $("#infoa").offset().top
		}, 2000);
	});
	
	$("a[href='#rahoituslinkki']").click(function() {
		$('html, body').animate({
		scrollTop: $("#rahoitus").offset().top
		}, 2000);
	});
	
	$("a[href='#mitentoiminlinkki']").click(function() {
		$('html, body').animate({
		scrollTop: $("#mitentoimin").offset().top
		}, 2000);
	});
	
	$("a[href='#mitentoiminhenkilotlinkki']").click(function() {
		$('html, body').animate({
		scrollTop: $("#yhteyshenkilot").offset().top
		}, 2000);
	});	
}});
		



	



