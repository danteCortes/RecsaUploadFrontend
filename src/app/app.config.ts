import type { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(FontAwesomeModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
  ],
};
