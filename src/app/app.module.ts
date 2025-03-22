import { NgModule, inject } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ReservationModule } from './reservation/reservation.module';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { apiInterceptor } from '../app/interceptors/http.interceptors';
import { setContext } from '@apollo/client/link/context';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, ReservationModule],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      // Create an auth link to add the Bearer token
      const authLink = setContext(() => {
        const token = sessionStorage.getItem('token'); // Adjust storage method if needed
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      return {
        link: ApolloLink.from([
          authLink,
          httpLink.create({ uri: `/hotel-graphql` }),
        ]),
        cache: new InMemoryCache(),
      };
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
