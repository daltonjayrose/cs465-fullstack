import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent implements OnInit {
  trip!: Trip;
  tripCode!: string;
  message: string = '';

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem("tripCode") || '';
    if (!this.tripCode) {
      alert("No tripCode found in localStorage!");
      this.router.navigate(['']);
      return;
    }

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (value: any) => {
        if (value && value.length > 0) {
          this.trip = value[0];
          this.message = `Ready to delete: ${this.trip.name}`;
        } else {
          this.message = "No trip found with provided code.";
        }
      },
      error: (error) => {
        console.error('Error fetching trip:', error);
        this.message = 'Failed to load trip details.';
      }
    });
  }

  onDelete(): void {
    if (confirm("Are you sure you want to delete this trip?")) {
      this.tripDataService.deleteTrip(this.tripCode).subscribe({
        next: (response) => {
          console.log("Trip deleted:", response);
          localStorage.removeItem("tripCode");
          this.router.navigate(['list-trips']);
        },
        error: (err) => {
          console.error("Error deleting trip:", err);
          this.message = "Failed to delete trip.";
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['list-trips']);
  }
}