// @ts-check

// 題目鏈結
// https://leetcode.com/problems/valid-palindrome-ii

// 題目說明
// Given a string s, return true if the s can be palindrome after deleting at most one character from it.
//

// Example 1:
// Input: s = "aba"
// Output: true
//

// Example 2:
// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.
//

// Example 3:
// Input: s = "abc"
// Output: false
//

// Constraints:
// 1 <= s.length <= 105
// s consists of lowercase English letters.
//

// 解題重點
// 1. 瞭解雙指針與 recursive。
// 2. 瞭解 p0125_ValidPalindrome，對比此題s內容均為小寫。

// 解題思路
// 1. 本題就是 p0125_ValidPalindrome 的延伸。
// 2. 當遇到不相同的字符時，額外再做一次 validPalindrome，確認能否略過一位字符(l+1或r-1)仍為回文。
// 3. 承2, 可以拆成兩段while來寫，也可僅用一deleted旗標區隔第一次和第二次，使用recursive寫在一起就好。

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1)，發現不相同時，僅額外遞回檢查一次。

var validPalindrome = function (s) {
  const isValid = (l, r, deleted = false) => {
    while (l < r) {
      if (s[l] !== s[r]) {
        if (deleted) return false;
        return isValid(l, r - 1, true) || isValid(l + 1, r, true);
      }
      l += 1;
      r -= 1;
    }
    return true;
  };
  return isValid(0, s.length - 1);
};

// 測試
(function () {
  console.log("Testing [p0680_validPalindromeIi]...");

  console.log(validPalindrome("aba") === true);
  console.log(validPalindrome("abca") === true);
  console.log(validPalindrome("abc") === false);
  console.log(validPalindrome("ebcbbececabbacecbbcbe") === true);

  console.log("All Testing Passed ✅");
})();
