import { HttpBackend, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

// mocking up a backend server.
export class MockXHRBackend implements HttpBackend {
  private mediaItems = [
    {
      id: 1,
      name: 'The Shining',
      medium: 'Movies',
      category: 'Fiction/Horror',
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false,
      imagePath: 'assets/images/theshining.jpg',
    },
    {
      id: 2,
      name: 'Titanic',
      medium: 'Movies',
      category: 'Romance',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: true,
      imagePath: 'assets/images/titanic.jpg',
    },
    {
      id: 3,
      name: 'The Redemption',
      medium: 'Movies',
      category: 'Action',
      year: 2016,
      watchedOn: 1457166565384,
      isFavorite: false,
      imagePath: 'assets/images/redemption.jpg',
    },
    {
      id: 4,
      name: 'Greys Anatomy',
      medium: 'Series',
      category: 'Drama',
      year: null,
      watchedOn: 1457166565384,
      isFavorite: true,
      imagePath: '/assets/images/greys-anatomy.jpeg',
    },
    {
      id: 5,
      name: 'Killing Eve',
      medium: 'Series',
      category: 'Action',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false,
      imagePath: '/assets/images/killing-eve.jpeg',
    },
    {
      id: 6,
      name: 'Whats Eating Gilbert Grape',
      medium: 'Movies',
      category: 'Drama',
      year: 2016,
      watchedOn: 1457166565384,
      isFavorite: false,
      imagePath: 'assets/images/whatseatinggilbert.jpg',
    },
    {
      id: 7,
      name: 'Sin City',
      medium: 'Movies',
      category: 'Action/Thriller',
      year: 2005,
      watchedOn: 1457166565384,
      isFavorite: true,
      imagePath: 'assets/images/sincity.jpg',
    },
    {
      id: 8,
      name: 'Castaway',
      medium: 'Movies',
      category: 'Drama',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false,
      imagePath: 'assets/images/castaway.jpg',
    },
    {
      id: 9,
      name: 'The Shawshank Redemption',
      medium: 'Movies',
      category: 'Drama',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false,
      imagePath: 'assets/images/the-shawshank-redemption.jpg',
    },
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (
            request.urlWithParams.indexOf('mediaitems?medium=') >= 0 ||
            request.url === 'mediaitems'
          ) {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') {
                medium = '';
              }
            }
            let mediaItems;
            if (medium) {
              mediaItems = this.mediaItems.filter((i) => i.medium === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
              status: 200,
            };
          } else {
            let mediaItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            mediaItems = this.mediaItems.filter((i) => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200,
            };
          }
          break;
        case 'POST':
          const mediaItem = request.body;
          mediaItem.id = this._getNewId();
          this.mediaItems.push(mediaItem);
          responseOptions = { status: 201 };
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = { status: 200 };
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {};
    });
  }

  _deleteMediaItem(id) {
      const mediaItem = this.mediaItems.find(i => i.id === id);
      const index = this.mediaItems.indexOf(mediaItem);

      if (index >= 0) {
          this.mediaItems.splice(index, 1);
      }
  }

  _getNewId() {
      if (this.mediaItems.length > 0) {
          return Math.max.apply(Math, this.mediaItems
            .map(mediaItem => mediaItem.id)) + 1;
      } else {
          return 1;
      }
  }
}
 