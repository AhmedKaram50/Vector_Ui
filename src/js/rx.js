import { Observable } from "rxjs";

const observable = new Observable((subs) => {
  subs.next(1);
  subs.next(2);
  subs.next(3);
  setTimeout(() => {
    subs.next(4);
    subs.complete();
  }, 1000);
});


observable.subscribe({ 
  next(val) {
    console.log(val);
  },
  complete() {
    console.log("First Observer Compeleted");
  },
});

// When the First Observer Subscribe is totally finished the second will execute

observable.subscribe({
    next(val) {
        console.log("From Second Subscribe", val)
    }
})

/*
1
2
3
4
console.log("Completed");
*/