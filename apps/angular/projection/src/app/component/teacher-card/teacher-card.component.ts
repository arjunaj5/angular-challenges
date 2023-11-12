import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    (onAddNewItem)="addNewTeacher()"
    customClass="bg-light-red">
    <img logoImage ngSrc="assets/img/teacher.png" width="200" height="200" />
    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.firstname"
        (onClickDelete)="deleteTeacher(item.id)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
    private teacherStore: TeacherStore
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addNewTeacher() {
    this.teacherStore.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
