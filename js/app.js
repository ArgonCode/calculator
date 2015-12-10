var currentInput = "0";
var operation = [];
var result;

/***********************************************************************/
// update displayed value
var display = document.getElementById("calc-display");
display.addEventListener('click', updateDisplay, false);

function updateDisplay(num) {
  display.value = num;
}

/***********************************************************************/
// NUMBERS
var numbers = document.getElementsByClassName("number");

function returnNumber() {
  var value;
  if(typeof arguments[0] === "string") {
    value = arguments[0];
  } else {
    value = this.textContent;
  }

  if(currentInput === "0" || currentInput === "") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay(currentInput);
}

// Attach event listeners to all numbers
for(var i = 0; i < numbers.length; i++){
  numbers[i].addEventListener('click', returnNumber, false);
}

/***********************************************************************/
// OPERATORS
var operators = document.getElementsByClassName("operators");

function returnOperator() {
  var operator;
  if(typeof arguments[0] === "string") {
    operator = arguments[0];
  } else {
    operator = this.textContent;
  }


  currentOperator = operator;
  currentOperatorObject = { "value": currentOperator, "type": "operator"};

  if(currentInput === "") {
    operation.pop(); // remove last operator;
    operation.push(currentOperatorObject); //update it with new one
  } else {
    currentInput = parseFloat(currentInput);
    currentInputObject = { "value": currentInput, "type": "number"};

    operation.push(currentInputObject, currentOperatorObject);
    currentInput = "";
  }
  updateDisplay(currentOperator);
}

// Attach event listeners to all operators
for(var i = 0; i < operators.length; i++){
  operators[i].addEventListener('click', returnOperator, false);
}

/***********************************************************************/
// FLOATING POINT
document.getElementById("float").addEventListener('click', addFloat, false);

// check floating point
function floatCheck() {
  if(currentInput.indexOf('.') === -1) {
    return false; // not there
  } else {
    return true; // there
  }
}

// add floating point
function addFloat() {
  isThere = floatCheck();
  if(isThere) {
    updateDisplay(currentInput);
  } else if(currentInput === ""){
    currentInput = "0.";
    updateDisplay(currentInput);
  } else {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}
/***********************************************************************/
// CLEAR BUTTONS
document.getElementById("clear-all").addEventListener('click', clearAll, false);
document.getElementById("clear-last").addEventListener('click', clearLast, false);

function clearAll() {
  currentInput = "0";
  operation = [];
  updateDisplay(currentInput);
}

function clearLast() {
  if(currentInput === "") {
    operation.pop(); // removes the operator
    currentInput = operation.pop().value.toString();  // reasigns the currentInput to what it was before, as a string, removes from calculatiion array as well
  } else if(currentInput.length === 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
    updateDisplay(currentInput);
}
// TODO: add a gigantic display in first line, moving to the left, with everything there so far ?
// TODO: will this require order of operations ?
// TODO: it could have it in ladder like lines

/***********************************************************************/
// CALCULATE RESULT
document.getElementById("get-result").addEventListener('click', getResult, false);

function getResult() {
  /****************************************************************************
  There are only 3 options for input
  1. "0" - when nothing was there yet
  2. e.g.: "4554" - some number
    a) as a first timer
    b) not first timer
  3. "" - after operator was used and no number was inserted afterwards
    a) when after removing operator, one element is left
    b) more than one
  ****************************************************************************/
  if(currentInput === "") {
    operation.pop(); // remove last operator
  } else if (currentInput === "0") {
    console.log(currentInput); // turn into a number
    updateDisplay(currentInput);
    //return currentInput;
  } else if (operation.length === 0) {
    console.log(currentInput); // turn into a number
    updateDisplay(currentInput);
  } else {
    currentInput = parseFloat(currentInput);
    currentInputObject = { "value": currentInput, "type": "number"};
    operation.push(currentInputObject);
    currentInput = calculateResult();

    currentInput = currentInput.toString();
    updateDisplay(currentInput);
  }
}

function calculateResult() {
  var len = operation.length;
  var result = 1;

  if(len === 1){
    result = operation[0].value;
  } else {
    result = calculateFirst3(operation);
    while(operation.length >= 2) {
      result = calculateAny3(result, operation);
    }
  }
  return result;
}

function calculateFirst3(oparationArray) {
  var result = 1;

  num1 = oparationArray.shift().value;
  operator = oparationArray.shift().value;
  num2 = oparationArray.shift().value;

  console.log();
  switch (operator) {
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "+":
      result = num1 + num2;
      break;
  }
  return result;
}


function calculateAny3(result, oparationArray) {
  num1 = result;
  operator = oparationArray.shift().value;
  num2 = oparationArray.shift().value;

  switch (operator) {
    case "x":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "+":
      result = num1 + num2;
      break;
  }
  return result;
}


/****************************************************************/
// Add keyboard events

window.addEventListener("keyup", checkKeyUp, false);

function checkKeyUp(e) {
  if(e.shiftKey && e.which === 187) {
    returnOperator("+");
  } else if(e.shiftKey && e.which === 56) {
    returnOperator("x");
  } else {
    switch (e.which) {
      case 48:
      case 96:
        returnNumber("0");
        break;
      case 49:
      case 97:
        returnNumber("1");
        break;
      case 50:
      case 98:
        returnNumber("2");
        break;
      case 51:
      case 99:
        returnNumber("3");
        break;
      case 52:
      case 100:
        returnNumber("4");
        break;
      case 53:
      case 101:
        returnNumber("5");
        break;
      case 54:
      case 102:
        returnNumber("6");
        break;
      case 55:
      case 103:
        returnNumber("7");
        break;
      case 56:
      case 104:
        returnNumber("8");
        break;
      case 57:
      case 105:
        returnNumber("9");
        break;
      case 106:
        returnOperator("x");
        break;
      case 107:
        returnOperator("+");
        break;
      case 109:
      case 189:
        returnOperator("-");
        break;
      case 111:
      case 191:
        returnOperator("/");
        break;
      case 110:
      case 190:
      case 188:
        addFloat(); // period, point, and comma (for the Poles :))
        break;
      case 187:
      case 13:
      case 176:
        getResult();
        break;
      case 27:
        clearAll();
        break;
      case 46:
        clearLast();
        break;
      default:
        break;
    }
  }
}
