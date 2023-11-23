import { Component, Input } from '@angular/core';

@Component({
  selector: 'maps-card',
  templateUrl: './maps-card.component.html',
  styleUrls: ['./maps-card.component.scss'],
})
export class MapsCardComponent {
  @Input() address: string;
  @Input() height: string;
  @Input() width: string;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: -34.397, lng: 150.644 }, // Coordonnées par défaut
    });
    console.log(this.address);

    const geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, map);
  }

  geocodeAddress(geocoder, map): void {
    geocoder.geocode({ address: this.address }, (results, status) => {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode n'a pas réussi pour la raison suivante: " + status);
      }
    });
  }
}
