import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GraficaData } from '../models/grafica.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GraficaService {
  http = inject(HttpClient);
  // // #url = 'https://localhost:7136/';
  #url = 'https://angularpruebasfenix.azurewebsites.net/';
  getDatosGrafica() {
    return this.http.get<GraficaData[]>(this.#url + 'api/Grafica');
  }
}
