// @ts-check

// 題目鏈結
// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses

// 題目說明
// Given a string s of '(' , ')' and lowercase English characters.
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.
// Formally, a parentheses string is valid if and only if:
// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
//

// Example 1:
// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
//

// Example 2:
// Input: s = "a)b(c)d"
// Output: "ab(c)d"
//

// Example 3:
// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.
//

// Constraints:
// 1 <= s.length <= 10⁵
// s[i] is either'(' , ')', or lowercase English letter.
//

// 解題重點
// 1. 瞭解Stack特性。

// 解題思路
// (略)


/**
 * Solution : 使用Stack
 *
 * 遇到 '('，儲存到stack中
 * 遇到 ')'，若stack中有 '('，相互抵銷
 * 遇到 ')' 若stack中沒有 '(' 需要直接刪除
 * 最後檢查stack中剩餘的'('，都要刪除
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  const res = s.split('');
  const stack = [];
  for (let i = 0, n = s.length; i < n; i++) {
    const ch = res[i];
    if (ch === '(') {
      stack.push(i);
    } else if (ch === ')') {
      if (stack.length > 0) stack.pop();
      else res[i] = ''; //多餘的')'直接刪掉
    }
  }
  // 透過stack將多餘的'('去掉
  while (stack.length > 0) {
    res[stack.pop()] = '';
  }
  return res.join('');
};

// 測試
(function () {
  console.log('Testing [p1249_minimumRemoveToMakeValidParentheses]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb('lee(t(c)o)de)') === 'lee(t(c)o)de');
    console.log(cb('a)b(c)d') === 'ab(c)d');
    console.log(cb('))((') === '');
    console.log(cb(')a)b(ddd(') === 'abddd');
  };
  testingWith(minRemoveToMakeValid);

  console.log('All Testing Passed ✅');
})();
