import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from '../service/platform-service';

@Component({
  selector: 'app-platform-view',
  templateUrl: './platform-view.component.html',
  styleUrls: ['./platform-view.component.css']
})
export class PlatformViewComponent implements OnInit {

  platformName = '';
  platformViewDataArray: any;
  platformDataAvailable: boolean = false;
  platformLink: string | null = '';
  constructor( 
    private route: ActivatedRoute,
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        let pName = params['platfromName'];
        this.platformName = pName ? pName : this.platformName; 
        this.platformLink = this.route.snapshot.paramMap.get('siteLink');
        this.platformService.getContest(this.platformName).then(
          (data) => {
            console.log(data);
            this.platformViewDataArray = data;
            this.platformViewDataArray.reverse();
            this.platformService.processPlatformViewData(this.platformViewDataArray);
            // date and time needs to be separated
            this.platformDataAvailable = true;
          }
        );
      } 
    );  
  }

}
