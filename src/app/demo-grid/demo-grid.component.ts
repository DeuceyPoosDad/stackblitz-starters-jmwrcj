import { Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { columnArr } from '../models/column.model';
import { DemoData, demoDataArr } from '../models/demo-data.model';
import { MatTableDataSource } from '@angular/material/table';
import { ComponentFactory } from './component-factory.class';
import { DemoFilterComponent } from '../demo-filter/demo-filter.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DemoColumnComponent } from '../demo-column/demo-column.component';

export const DEMO_DATA = new InjectionToken<DemoData>('');

@Component({
  selector: 'app-demo-grid',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    DemoFilterComponent,
    DemoColumnComponent,
  ],
  providers: [
    {
      provide: DEMO_DATA,
      useValue: null,
    }
  ],
  templateUrl: './demo-grid.component.html',
  styleUrl: './demo-grid.component.css',
})
export class DemoGridComponent implements OnInit {
  columns = columnArr;
  columnNames: string[] = columnArr.map((c) => c.cellName);
  dataSource = new MatTableDataSource<DemoData>(demoDataArr);
  columnFilters: Record<string, string> = {};
  componentFactory = new ComponentFactory();
  injectors: Record<string, Injector> = {};

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.filterDataSource;
    this.setInjectors();
  }

  setInjectors(): void {
    const columns = this.columns
      .filter((t) => t.injectComponent !== '')
      .map((t) => t.cellName);
    columns.forEach((c) => {
      for (let i = 0; i < demoDataArr.length; i++) {
        const row = demoDataArr[i];
        const injector = Injector.create({
          providers: [
            {
              provide: DEMO_DATA,
              useValue: row,
            },
          ],
        });
        const key = `${c}${i}`;
        this.injectors[key] = injector;
      }
    });
  }

  onColumnFilterChanged(cellName: string, evt: string): void {
    const val = evt ?? '';
    this.columnFilters[cellName] = val;
    if (val === '') {
      delete this.columnFilters[cellName];
    }
    this.dataSource.filter = JSON.stringify(this.columnFilters);
  }

  filterDataSource(data: any, filter: string): boolean {
    const filters = JSON.parse(filter);
    let retVal = true;
    for (const [key, value] of Object.entries(filters)) {
      const dataVal = data[key];
      if (!dataVal) {
        continue;
      }
      retVal = dataVal.toString().includes(value);
      if (!retVal) {
        break;
      }
    }
    return retVal;
  }
}
