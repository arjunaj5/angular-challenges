import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CityStore } from '../../data-access/city-store';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    customClass="bg-light-green"
    (onAddNewItem)="addNewCity()">
    <img logoImage ngSrc="assets/img/student.webp" width="200" height="200" />
    <ng-template #itemTemplate let-item>
      <app-list-item [name]="item.name" (onClickDelete)="deleteCity(item.id)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  constructor(private http: FakeHttpService, private cityStore: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.cityStore.addAll(s));

    this.cityStore.cities$.subscribe((s) => (this.cities = s));
  }

  addNewCity() {
    this.cityStore.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.cityStore.deleteOne(id);
  }
}
