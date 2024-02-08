import { ActivatedRoute, Route, Router } from '@angular/router';
import { RidersService } from './../../../shared/data/RidersService/riders.service';
import { Component, OnInit } from '@angular/core';
import { RiderModel } from 'src/app/models/rider.model';
import { ScreenSizeService } from 'src/app/shared/services/screenSize/screen-size.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss'],
})
export class RiderComponent implements OnInit {
  rider: RiderModel;
  isLoading: boolean = false;
  isMobile: boolean = false;

  constructor(
    private ridersService: RidersService,
    private _screenSizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    // get rider by id from route
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.ridersService.getById(params['id']).subscribe((rider) => {
        this.rider = rider;
        this.isLoading = false;
      });
    });
  }

  convertImagesToDataURLs(selector, callback) {
    const images = document.querySelectorAll(`${selector} img`);
    let imagesToLoad = images.length; // Compteur pour les images à charger

    // Fonction pour charger une image et la convertir en Data URL
    const loadImageAsDataURL = (imgElement) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          imgElement.src = reader.result;
          imagesToLoad--; // Décrémenter le compteur
          if (imagesToLoad === 0) {
            // Toutes les images sont chargées, appeler le callback
            callback();
          }
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', imgElement.src);
      xhr.responseType = 'blob';
      xhr.send();
    };

    if (imagesToLoad === 0) {
      callback(); // S'il n'y a pas d'images, appeler le callback immédiatement
    } else {
      // Convertir toutes les images
      images.forEach((img) => {
        loadImageAsDataURL(img);
      });
    }
  }

  test() {
    this.convertImagesToDataURLs('#rider-card', () => {
      // Une fois toutes les images converties en Data URLs
      html2canvas(document.querySelector('#rider-card')).then((canvas) => {
        // Convertir le canvas en Data URL
        var image = canvas.toDataURL('image/png');

        // Créer un élément a pour déclencher le téléchargement
        var link = document.createElement('a');
        link.download = 'fiche-rider.png';
        link.href = image;

        // URL de partage générique
        let urlPartage = 'https://example.com'; // Remplace example.com par l'URL que tu veux partager
        let legende = 'Ajoute ta légende ici'; // Légende pour la publication sur Instagram

        // URL spécifique à chaque réseau social
        let urlsSpecifiques = {
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            urlPartage
          )}`,
          twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            urlPartage
          )}`,
          linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
            urlPartage
          )}`,
          instagram: `https://www.instagram.com/create/ios/?url=${encodeURIComponent(
            urlPartage
          )}&caption=${encodeURIComponent(legende)}`,
          // Ajoute d'autres réseaux sociaux ici avec leur URL de partage spécifique
        };

        // Ouvre une nouvelle fenêtre de navigateur avec l'URL de partage spécifique au réseau social sélectionné
        window.open(
          urlsSpecifiques['instagram'],
          '_blank',
          'width=600,height=400'
        );
      });
    });
  }
}
