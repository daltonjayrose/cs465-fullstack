import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TripDataService } from './services/trip-data.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TripListingComponent, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TripDataService, AuthenticationService]
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
}
