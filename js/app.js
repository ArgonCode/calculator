var currentInput = "";

// document.getElementById('7').addEventListener("click",function(){
//   currentInput += 7;
//   console.log(currentInput);
//   console.log(typeof currentInput);
// });
//
// document.getElementsByClassName('btn').addEventListener("click",function(){
//   console.log(this.value);
//   currentInput += 4;
//   console.log("btn");
//   console.log(typeof currentInput);
// });

var numbers = document.getElementsByClassName("btn");

var returnNumber = function() {
  console.log(this.textContent);
};

// Attach event listeners to all numbers
for(var i = 0; i < numbers.length; i++){
  numbers[i].addEventListener('click', returnNumber, false);
}
// OPERATORS
var operators = document.getElementsByClassName("operators");

function returnOperator() {
  // TODO: display operator
  currentInput = parseFloat(currentInput);
  currentInputObject = { "value": currentInput, "type": "number"};
  currentOperator = this.textContent;
  currentOperatorObject = { "value": currentOperator, "type": "operator"};
  operation.push(currentInputObject, currentOperatorObject);
  currentInput = "0";
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
