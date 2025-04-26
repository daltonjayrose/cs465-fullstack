import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip() {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(this.trip.code).subscribe({
        next: () => {
          console.log(`Trip ${this.trip.code} deleted successfully.`);
          // Optionally: reload page or trigger logic to remove the card from the DOM
          window.location.reload(); // simple solution
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
        }
      });
    }
  }
}