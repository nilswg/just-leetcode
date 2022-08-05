// @ts-check

// 題目鏈結
// https://leetcode.com/problems/valid-parentheses/

// 題目說明
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
//   1. Open brackets must be closed by the same type of brackets.
//   2. Open brackets must be closed in the correct order.
//
// Input: s = "()"
// Output: true
//
// Input: s = "(]"
// Output: false

// 解題重點
// 瞭解 stack的特性，FILO 先進後出。

// 解題思路
// 1. 遇到左側元素時，就推進stack中保存，遇到右側元素並類型相配對 (e.g: ()、[]、{})時，就將Stack中的左括號pop出來。
// 2. 若最後 stack 為空，便為有效(true)；反之無效(false)。

// [註] 各種括號的英文
// |Type | Name                             |
// |-----|----------------------------------|
// | ( ) | Parentheses or Round Brackets    |
// | [ ] | Square Brackets or Box Brackets  |
// | { } | Braces or Curly Brackets         |
// | < > | Angle Brackets or Chevrons       |

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];

  const mp = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const c of s) {
    if (!mp[c]) {
      stack.push(c);
      continue;
    }

    if (stack.length > 0 && stack.pop() === mp[c]) {
      continue;
    } else {
      return false;
    }
  }

  return !stack.length;
};

// 測試
(function () {
  console.log('Testing [p0003_ValidParentheses]...');

  console.log(isValid('()') === true);
  console.log(isValid('()[]{}') === true);
  console.log(isValid('(]') === false);
  console.log(isValid('[') === false);

  console.log('All Testing Passed ✅');
})();