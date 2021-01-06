function generateNumbers() {

    return {
        start(fn, time = 1000) {

            let num = 0;
            const interval = setInterval(() => {

                fn(++num);

            }, time);

            return {
                parar() {
                    clearInterval(interval);
                }
            }

        }
    }

}


const temp = generateNumbers();
const exec = temp.start(numero => { console.log(`#1 ${numero * 2}`); }, 500);
const temp2 = generateNumbers();
const exec2 = temp2.start(numero => { console.log(`#2 ${numero + 100}`); }, 500);

setTimeout(() => {
    exec.parar();
    exec2.parar();
}, 10000);