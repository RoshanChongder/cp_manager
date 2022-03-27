import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, lastValueFrom } from 'rxjs';
import { rawPlatformData } from '../pltforms.component';
import { platforms } from './platformConfig';


export interface PlatformInfo {
  name: string,
  link: string
}

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
    console.log("<----------", name , "-------------->");
    console.log(Object.keys(platforms));
    console.log(Object.keys(platforms).includes(name));
    
    if( Object.keys(platforms).includes(name) ) {
      return platforms[name]; 
    } else {
      // throw error
    }
  }

}
