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
