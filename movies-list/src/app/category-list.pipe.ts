import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryList'
})
export class CategoryListPipe implements PipeTransform {

  transform(mediaItems) {
    const categories = [];
    mediaItems.forEach(mediaItem => {
      if (categories.indexOf(mediaItem.category) <= -1) {
        categories.push(mediaItem.category)
      }
    });
    return categories;
  }

}


// To use this pipe in the html do:
// <header>
//    <div>{{  mediaItems | categoryList }} </div>
// </header>