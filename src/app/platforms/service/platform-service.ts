import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, lastValueFrom } from 'rxjs';
import { rawPlatformData } from '../pltforms.component';
import { platforms } from './platformConfig';


export interface PlatformInfo {
  name: string,
  link: string
}

export interface StartDateTime {
  start_date: string,
  start_time: string,
  start_time_zone: string 
}

export interface EndDateTime {
  end_date: string,
  end_time: string,
  end_time_zone: string 
}

export enum DateTimeFormat {
  STAR = 'start',
  END = 'end'
}

export type contestTimeing = StartDateTime | EndDateTime;

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  platformData: any;

  constructor( private http: HttpClient ) { }

  async getCodingPlatformData( ) {
    let url: string = `https://kontests.net/api/v1/sites`;
    return await lastValueFrom( this.http.get(url) );
  }

  processPlatformData( rawPlatformData: rawPlatformData[] ) {
    let processedPlatformData: PlatformInfo[] = [];
    rawPlatformData.forEach( data => {
      let platformData: PlatformInfo = {
        name: data[0].replace('::',''),
        link: data[2]
      };
      processedPlatformData.push(platformData);
    });
    processedPlatformData.sort((val1,val2) => {
      return val1.name.toLowerCase().localeCompare(val2.name.toLocaleLowerCase());
    });
    return processedPlatformData;
  }

  async getContest( platformName: string ) {
    let siteName: string = this.getSiteName( platformName);
    let url: string = `https://kontests.net/api/v1/${siteName}`
    return await lastValueFrom( this.http.get(url) );
  }

  private getSiteName( name: string ) {
    if( Object.keys(platforms).includes(name) ) {
      return platforms[name]; 
    } else {
      // throw errorstart_time
    }
  }

  processPlatformViewData(platformViewArray: any[]) {
    let timing: contestTimeing;
    platformViewArray.forEach(contest => {
      contest.time = {};
      timing = this.getDateTimeFormat(contest.start_time.split(' '), DateTimeFormat.STAR);
      contest.time = { ...contest.time, ...timing };
      timing = this.getDateTimeFormat(contest.end_time.split(' '), DateTimeFormat.END);
      contest.time = { ...contest.time, ...timing };
      console.log(contest.time);
    });

  }

  getDateTimeFormat(dateTimeArray: string[], type: string) {
    let time: contestTimeing;
    if ( type === DateTimeFormat.STAR) {
      time = {
        start_date: dateTimeArray[0],
        start_time: dateTimeArray[1],
        start_time_zone: dateTimeArray[2] 
      };
    } else {
      time = {
        end_date: dateTimeArray[0],
        end_time: dateTimeArray[1],
        end_time_zone: dateTimeArray[2]
      };
    }
    return time;
  }

}
