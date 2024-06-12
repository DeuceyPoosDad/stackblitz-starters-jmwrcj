import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-demo-filter',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './demo-filter.component.html',
  styleUrl: './demo-filter.component.css'
})
export class DemoFilterComponent {
  @Output() columnFilterChanged = new EventEmitter<string>();

  updateFilter(value: string): void {
    this.columnFilterChanged.emit(value);
  }
}
