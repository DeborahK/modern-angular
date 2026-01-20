import { Component } from '@angular/core';
import { VehicleList } from "../vehicle-list/vehicle-list";
import { VehicleDetail } from "../vehicle-detail/vehicle-detail";
import { CartTotal } from '../../cart/cart-total/cart-total';

@Component({
  selector: 'swv-vehicle-shell',
  template: `
      <div class='shell'>
        <div class='list-container'>
          <swv-vehicle-list/>
        </div>
        <div class='detail-container'>
          <swv-vehicle-detail/>
        </div>
        <div class='total-container'>
          <swv-cart-total/>
        </div>
      </div>
    `,
  styleUrl: './vehicle-shell.css',
  imports: [VehicleList, VehicleDetail, CartTotal]
})
export class VehicleShell {

}
