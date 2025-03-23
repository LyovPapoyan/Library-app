import { Component, inject } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HighlightDirective } from '../directives/highlight.direvtive';
import { IBook } from '../interfaces/books.interface';

@Component({
  selector: 'app-libraries-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    HighlightDirective,
  ],

  templateUrl: './libraries-list.component.html',
  styleUrl: './libraries-list.component.scss',
})
export class LibrariesListComponent {
  private _requestsService = inject(RequestsService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  searchWord = '';
  isLoading: boolean = false;
  books: IBook[] = [];

  searchBooks() {
    if (!this.searchWord) {
      this._snackBar.open('Введите название книги', 'Закрыть', {
        duration: 300000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar_info',
      });
      return;
    }
    this.isLoading = true;

    this._requestsService.get(this.searchWord).subscribe({
      next: (response) => {
        if (response.docs.length === 0) {
          this._snackBar.open('Совпадений не найдено', 'Закрыть', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackbar_error',
          });
        }
        this.books = response.docs;
      },
      error: () => {
        this._snackBar.open('Ошибка при загрузке данных', 'Закрыть', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar_error',
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openLibraryCard(book: IBook) {
    this._dialog.open(DetailsComponent, {
      data: book,
    });
  }
}
