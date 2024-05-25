import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({ providedIn: "root" })
export class CoursesStore {
  /** TODO WITH TODO LIST AS WELL!!! */

  private coursesSubject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadedCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((response) => response["payload"]),
      catchError((err) => {
        const message =
          "We could not load all courses, please try again later.";
        this.messagesService.showErrors(message);

        console.log(message, err);

        return throwError(err);
      }),
      tap((courses) => this.coursesSubject.next(courses))
    );

    this.loadingService.showLoaderUntilComplete(loadedCourses$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    // getValue() of subject gets the last value emitted by the subject
    const courses = this.coursesSubject.getValue();

    const courseIndex = courses.findIndex((course) => course.id === courseId);

    const newCourse: Course = {
      ...courses[courseIndex],
      ...changes,
    };

    const newCourses: Course[] = courses.slice(0);

    newCourses[courseIndex] = newCourse;

    this.coursesSubject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError((err) => {
        const message =
          "We could not save this course, please try again later.";

        this.messagesService.showErrors(message);

        console.log(message, err);

        return throwError(err);
      }),
      shareReplay()
    );
  }
}
