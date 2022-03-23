// if (window.Worker) {
    
//     const worker = new Worker('ss')
//     const input1 = document.getElementById("input1")
//     const input2 = document.getElementById("input2")




//     input1.onchange = function () {
//         worker.postMessage([input1.value, input2.value])
//         console.log('Hi From Post message To Worker')
//     }

//     input2.onchange = function () {
//         worker.postMessage([input1.value, input2.value])
//         console.log('Hi From Post message To Worker')
//     }

//     worker.onmessage = function(e) {
//         console.log('Message received from main script');
//         var workerResult = 'Result: ' + e.data;
//         console.log('Posting message back to main script');
//         postMessage(workerResult);
//     }

//     console.log(worker)

// }
