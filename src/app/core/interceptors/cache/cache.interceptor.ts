import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../../services/cache/cache.service';

export function CacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const cache = inject(CacheService);
  if (req.method == 'GET') {
    const cachedResponse = cache.getCacheByUrl(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && req.method == 'GET') {
        cache.setCache(req.url, event);
      }
    })
  );
}
