// @ts-check

// 題目鏈結
// https://leetcode.com/problems/backspace-string-compare

// 題目說明
// Given two strings s and t, return true if they are equal when both are
// typed into empty text editors. '#' means a backspace character.
// Note that after backspacing an empty text, the text will continue empty.
//
// ✨ Follow up: Can you solve it in O(n) time and O(1) space?
//
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".
//
// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".
//
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

// 解題重點
// 1. 先試著stack來求出暴力解
// 2. 考慮Follow up: 試著以雙指針來實作出最佳解

// 解題思路
//
// 以暴力解而言，將結果分別求出並存放於 stack1 和 stack2 中，若為'#'則彈出(pop)；反之則推入(push)。
// 最終再依序比較該 stack1 和 stack2 的元素是否完全一致。

// 暴力解, 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var brute = function (s, t) {
  let stk1 = [];
  let stk2 = [];
  for (const c of s) {
    if (c !== '#') stk1.push(c);
    else stk1.pop();
  }
  for (const c of t) {
    if (c !== '#') stk2.push(c);
    else stk2.pop();
  }
  return stk1.join('') === stk2.join('');
};

// 雙指針關鍵在於 backspace 的實作，
// 1. 字串反向檢查並使用 del 統計遇到 '#' 要刪除的次數。若是 '#' 則 del += 1; 反之，則 del -= 1;
// 2. 會持續執行到，最後執行完 backspace 後，將進行比對的 si 位址。
// 3. s,t 每次執行完backspace後，會對 s[i]、t[j] 進行比對，若相同則繼續比對。
// 4. 最終 s,t 會執行到字串為空，即 i < 0 && j < 0，表示s,t 完全相同，故直接返回true。

// 雙指針, 複雜度
// Time Complexity : O(N)
// Space Complexity: O(1) <= 作為最佳解，其不需要額外的儲存空間。

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let i = s.length - 1;
  let j = t.length - 1;

  const backspace = (str, si) => {
    let del = 0;
    while (si >= 0 && (str[si] === '#' || del > 0)) {
      if (str[si] === '#') {
        del += 1;
      } else {
        del -= 1;
      }
      si -= 1;
    }
    return si;
  };

  while (i >= 0 || j >= 0) {
    i = backspace(s, i);
    j = backspace(t, j);
    if (s[i] !== t[j]) {
      return false;
    } else {
      i -= 1;
      j -= 1;
    }
  }

  return true;
};

// 測試
(function () {
  console.log('Testing [backspaceCompare_brute_Solution]...');
  console.log(brute('ab##', 'ad##') === true);
  console.log(brute('ab##', 'c#d#') === true);
  console.log(brute('a#c', 'b') === false);
  console.log(brute('xywrrmp', 'xywrrmu#p') === true);

  console.log('Testing [backspaceCompare_optimal_Solution]...');
  console.log(backspaceCompare('ab##', 'ad##') === true);
  console.log(backspaceCompare('ab##', 'c#d#') === true);
  console.log(backspaceCompare('a#c', 'b') === false);
  console.log(backspaceCompare('xywrrmp', 'xywrrmu#p') === true);

  console.log('All Testing Passed ✅');
})();
