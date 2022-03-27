import { Component, OnInit } from '@angular/core';
import { PlatformService, PlatformInfo } from './service/platform-service.service';
import { Router } from '@angular/router';

export type rawPlatformData = [string, string, string];

@Component({
  selector: 'app-pltforms',
  templateUrl: './pltforms.component.html',
  styleUrls: ['./pltforms.component.css']
})
export class PltformsComponent implements OnInit {


  platformsData!: PlatformInfo[];

  constructor( 
    private platformService: PlatformService,
    private router: Router
  ) {
    this.platformService.getCodingPlatformData().then(
      (data) => {
        this.platformsData = this.platformService.processPlatformData(data as rawPlatformData[]);
        console.log(this.platformsData);
      }, (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  onClick( platformName: string, link: string ) {
    console.log(platformName);
    this.router.navigate([`platforms/${platformName}/platform-view`, {siteLink: link, si : true}]);
  }

}
