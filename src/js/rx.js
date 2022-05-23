/*
  from => making observable from promise or array
*/

import { Observable, fromEvent, switchMap, of, catchError } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const observable = new Observable((subs) => {
  subs.next(1);
  subs.next(2);
  subs.next(3);
  setTimeout(() => {
    subs.next(4);
    subs.complete();
  }, 1000);
});

const clickEvent = fromEvent(document.getElementById("rx"), "click");
const clickEventSub = clickEvent.subscribe((e) => console.log(e));

const clickEventSub2 = clickEvent.subscribe((e) =>
  console.log("Click Sub Two 22")
);

observable.subscribe({
  next(val) {
    console.log(val);
  },
  complete() {
    console.log("First Observer Compeleted");
  },
});

// When the First Observer Subscribe is totally finished the second will execute

// observable.subscribe({
//     next(val) {
//         console.log("From Second Subscribe", val)
//     }
// })

const data$ = fromFetch("https://jsonplaceholder.typicode.com/posts").pipe(
  switchMap((response) => response.json()),
  catchError((err) => console.error(err))
);

data$.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log("done"),
});

setTimeout(() => {
  data$.subscribe({
    next: (result) => console.log(result),
    complete: () => console.log("done"),
  });
}, 3000)
