import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaItemService } from '../media-item.service';
import { lookupListToken } from '../providers';

@Component({
  selector: 'app-media-item-form',
  templateUrl: './media-item-form-FormGroup.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent implements OnInit {
  // Model driven using FormControl
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemsService: MediaItemService,
    @Inject(lookupListToken) public lookupLists,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      // Pass 2 types of validators.
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator)
    });
  }

  // custom validator
  yearValidator(control: FormControl) {
    // can be empty
    if (control.value.trim().length === 0){
      return null;
    }
    const year = parseInt(control.value, 10);
    const minYear = 1900;
    const maxYear = 2500;
    if (year >= minYear && year <= maxYear){
      return null;
    } else {
      return { year : {
        min: minYear,
        max: maxYear
      }};
    }
  };

  onSubmit(mediaItem) {
    console.log('Adding This item: ', mediaItem)
    this.mediaItemsService.add(mediaItem)
      .subscribe(() => {
        this.router.navigate(['/', mediaItem.medium])
      });
  }

}
