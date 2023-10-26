import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {
  
  }

  getCountries() {
    return this.httpClient.get('https://restcountries.com/v3.1/lang/spanish')
      .pipe(
        map( (data: any) => {
          return data.map( (country: any) => {
            return {
              name: country.name.common,
              code: country.cca3
            }
          })
        })
      );
  }

}
