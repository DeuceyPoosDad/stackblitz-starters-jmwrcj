import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { DemoData } from '../models/demo-data.model';
import { DEMO_DATA } from '../demo-grid/demo-grid.component';

@Component({
  selector: 'app-demo-column',
  standalone: true,
  imports: [],
  templateUrl: './demo-column.component.html',
  styleUrl: './demo-column.component.css'
})

export class DemoColumnComponent implements OnInit{
  @Input() val: string = '';
  address: string = '';

  constructor(@Inject(DEMO_DATA) private value?: DemoData) {}

  ngOnInit(): void {
    this.address = this.value?.dynamicComponent ?? this.val;
  }
}
