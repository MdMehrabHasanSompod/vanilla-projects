let currentNum = '';
let prevNum = '';
let currentOperation='';

const appendNum = (num) => {
  currentNum += num;
  document.getElementById('result').value = `${prevNum} ${currentOperation} ${currentNum}`;
  scrollLeft()
}

const appendOperation = (operation) => {
    if (currentNum === '') return;

    if (prevNum !== '' && currentOperation !== '') {
        calculate();
        prevNum = document.getElementById('result').value;
    } else {
        prevNum = currentNum;
    }

    currentOperation = operation;
    currentNum = '';
    document.getElementById('result').value = `${prevNum} ${currentOperation}`;
    scrollLeft()
}

const calculate = () => {
    if(prevNum === '' || currentNum === '' ) return;
    let result;
    let prev = parseFloat(prevNum);
    let current = parseFloat(currentNum);
    switch(currentOperation){
        case '+': result = prev + current; 
        break;
        case '-': result = prev - current;
        break;
        case '*': result = prev * current;
        break;
        case '/': result = current === 0 ? "Undefined" : prev / current;
        break;
        case '%': result = prev % current;
        break;
        default: return;
    }

    currentNum = '';
    prevNum = '';
    currentOperation ='';
    document.getElementById('result').value = result.toString();
    scrollLeft()
}

const eraseDisplay = () => {
   let displayVal = document.getElementById('result').value;
   let newDisplayVal = displayVal.slice(0,-1);
   document.getElementById('result').value = newDisplayVal;
   scrollLeft()
}


const clearDisplay = () => {
    currentNum = '';
    prevNum ='';
    currentOperation ='';
    document.getElementById('result').value = '';
    scrollLeft()
}

const scrollLeft = () => {
    const resultBox = document.getElementById('result');
    resultBox.scrollLeft = resultBox.scrollWidth; 
}
