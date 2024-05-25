import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrl: "./courses-card-list.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    // afterClosed() Observable: emits values after dialog gets closed
    dialogRef
      .afterClosed()
      .pipe(
        /* after every successful PUT request we emit a new event for informing rest of app that the course data has changed */
        // filter only successful saves that have a val = value emitted:
        filter((val) => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();
  }
}
