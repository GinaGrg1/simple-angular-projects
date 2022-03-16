import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaItemService } from './media-item.service';
import { MediaItem } from './media-items';

@Component({
  selector: 'app-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css']
})
export class MediaItemListComponent implements OnInit {
  medium = '';
  mediaItems: MediaItem[];

  constructor(private mediaService: MediaItemService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        console.log(`paramMap is : ${paramMap.get('medium')}`)
        let medium = paramMap.get('medium'); // look for 'medium' in url.
        if (medium.toLowerCase() === 'all'){
          medium = '';
        }
        this.getMediaItems(medium)
      });
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaService.get(medium)
      .subscribe(
        mediaItems => {this.mediaItems = mediaItems;}
      );
  }

  // we are passing a function to subscribe so that it can trigger a reload of the list on delete
  onMediaItemDelete(mediaItem: string) {
    this.mediaService.delete(mediaItem)
      .subscribe(() => {
        this.getMediaItems(this.medium);
      });
  };

}
