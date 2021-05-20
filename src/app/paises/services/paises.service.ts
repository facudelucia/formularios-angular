import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from './../interfaces/paises.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  get regiones() {
    return [...this._regiones]
  }
  constructor(private http: HttpClient) { }
  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    return this.http.get<PaisSmall[]>(`https://restcountries.eu/rest/v2/region/${region}?fields=alpha3Code;name`)
  }
  getPaisesPorCodigo(codigo: string): Observable<Pais | null> {
    if (!codigo) return of(null)
    return this.http.get<Pais>(`https://restcountries.eu/rest/v2/alpha/${codigo}`)
  }
  getPaisesPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    console.log(codigo)
    return this.http.get<PaisSmall>(`https://restcountries.eu/rest/v2/alpha/${codigo}?fields=alpha3Code;name`)
  }
  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {

    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach(codigo => {
      const peticion = this.getPaisesPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }
}
