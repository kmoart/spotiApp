import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient ) { 
     console.log('Spotify service listo');
  }

  getQuery( query:string ){

    const url=`https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({

      'Authorization': 'Bearer BQBRBga0SfplUpJaDSzfAfwTi726KPFTEQnd3P33_zh6fCkGWKhnXdhLf-cN0StAqtYeUNa3jV0EnpB-6XA' 
    });

     return this.http.get(url, { headers });

  }

  getNewReleases(){

      return this.getQuery('browse/new-releases')
          .pipe( map( (data:any) =>{
              return data.albums.items;
          }));
  }

  getArtistas( termino: string ){

      return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
          .pipe(map ( (data:any) =>{
              return data['artists'].items;
          }));
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
        //.pipe(map ( (data:any) =>{
            //return data['artists'].items;
        //}));
  }

  getTopTracks( id: string ){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
        .pipe(map ( (data:any) =>{
            return data['tracks'];
        }));
  }

}
