var currentInput = "0";
var operation = [];

/***********************************************************************/
// Add .last to methods of array
if(!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}
// NUMBERS
var numbers = document.getElementsByClassName("number");

function returnNumber() {
  if(currentInput === "0") {
    currentInput = this.textContent;
  } else {
    currentInput += this.textContent;
  }
  console.log(currentInput);
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

  currentInput = parseFloat(currentInput);
  currentInputObject = { "value": currentInput, "type": "number"};

  if(operation.length === 0) {
    operation.push(currentInputObject, currentOperatorObject);
    currentInput = "0";
  } else if(operation.last().type === "operator") {
    operation.pop(); // remove last operator;
    operation.push(currentOperatorObject); //update it with new one
  } else {
    operation.push(currentInputObject, currentOperatorObject);
    currentInput = "0";
  }

  console.log(operation);
}

// Attach event listeners to all operators
for(var i = 0; i < operators.length; i++){
  operators[i].addEventListener('click', returnOperator, false);
}


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
  currentInput += ".";
  if(isThere) {
    console.log("error");
    return "Error message";
  }
}

// CLEAR BUTTONS
document.getElementById("clear-all").addEventListener('click', clearAll, false);
document.getElementById("clear-last").addEventListener('click', clearLast, false);

function clearAll() {
  currentInput = "0";
  operation = [];
}

function clearLast() {
  if(currentInput === "0") {
    operation.pop(); // removes the operator
    currentInput = operation.pop()["value"].toString();  // reasigns the currentInput to what it was before, removes from array as well
  } else {
    currentInput = currentInput.slice(0, -1);
  }
}
