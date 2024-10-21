import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // name = 'Angular';
  seats: number[][] = [
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(3).fill(0),
  ];

  message: string = '';

  // Method to handle seat booking
  bookSeats(numSeats: number) {
    if (numSeats > 7) {
      this.message = 'You can only book a maximum of 7 seats at a time.';
      return;
    }

    // Try to book seats in the same row
    for (let row of this.seats) {
      if (row.filter((seat) => seat === 0).length >= numSeats) {
        let seatsBooked = 0;
        for (let i = 0; i < row.length && seatsBooked < numSeats; i++) {
          if (row[i] === 0) {
            row[i] = 1; // Book the seat
            seatsBooked++;
          }
        }
        this.message = 'Seats booked successfully!';
        return;
      }
    }

    // Book nearby seats if one row doesn't have enough available
    let seatsBooked = 0;
    for (let row of this.seats) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 0 && seatsBooked < numSeats) {
          row[i] = 1; // Book the seat
          seatsBooked++;
        }
      }
      if (seatsBooked === numSeats) {
        this.message = 'Seats booked successfully!';
        return;
      }
    }

    this.message = 'Not enough seats available!';
  }

  // Method to display the seats for debugging (optional)
  displaySeats(): void {
    console.log(this.seats);
  }
}
