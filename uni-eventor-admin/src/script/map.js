
      function initMap() {
        var myLatlng = {lat: -25.363, lng: 131.044};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatlng
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Click to zoom'
        });

		google.maps.event.addListener(map, 'click', function(event) {
			var myLatLng = event.latLng;
			var lat = myLatLng.lat();
			var lng = myLatLng.lng();
		})

        marker.addListener('click', function() {
			
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });
      }