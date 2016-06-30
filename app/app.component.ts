import { Component } from '@angular/core';
import './rxjs-operators';
import {DayCycleCollectionComponent} from './daycyclecollection.component';


@Component({
  selector: 'my-app',
  template: `
<daycycle-collection></daycycle-collection>
`,
  directives: [DayCycleCollectionComponent]
})

export class AppComponent { }

