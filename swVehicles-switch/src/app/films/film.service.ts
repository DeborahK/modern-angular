import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { VehicleService } from '../vehicles/vehicle.service';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private http = inject(HttpClient);
  private vehicleService = inject(VehicleService);

  // Retrieve data with rxResource: Best for complex data
  vehicleFilmsResource = rxResource({
    params: this.vehicleService.selectedVehicle,
    stream: p => forkJoin(p.params.films.map(link =>
      this.http.get<Film>(link)
    )),
    defaultValue: []
  });
}
