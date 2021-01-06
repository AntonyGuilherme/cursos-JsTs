const nums = [3,1,7,9,4,6];
const nums2 = [...nums].sort(); //[...array] gera uma cópia do array;
console.log(nums , nums2);

const numsStatict = Object.freeze([3,1,7,9,4,6]); // não permite que os dados sejam mudados

