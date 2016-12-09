import { Component } from '@angular/core';
import { AppProperties } from "./shared/app.properties";

@Component({
  selector: 'wjc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options = AppProperties.NOTIFICATION_OPTIONS;
}
