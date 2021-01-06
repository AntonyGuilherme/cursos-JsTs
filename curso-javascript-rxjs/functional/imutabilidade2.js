const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// # Dados mutáveis

let total = 0;

for (const item of nums)
    total += item;

console.log(total);


// dados imutáveis

const total2 = nums.reduce((acc, element) => element + acc, 0); // reduce , filter e map nãko alteram os dados originais
console.log(total2);

// Recursividade

function somarArray(array, total = 0) {

    if (!array.length) {
        return total ;
    }

    else {
       return somarArray(array.splice(1), total + array[0]) ;
    }

}


console.log(somarArray(nums));