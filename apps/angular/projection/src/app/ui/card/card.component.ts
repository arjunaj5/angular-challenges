import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [NgIf, NgFor, NgTemplateOutlet],
})
export class CardComponent implements AfterContentInit {
  @Input() list: any[] | null = null;
  @Input() customClass = '';

  @Output() onAddNewItem: EventEmitter<void> = new EventEmitter();

  @ContentChild('itemTemplate') itemTemplateRef: any;

  constructor() {}

  onClickAdd() {
    this.onAddNewItem.emit();
  }

  ngAfterContentInit(): void {
    console.log(this.itemTemplateRef);
  }
}
