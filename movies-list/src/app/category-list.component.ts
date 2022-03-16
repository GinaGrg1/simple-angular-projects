import { Component, Input, OnInit } from '@angular/core';

// the :host refers to this current component ie. app-category-list
// :host-context refers to the items inside.
@Component({
  selector: 'app-category-list',
  template: `
    <span class="label" *ngFor="let category of categories">
        {{ category }}
    </span>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 8px;
      }
      :host-context(.medium-movies) span {
        background-color: #53ace4;
      }
      :host-context(.medium-series) span {
        background-color: #45bf94;
      }
      span {
        display: inline-block;
        margin-right: 4px;
        margin-bottom: 4px;
      }
   
    `
  ]
})
export class CategoryListComponent implements OnInit {
  @Input() categories: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
