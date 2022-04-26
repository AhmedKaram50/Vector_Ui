import { Observable, fromEvent } from "rxjs";

const observable = new Observable((subs) => {
  subs.next(1);
  subs.next(2);
  subs.next(3);
  setTimeout(() => {
    subs.next(4);
    subs.complete();
  }, 1000);
});


const clickEvent = fromEvent(document.getElementById("rx"), "click")
const clickEventSub = clickEvent.subscribe(
  (e) => console.log(e)
)




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
