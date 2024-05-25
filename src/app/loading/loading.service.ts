import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

// this service is injectable independently from its other instances
// --> no { providedIn: 'root' }, where all components share only one instance of that service
@Injectable()
export class LoadingService {
  // Subjects are like Observables, but we can emit distinct values to its consumer components whenever we want
  // BehaviorSubject remembers last value or initial value if no value emitted yet (that's why it needs an initial value)
  // private, because we don't want other components subscribing to it & accessing it directly over next() method,
  // it's not allowed for other components to use next() method to emit new values, we want to emit values only from here!
  // But: we can emit the Subject's values as an Observable and components can subscribe(): !but not controlling values themselves!
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    // of(null): observable chain created, but doesn't emit something
    return of(null).pipe(
      // setting the loading on, but don't do anything with courses$ (tap())
      tap(() => this.loadingOn()),
      // concatMap(): switching back to original observable and returning it for further use
      concatMap(() => obs$),
      // at the end turning loading off
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
