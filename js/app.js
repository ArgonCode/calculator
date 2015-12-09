var currentInput = "0";
var operation = [];
var result;

/***********************************************************************/
// update displayed value
var display = document.getElementById("calc-display");
display.addEventListener('click', updateDisplay, false);

function updateDisplay(value) {
  display.textContent = value;
}

/***********************************************************************/
// NUMBERS
var numbers = document.getElementsByClassName("number");

function returnNumber() {
  if(currentInput === "0" || currentInput === "") {
    currentInput = this.textContent;
  } else {
    currentInput += this.textContent;
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
  currentOperator = this.textContent;
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
