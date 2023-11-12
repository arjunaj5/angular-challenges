import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students"
    customClass="bg-light-green"
    (onAddNewItem)="addNewStudent()">
    <img logoImage ngSrc="assets/img/student.webp" width="200" height="200" />
    <ng-template #itemTemplate let-item>
      <app-list-item
        [name]="item.firstname"
        (onClickDelete)="deleteStudent(item.id)">
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private studentStore: StudentStore
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));

    this.studentStore.students$.subscribe((s) => (this.students = s));
  }

  addNewStudent() {
    this.studentStore.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.studentStore.deleteOne(id);
  }
}
