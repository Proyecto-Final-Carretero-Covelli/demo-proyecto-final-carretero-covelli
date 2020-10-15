// 1. Multiplicacion con suma

let x = 4;
let y = 5;

function mult(num1, num2) {
    let result = 0;
    
    for (let i = 0; i<num2; i++) {
        result += num1;
    }
    
    return result;
}

const resultado = mult(x, y);

// 2. Insertar ordenado

let input = [2, 5, 1];

function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}

const resultado = insertionSort(input);