import { Component, inject } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Library } from '../interfaces/library.interface';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { HighlightDirective } from '../directives/highlight.direvtive';

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
  searchTriggered = false;
  libraries: Library[] = [];

  searchLibraries() {
    return this._requestsService.getMock().subscribe((response: Library[]) => {
      this.libraries = response.filter((lib) =>
        lib.Name.toLowerCase().includes(this.searchWord.toLowerCase())
      );
      if (this.libraries.length === 0) {
        this._snackBar.open('Совпадений не найдено', 'Закрыть', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  openLibraryCard(library: Library) {
    this._dialog.open(DetailsComponent, {
      data: library
    });
  }
}
