import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { socialsModel } from 'src/app/models/socials.model';

@Component({
  selector: 'socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent implements OnInit, OnChanges {
  @Input() socials: socialsModel;
  @Input() size: string = 'l';
  @Input() title: string = '';
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.socials) this.isLoading = false;
  }

  ngOnChanges(): void {
    if (this.socials) this.isLoading = false;
  }

  goToInstagram() {
    window.open('https://instagram.com/' + this.socials.instagram, '_blank');
  }

  goToYoutube() {
    window.open('https://youtube.com/@' + this.socials.youtube, '_blank');
  }

  goToTwitter() {
    window.open('https://twitter.com/' + this.socials.twitter, '_blank');
  }

  goToWebsite() {
    window.open(this.socials.website, '_blank');
  }
}
