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
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, ReservationModule],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:3000/hotel-graphql' }),
        cache: new InMemoryCache(),
      };
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
