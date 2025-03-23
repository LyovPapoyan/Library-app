import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { IBook } from '../../interfaces/books.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatDialogModule, MatListModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public book: IBook) {}
}
