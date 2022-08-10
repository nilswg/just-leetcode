// @ts-check

// 題目鏈結
// https://leetcode.com/problems/add-binary

// 題目說明
// Given two binary strings a and b, return their sum as a binary string.
//

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"
//

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"
//

// Constraints:
// 1 <= a.length, b.length <= 104
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.
//

// 解題重點
// 1.瞭解數值操作方式
// 2.瞭解位運運算原理

// 解題思路
// 1.對輸入的 a,b 兩位元字串，由後向前取值
// 2.位元運算時，使用二進位的方式加總與計算，使用 carry 存儲進位值
// 3.最後，carry 如果不為0，表示還有進位，要再至最前補1
// 4.儲存計算結果時，由於每次都要從最前端開始放，這裡為了讓效能提升，改先以反向存儲，最後再reverse輸出結果。

// Solution :
//
// 複雜度
// Time Complexity : O(N) // max(m, n)
// Space Complexity: O(N) // max(m, n)

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let res = [];
  let carry = 0;

  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    carry += a[i] !== '1' ? 0 : 1;
    carry += b[j] !== '1' ? 0 : 1;
    res.push(carry % 2);
    carry = Math.floor(carry / 2);
  }
  if (carry !== 0) {
    res.push(carry);
  }
  return res.reverse().join('');
};

// 測試
(function () {
  console.log('Testing [p0067_addBinary]...');

  console.log(addBinary('11', '1') === '100');
  console.log(addBinary('1010', '1011') === '10101');

  console.log('All Testing Passed ✅');
})();
