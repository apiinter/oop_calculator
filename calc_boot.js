function Calculator() {    // 계산기 생성자 함수
   //private
   var result = 0;   // 변수 result를 0으로 초기화
   var previous = 0; // 변수 previous를 0으로 초기화
   var reset = false;   // 변수 reset을 false로 초기화

   //public
   this.opVals = ["+", "-", "*", "/"]; // 사칙연산 배열

   this.isNumeric = function (n) {  // 숫자인지 확인하는 함수
      return !isNaN(parseFloat(n)) && isFinite(n); // 숫자가 맞고 무한대가 아니면 true 반환 
   }

   this.convertExpression = function (s) {   // 문자열을 배열로 바꾸면서 문자열 형태의 숫자를 숫자 형태로 바꿈
      if (s.length === 0) return 0;   // 길이가 0이면 0을 반환

      var a = []; // 배열 a 선언
      a = s.split(" "); // 문자열 s를 " "을 기준으로 배열로 만들어서 a에 대입(모든 값 문자열 형태)
      for (var i = 0; i < a.length; i++) {   // 배열 a의 모든 값을 확인
         if (this.isNumeric(a[i])) {   // 배열 a의 값 중 숫자인 값을 문자열 형태에서 숫자 형태로 바꿈
            a[i] = Number(a[i]); // 바꿔서 다시 배열의 똑같은 위치에 저장
         }
      }
      return a;   // 수정된 배열 a를 반환
   }

   this.multiplyOrDivide = function (a) { // 곱셈이나 나눗셈을 계산하는 함수
      var total = 0; // 총합을 0으로 초기화
      if (a.indexOf('*') !== -1 || a.indexOf('/') !== -1) { // 배열 a에 '*' 또는 '/'가 있는 경우
         for (var i = 0; i < a.length; i++) {   // 배열 a의 모든 값 확인
            try { // try catch로 묶어러 에러 처리
               switch (a[i]) {
                  case '*':   // a[i]가 '*'인 경우
                     total = a[i - 1] * a[i + 1];  // '*'의 앞 뒤 값을 곱해서 total에 대입
                     a.splice(i - 1, 3, total); // 배열 a를 다 지우고 맨 앞에 total 대입, [3,'*',3]이면 [9]가 됨
                     i--;  // 바뀐 배열 a를 다시 계산하기 위해 인덱스를 하나 뺌
                     break;   // switch문을 빠져 나와서 다시 for문 동작
                  case '/':   // a[i]가 '/'인 경우
                     if (a[i + 1] === 0) {   // '/'의 바로 뒤에 있는 값이 0인 경우 에러 처리
                        throw new Error("dividing by zero");   // 에러 전달
                     } else { // '/'의 바로 뒤에 있는 값이 0이 아닌 경우 
                        total = a[i - 1] / a[i + 1];  // '/'의 앞 뒤 값을 나누기
                     }
                     a.splice(i - 1, 3, total); // 배열 a를 다 지우고 맨 앞에 total 대입, [3,'/',3]이면 [1]이 됨
                     i--;  // 바뀐 배열 a를 다시 계산하기 위해 인덱스를 하나 뺌 
                     break;   // switch문을 빠져 나와서 다시 for문 동작
                  default: // 배열 a에 '*'나 '/'가 없을 경우
                     break;   // switch문을 빠져 나와서 다시 for문 동작
               }
            } catch (e) {  // 에러 발생하는 경우 동작
               console.log(e.name + ': ' + e.message);   // 에러 메시지 전달("dividing by zero")
            }
         }
      }
      return a;   // 계산 완료 후 배열 a 반환
   }

   this.addOrSubtract = function (a) { // 더하기 또는 빼기
      var total = 0; // 합계 0으로 초기화
      if (a.indexOf('+') !== -1 || a.indexOf('-') !== -1) { // 배열 a에 '+' 또는 '-'가 있는 경우
         for (var i = 0; i < a.length; i++) {   // 배열 a의 모든 값 확인
            try {
               switch (a[i]) {   // a[i] 확인
                  case '+':   // a[i]가 '+'인 경우
                     total = a[i - 1] + a[i + 1];  // '+'의 앞 뒤 값을 더해서 total에 대입
                     a.splice(i - 1, 3, total); // 배열 a의 계산 완료된 값과 '+'기호를 모두 지우고 맨 앞에 total 넣음
                     i--;  // 바뀐 배열 a를 다시 계산하기 위해 i 값 1만큼 빼기
                     break;   // switch문 빠져나와서 for문으로 이동
                  case '-':   // a[i]가 '-'인 경우
                     total = a[i - 1] - a[i + 1];  // '-'의 앞 뒤 값을 빼서 total에 대입
                     a.splice(i - 1, 3, total); // 배열 a의 계산에 사용된 값을 모두 지우고 맨 앞의 값에 total 넣음
                     i--;  // 바뀐 배열 a를 total부터 다시 계산하기 위해 인덱스값 하나 지움
                     break;   // switch문 빠져나와 for문으로 이동
                  default: // 배열 a에 '+' 또는 '-'가 없는 경우 for문으로 이동
                     break;
               }
            } catch (e) {  // 계산 중에 오류 발생 시
               console.log(e.name + ': ' + e.message);  // 오류 메시지를 콘솔에 띄움
            }
         }
      }
      return a;   // 계산이 완료된 배열 a를 반환
   }

   this.equals = function (s) {  // 배열 계산하는 함수
      if (s.length === 0) return "";   // 배열 s의 길이가 0인 경우 "" 반환"

      var a = this.convertExpression(s);  // 배열 s에서 문자열 형태의 숫자값을 숫자 형태로 바꿔서 a에 대입
      previous = result;   // result를 previous에 대입
      if (a.length === 0)  // 배열 a의 길이가 0인 경우
         result = 0;

      //order of operations
      a = this.multiplyOrDivide(a); // 배열 a에 대한 곱셈 또는 나눗셈 실행
      a = this.addOrSubtract(a); // 곱셈 또는 나눗셈이 끝난 배열 a에 대한 덧셈 또는 뺄셈 실행

      try {
         if (a.length !== 1 || !Number(a[0])) { // 배열 a의 길이가 1이 아니고 0번째 값이 숫자가 아닌 경우
            throw new Error("Order of operations incomplete"); // 에러 메시지 발생하여 catch로 이동
         }
         result = a[0]; // 에러 발생 안 한 경우 result에 a[0] 대입
      } catch (e) {
         console.log(e.name + ': ' + e.message);
         result = "error"; // 에러 발생 시 result에 "error" 대입
      }

      return result; // 최종 결과값인 result 반환
   }

   this.setReset = function (val) { // reset을 설정하는 함수
      reset = val;
   }

   this.getReset = function () { // reset값을 반환하는 함수
      return reset;
   }

   this.clearAll = function () { // 전체 화면과 기록 삭제
      result = "";
      previous = "";
      return result;
   }

   //go back to last answer
   this.clearLast = function () {   // 1번만 이전 결과로 돌아감
      result = previous;
      previous = "";
      return result;
   }

}

var init = function () {
   var myCalc = new Calculator();   // Caculator() 생성자 함수로 myCalc 객체 생성
   var inputOutput = document.getElementById("inputOutput"); // 입력값 출력 화면

   //event handler
   var calculate = function (e) {
      var element = e.target || e.srcElement;   // element에 e.target을 대입하고 안되면 e.srcElement 대입
      var op = element.innerHTML;   // element의 innerHTML을 변수 op에 대입
      var opVals = myCalc.opVals;   // ["+", "-", "*", "/"]을 opVals에 대입

      try {
         if (myCalc.isNumeric(op)) {   // 입력값이 숫자인 경우

            if (myCalc.getReset()) {   // =, CE, AC 다음 입력만 해당
               inputOutput.value = op; // 디스플레이에 숫자가 하나 표시됨
            } else {
               inputOutput.value += op;   // 디스플레이의 값 뒤에 숫자가 추가됨
            }
            myCalc.setReset(false); // reset에 false 대입

         } else if (op === ".") {   // 입력값이 "."인 경우

            if (myCalc.isNumeric(inputOutput.value.substr(-1))) { // 디스플레이 맨 뒤의 값이 숫자인 경우
               inputOutput.value += op;   // "."을 디스플레이 값 뒤에 추가함
               myCalc.setReset(false); // reset에 false 대입
            }

         } else if (opVals.indexOf(op) !== -1) {   // 사칙연산 기호 입력 시

            if (opVals.indexOf(inputOutput.value.substr(-2, 1)) === -1) {  // 뒤에서 2번째가 사칙연산 기호가 아닌 경우
               inputOutput.value += " " + op + " ";   // 사칙연산 기호 양 옆에 스페이스
               myCalc.setReset(false);
            }

         } else if (op === "=" && !myCalc.getReset()) {  // reset이 false인 경우, =, CE, AC 다음 입력에는 안됨
            inputOutput.value = myCalc.equals(inputOutput.value); // result를 inputOutput.value에 대입
            myCalc.setReset(true);  // reset에 true 대입

         } else if (op === "CE") {  // 입력값이 "CE"인 경우
            inputOutput.value = myCalc.clearLast();   // 1회 이전 값으로 돌아간 값을 화면에 보여줌
            myCalc.setReset(true);  // reset에 true 대입

         } else if (op === "AC") {  // 입력값이 "AC"인 경우
            myCalc.clearAll();   // 모든 기록 삭제
            inputOutput.value = ""; // 화면 초기화
            myCalc.setReset(true);  // reset에 true 대입

         } else { // 오류 발생한 경우
            throw new Error("unknown entry");
         }
      } catch (e) {
         console.log(e.name + ': ' + e.message);
         inputOutput.value = "error";
      }
   };

   //add events
   (function () { // 모든 버튼에 addEventListener 적용하여 클릭할 때마다 calculate() 호출
      var calc = document.getElementById("calculator");
      var buttons = calc.getElementsByTagName("button");
      for (var i = 0; i < buttons.length; i++) {
         buttons[i].addEventListener("click", calculate);
      }
   })(); // init()이 호출되면 즉시 실행 함수

};

window.onload = init;   // 페이지 로딩될 때 init() 호출