import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mw-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {

  // Parent to Child.
  @Input() mediaItem: any;

  // Child to Parent.
  @Output() toDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    console.log('deleting.')
    this.toDelete.emit(this.mediaItem)
  }

}
