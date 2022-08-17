// @ts-check

// 題目鏈結
// https://leetcode.com/problems/valid-palindrome/

// 題目說明
// 125. Valid Palindrome
//
// A phrase is a palindrome if, after converting all uppercase letters into
// lowercase letters and removing all non-alphanumeric characters, it reads the same
// forward and backward. Alphanumeric characters include letters and numbers.
//
// Given a string s, return true if it is a palindrome, or false otherwise.

// 解題重點
/*
 * e.g :
 *       "A man, a plan, a canal: Panama 0123P ^_^"
 *    -> "AmanaplanacanalPanama0123P"
 *
 *    \W 表示 Not Word； [\W] 同等於 [^A-Za-z0-9_]
 *
 *    .replace(/[\W]/g, '')
 *    .replace(/[^\w]/g, '')
 *
 *    但是這題連 '_' 都要去掉
 *
 *    .replace(/[^A-Za-z0-9]/g, '')
 */

// 解題思路

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)

var isPalindrome = function (s) {
  s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  let l = 0;
  let r = s.length - 1;

  while (l < r) {
    if (s[l] !== s[r]) {
      return false;
    }
    l += 1;
    r -= 1;
  }
  return true;
};

// 測試
(function () {
  console.log('Testing [isPalindrome]...');

  console.log(isPalindrome('') === true);
  console.log(isPalindrome('A man, a plan, a canal: Panama') === true);
  console.log(isPalindrome('race a car') === false);
  console.log(isPalindrome(' ') === true);
  console.log(isPalindrome('aa') === true);
  console.log(isPalindrome('abA') === true);
  console.log(isPalindrome('0P') === false);
  /**
   * Write Some Testing here
   */

  console.log('All Testing Passed ✅');
})();
