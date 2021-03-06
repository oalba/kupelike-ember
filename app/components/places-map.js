import Ember from 'ember';

export default Ember.Component.extend({
  /* global $ */
  /* global google */
  /* global navigator */
    didInsertElement:function(){
        var that = this;
    // var map;
          // var user;
          var centerControlDiv = document.createElement('div');
          var centerControlDiv2 = document.createElement('div');
          var mv = 0;
          
          
        function CenterControl2(controlDiv2, map, bounds) {
        
          // Set CSS for the control border.
          var firstChild2 = document.createElement('button');
            firstChild2.style.backgroundColor = '#fff';
            firstChild2.style.border = 'none';
            firstChild2.style.outline = 'none';
            firstChild2.style.width = '28px';
            firstChild2.style.height = '28px';
            firstChild2.style.borderRadius = '2px';
            firstChild2.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
            firstChild2.style.cursor = 'pointer';
            firstChild2.style.marginRight = '10px';
            firstChild2.style.padding = '0px';
            firstChild2.title = 'Mostrar todas.';
            controlDiv2.appendChild(firstChild2);
        
            var secondChild2 = document.createElement('div');
            secondChild2.style.margin = '5px';
            secondChild2.style.width = '18px';
            secondChild2.style.height = '18px';
            secondChild2.style.backgroundImage = 'url("img/logo_transp18.png")';
            secondChild2.style.backgroundSize = '18px 18px';
            secondChild2.style.backgroundPosition = '0px 0px';
            secondChild2.style.backgroundRepeat = 'no-repeat';
            secondChild2.id = 'cider_location_img';
            firstChild2.appendChild(secondChild2);
        
        
          // Setup the click event listeners: simply set the map to Chicago.
          firstChild2.addEventListener('click', function() {
            //map.panTo(bounds.getCenter());
            //map.fitBounds(bounds);
            map.panTo(bounds.getCenter());
            google.maps.event.addListenerOnce(map, 'idle', function() {
              map.fitBounds(bounds);
            });
          });
        
        }
        
        
        function CenterControl(controlDiv, map, persona) {
        
          // Set CSS for the control border.
          var firstChild = document.createElement('button');
            firstChild.style.backgroundColor = '#fff';
            firstChild.style.border = 'none';
            firstChild.style.outline = 'none';
            firstChild.style.width = '28px';
            firstChild.style.height = '28px';
            firstChild.style.borderRadius = '2px';
            firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
            firstChild.style.cursor = 'pointer';
            firstChild.style.marginRight = '10px';
            firstChild.style.padding = '0px';
            firstChild.title = 'Your Location';
            controlDiv.appendChild(firstChild);
        
            var secondChild = document.createElement('div');
            secondChild.style.margin = '5px';
            secondChild.style.width = '18px';
            secondChild.style.height = '18px';
            secondChild.style.backgroundImage = 'url("img/mylocation-sprite-1x.png")';
            secondChild.style.backgroundSize = '180px 18px';
            secondChild.style.backgroundPosition = '0px 0px';
            secondChild.style.backgroundRepeat = 'no-repeat';
            secondChild.id = 'you_location_img';
            firstChild.appendChild(secondChild);
        
        
          // Setup the click event listeners: simply set the map to Chicago.
          /*firstChild.addEventListener('click', function() {
            map.setZoom(17);
            map.panTo(persona);
          });*/
          
            firstChild.addEventListener('click', function() {
              //map.setZoom(17);
              map.panTo(persona);
              google.maps.event.addListenerOnce(map, 'idle', function() {
                map.setZoom(17);
              });
              
              //map.CameraUpdateFactory.newLatLngZoom(persona, 17);
              if (mv == 0) {
                $('#you_location_img').css('background-position', '-144px 0px');
              } else {
                $('#you_location_img').css('background-position', '-162px 0px');
              }
              mv = 1;
            });
            
            firstChild.addEventListener('mouseover', function() {
              if (mv == 0) {
                $('#you_location_img').css('background-position', '-36px 0px');
              } else {
                $('#you_location_img').css('background-position', '-162px 0px');
              }
            });
            
            firstChild.addEventListener('mouseout', function() {
              if (mv == 0) {
                $('#you_location_img').css('background-position', '0px 0px');
              } else {
                $('#you_location_img').css('background-position', '-144px 0px');
              }
            });
            
            firstChild.addEventListener('mousedown', function() {
              if (mv == 0) {
                $('#you_location_img').css('background-position', '-54px 0px');
              } else {
                $('#you_location_img').css('background-position', '-162px 0px');
              }
            });
            
            firstChild.addEventListener('mouseup', function() {
              if (mv == 0) {
                $('#you_location_img').css('background-position', '-36px 0px');
              } else {
                $('#you_location_img').css('background-position', '-162px 0px');
              }
            });
            
            google.maps.event.addListener(map, 'dragend', function() {
                $('#you_location_img').css('background-position', '0px 0px');
                mv = 0;
            });
        
        }
  
  
  
        function myMap() {
          //Creando el mapa
          var mapCanvas = document.getElementById("map");
          var mapOptions = {
            streetViewControl: true,
            mapTypeControl: true,
            zoomControl: true,
            //scaleControl: true,
            //rotateControl: true,
            center: new google.maps.LatLng(43.323832,-1.9768633), 
            zoom: 17,
            scrollwheel: false
          };
          var map = new google.maps.Map(mapCanvas, mapOptions);
          
          
          //Creando los iconos
          var kupImg="img/logoblanco35.png";
          var sagarImg={
            url:kupImg,
            size: new google.maps.Size(35, 35)
          };
      
          var perImg="img/personaPos.png";
          var persImg={
            url:perImg,
            size: new google.maps.Size(35, 35)
          };
      
      
          // Añadiendo marcadores y Centrando el mapa//////////////////////////////////
      
          //create empty LatLngBounds object
          var bounds = new google.maps.LatLngBounds();
          var infowindow = new google.maps.InfoWindow();  
      that.get('items').forEach(function(item){
          var mas = {  
              position: {
                lat: item.get('latitude'),
                lng: item.get('longitude')
              },
              nombre: item.get('name'),
              direccion: item.get('address')
            };
            var nombre = mas.nombre;
            var direccion = mas.direccion;
            var lati = mas.position.lat;
            var longi = mas.position.lng;
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lati, longi),
              animation: google.maps.Animation.DROP,
              map: map,
              title: nombre,
              icon: sagarImg
            });
            (function(marker, nombre) {
              google.maps.event.addListener(marker, 'click', function() {
                //infowindow.setContent('<a href="google.navigation:q='+marcadores[i].position.lat+','+marcadores[i].position.lng+'">'+nombre+'<br>'+direccion+'</a>');
                infowindow.setContent('<a href="google.navigation:q='+lati+', '+longi+'">'+nombre+'<br>'+direccion+'</a>');
                //infowindow.setContent(nombre+'<br>'+direccion);
                infowindow.open(map, marker);
                map.panTo(marker.position);
                //map.setCenter(marker.position);
                //map.setZoom(17);
              });
            })(marker, nombre);
  
            bounds.extend(marker.position);
      })

          //now fit the map to the newly inclusive bounds
          map.fitBounds(bounds);
          // var centerControl2 = new CenterControl2(centerControlDiv2, map, bounds);
          new CenterControl2(centerControlDiv2, map, bounds);
          
          ///////////////////////////////////////////////////////////////////////////
          
          
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var perPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              // var persona = new google.maps.Marker({
              new google.maps.Marker({
                position: perPos,
                animation: google.maps.Animation.DROP,
                map: map,
                title: 'Tu posición.',
                icon: persImg
              });
              // var centerControl = new CenterControl(centerControlDiv, map, perPos);
              new CenterControl(centerControlDiv, map, perPos);
            });
          }
          centerControlDiv.index = 1;
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
          centerControlDiv2.index = 1;
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv2);
        }
    myMap();
        
    }
        
        
});
