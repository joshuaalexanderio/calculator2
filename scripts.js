let buffer = '0';
let runningTotal = 0;
let previousOperator;
function buttonClick(value) {
    if(isNaN(parseInt(value))) {
        symbolHandler(value);
    } else {
        numberHandler(value);
    }
    rerender(buffer);

}
function symbolHandler(symbol) {
    switch(symbol) {
        case '<-': {
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0,(buffer.length)-1)
            }
            break;
        }
        case 'C': {
            buffer = '0';
            break;
        }
        case '=': {
            if (previousOperator === null) {
                // need 2 numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = "" + runningTotal;
            runningTotal = 0;  
            break; 
        }
        case '+':
        case '-':
        case 'X':
        case '/':
             {
            mathHandler(symbol);
        }
    }
}
function mathHandler(value) {
    if (buffer === 0) {
        return;
    } 

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}
function numberHandler(number) {
    if (buffer === '0' && number === '0'){
        return;
    }
    else if (buffer === '0') {
        //if it's first number entered
        buffer = number;
    }
    else {
        buffer += number;
    }
}
function rerender(buffer) {
    let display = document.querySelector('.display');
    display.innerText = buffer;
};
function flushOperation(intBuffer) {
    switch(previousOperator) {
        case '+': {
            runningTotal += intBuffer;
            break;
        }
        case '-': {
            runningTotal -= intBuffer;
            break;
        }
        case 'X': {
            runningTotal *= intBuffer;
            break;
        }
        case '/': {
            runningTotal /= intBuffer;
            break;
        }
    }
}
function main () {
        // Listens for click on any digit
    document
        .querySelector('.calc-buttons')
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
    });
}
main();