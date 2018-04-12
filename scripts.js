var markerDragonSheng;
var markerMountSherpa;

$(document).ready(function(){

	$("#patonkiposse").click(function()
	{
		$("#patonkipossemodal").modal();
	});

	InitializeMap();

	markerDragonSheng.addListener('click', function() {
		$("#modalDragonSheng").modal();
	});
  
	markerMountSherpa.addListener('click', function() {
		$("#modalMountSherpa").modal();
	});

	markerMountSherpa.addListener('click', function() {
		$("#modalMountSherpa").modal();
	});
});
	
function InitializeMap()
{
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: new google.maps.LatLng(62.898997, 27.664062),
	});
	
	markerDragonSheng = new google.maps.Marker({
		position: new google.maps.LatLng(62.8946901, 27.676138499),
		map: map,
		title: 'Dragon Sheng',
		label: {
			text: "Dragon Sheng: 520 pistettä",
			color: "black",
			fontSize: "14px",
			fontWeight: "bold"
		  }
	  });
  
  var markerHarald = new google.maps.Marker({
	  position: new google.maps.LatLng(62.8925755, 27.676264700),
	  map: map,
	  title: 'Viikinkiravintola Harald',
	  label: {
		text: "Harald: 300 pistettä",
		color: "black",
		fontSize: "14px",
		fontWeight: "bold"
	  	}
	  });

  markerMountSherpa = new google.maps.Marker({
	  position: new google.maps.LatLng(62.8928034, 27.68115119),
	  map: map,
	  title: 'Mount Sherpa',
	  label: {
		text: "Mount Sherpa: 730 pistettä",
		color: "black",
		fontSize: "14px",
		fontWeight: "bold"
	  	}
	  });
}

	markerMountSherpa = new google.maps.Marker({
		position: new google.maps.LatLng(62.8928034, 27.68115119),
		map: map,
		title: 'Mount Sherpa'
		});
	



	



