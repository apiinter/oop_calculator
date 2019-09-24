function Calculator() {
   "use strict";
   var inputArray = [],
      operations = ["x", "/", "+", "-"],
      number = "",
      i,
      that = this,   // Calculator.add() 대신에 that.add()로 쓸 수 있게 해줌
      equation = document.getElementById("equation"),
      display = document.getElementById("display");
   display.textContent = "0";

   this.add = function (a, b) {
      var c = inputArray[a] + inputArray[b];
      inputArray[a] = c;
      inputArray.splice(a + 1, 2);
      i -= 2;
   };

   this.substract = function (a, b) {
      var c = inputArray[a] - inputArray[b];
      inputArray[a] = c;
      inputArray.splice(a + 1, 2);
      i -= 2;
   };

   this.divide = function (a, b) {
      var c = inputArray[a] / inputArray[b];
      if (isNaN(c)) {
         c = 0;
      }
      inputArray[a] = c;
      inputArray.splice(a + 1, 2);
      i -= 2;
   };

   this.multiply = function (a, b) {
      var c = inputArray[a] * inputArray[b];
      inputArray[a] = c;
      inputArray.splice(a + 1, 2);
      i -= 2;
   };

   this.equal = function () {
      for (i = 0; i < inputArray.length; i += 1) {
         if (inputArray[i] === "/") {
            that.divide(i - 1, i + 1);
         }
         if (inputArray[i] === "x") {
            that.multiply(i - 1, i + 1);
         }
      }
      for (i = 0; i < inputArray.length; i += 1) {
         if (inputArray[i] === "+") {
            that.add(i - 1, i + 1);
         }
         if (inputArray[i] === "-") {
            that.substract(i - 1, i + 1);
         }
      }
      display.textContent = inputArray[0];
   };

   this.clear = function () {
      inputArray = [];
      number = "";
      display.textContent = "0";
      equation.textContent = "";
   };

   this.printEquation = function () {
      equation.textContent = "";
      for (i = 0; i < inputArray.length; i += 1) {
         equation.textContent += inputArray[i];
      }
   };

   this.input = function (e) {
      var input = e.target.textContent;
      var testInput = operations.indexOf(input) === -1 ? false : true;
      //Add a zero if operator is clicked without any input
      if (testInput && number === "") {
         number = "0";
      }
      //Run clear if equal is clicked without any input
      if (input === "=" && inputArray.length === 0) {
         this.clear;
      } else if (testInput) { // 사칙연산 버튼 클릭시 동작함 
         inputArray.push(parseInt(number, 10));
         inputArray.push(input);
         number = "";
         display.textContent = "0";
         that.printEquation();
      } else if (input === "C") {
         that.clear();
      } else if (input === "=") {
         if (number !== "") { // 숫자가 방정식의 마지막에 있을 경우
            inputArray.push(parseInt(number, 10));
            number = "";
            that.printEquation();
            that.equal();
         } else { // 사칙연산 기호가 방정식의 마지막에 있을 경우 삭제
            inputArray.pop();
            number = "";
            that.equal();
         }
      } else {
         number += input;
         display.textContent = number;
      }
   };
}

//Initialise calculator
var calci = new Calculator();
var nodes = document.getElementById("calBtn").childNodes;   // calBtn의 childNodes를 nodes 배열에 대입
for (var i = 0; i < nodes.length; i++) {  // calBtn의 모든 버튼에 addEventListener 설정
   if (nodes[i].nodeName.toLowerCase() === "span") {
      nodes[i].addEventListener("click", calci.input)
   }
}