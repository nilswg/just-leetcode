// @ts-check

// 題目鏈結
// https://leetcode.com/problems/evaluate-reverse-polish-notation

// 題目說明
// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
// Valid operators are +, -, *, and /. Each operand may be an integer or another expression.
// Note that division between two integers should truncate toward zero.
// It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.
//

// Example 1:
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9
//

// Example 2:
// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6
//

// Example 3:
// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22
//

// Constraints:
// 1 <= tokens.length <= 104
// tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].
//

// 解題重點
// 1.使用 stack 去儲存
// 2.

// 解題思路

/**
 * Solution : 使用 Stack
 * 
 * 1.遇到運算符('+','-','*','/')時，就將儲存在stack中的元素pop出，運算後再將結果儲存回去。
 *
 * e.g:  ["2","1","+","3","*"]
 *
 *    i    stack     operator       eval:
 *    0    [2]
 *    1    [1]
 *    3    [2, 1],   '+'            '1 + 2 = 3' -> [3] (3 重新放回stack中)
 *    4    [3, 3]
 *    5    [3, 3]    '*'            '3 * 3 = 9' -> [9] (9 重新放回stack中)
 *
 * -> 返回 stack[0]=9 作為結果
 * 
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 * 
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let stack = [];
  for (const token of tokens) {
    if (token === "+") {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a + b);
    } else if (token === "-") {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a - b);
    } else if (token === "*") {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a * b);
    } else if (token === "/") {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack[0];
};

// 測試
(function () {
  console.log("Testing [p0150_evaluateReversePolishNotation]...");

  console.log(evalRPN(["2", "1", "+", "3", "*"]) === 9);
  console.log(evalRPN(["4", "13", "5", "/", "+"]) === 6);
  console.log(evalRPN(["13", "-6", "/"]) === -2);
  console.log(evalRPN(["13", "6", "/"]) === 2);
  console.log(evalRPN(["6", "13", "/"]) === 0);
  console.log(evalRPN(["6", "-13", "/"]) === 0);
  console.log(
    evalRPN([
      "10",
      "6",
      "9",
      "3",
      "+",
      "-11",
      "*",
      "/",
      "*",
      "17",
      "+",
      "5",
      "+",
    ]) === 22
  );

  console.log("All Testing Passed ✅");
})();
