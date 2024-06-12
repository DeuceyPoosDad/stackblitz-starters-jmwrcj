import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DemoGridComponent } from './app/demo-grid/demo-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemoGridComponent],
  template: `
    <app-demo-grid>
    </app-demo-grid>
  `,
})
export class App {
}

bootstrapApplication(App, {
  providers: [provideAnimationsAsync()]
});
