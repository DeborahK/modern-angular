import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
  selector: 'swv-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.css'
})
export class CartTotal {
  private vehicleService = inject(VehicleService);

  // Signals used in the UI
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = linkedSignal({
    source: this.vehicleService.selectedVehicle,
    computation: v => 1
  });

  price = computed(() => this.selectedVehicle()?.cost_in_credits ?? 0);
  subTotal = computed(() => this.quantity() * this.price());

  // Delivery is free if spending more than 100,000 credits
  readonly freeShippingAmount = 100000;
  readonly almostThereAmount = 80000;
  readonly shippingFee = 999;
  deliveryFee = computed(() =>
    this.subTotal() < this.freeShippingAmount ? this.shippingFee : 0);

  readonly deliveryMessageOption = {
    Empty: 'empty',
    FeeRequired: 'feeRequired',
    AlmostThere: 'almostThere',
    Free: 'free',
  } as const;

  deliveryMessage = computed(() => {
    if (this.subTotal() <= 0) return this.deliveryMessageOption.Empty;
    if (this.subTotal() >= this.freeShippingAmount) return this.deliveryMessageOption.Free
    if (this.subTotal() >= this.almostThereAmount) return this.deliveryMessageOption.AlmostThere;
    return this.deliveryMessageOption.FeeRequired;
  });

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());
}
