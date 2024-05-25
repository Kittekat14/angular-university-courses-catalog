import { Injectable } from "@angular/core";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  courses$: Course[];

  constructor(private http: HttpClient) {}

  loadCourseById(courseId: number) {
    return this.http
      .get<Course>("/api/courses/" + courseId)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: number) {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: {
          pageSize: "10000",
          courseId: courseId.toString(),
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"]),
      // each subscribe() of this observable is shared and not called again (good for http calls):
      shareReplay()
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(searchString: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: {
          filter: searchString,
          pageSize: "100",
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }
}
