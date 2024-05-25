import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService {
  // before filling the errors array, we need to create a subject that is responsible for emitting
  private errorSubject = new BehaviorSubject<string[]>([]);

  errors$: Observable<string[]> = this.errorSubject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  showErrors(...errors: string[]) {
    this.errorSubject.next(errors);
  }
}
