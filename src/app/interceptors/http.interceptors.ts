import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if the request is already absolute (e.g., starts with http:// or https://)
  const apiReq = req.clone({
    url: `${environment.BACKEND_URL}${req.url}`,
  });

  return next(apiReq);
};
