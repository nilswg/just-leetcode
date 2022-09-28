// @ts-check

import { Heap } from "../heap.js";

// 題目鏈結
// https://leetcode.com/problems/reorganize-string

// 題目說明
// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
// Return any possible rearrangement of s or return "" if not possible.
//

// Example 1:
// Input: s = "aab"
// Output: "aba"
//

// Example 2:
// Input: s = "aaab"
// Output: ""
//

// Constraints:
// 1 <= s.length <= 500
// s consists of lowercase English letters.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : Use MaxHeap
 *
 * 複雜度
 * Time Complexity : O(??)
 * Space Complexity: O(??)
 *
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
  const cnt = new Map();

  let maxCnt = -1;
  for (let i = 0, n = s.length; i < n; i++) {
    const cur = s[i];
    const num = (cnt.get(cur) ?? 0) + 1;
    cnt.set(cur, num);
    if (num > maxCnt) {
      maxCnt = num;
    }
  }

  // 偶數時 > n/2; 奇數時 > n+1/2，所以此處取ceil
  if (maxCnt > Math.ceil(s.length / 2)) {
    return '';
  }

  // 重新排列，題旨要求，相同字母不可相鄰
  const maxHeap = new Heap((a,b)=>(a[1] > b[1]));
  cnt.forEach((cnt, ch) => {
    maxHeap.push([ch, cnt]);
  });
  // console.log(maxHeap.heap);

  const queue = [];
  let res = '';
  let i = 0;
  while (!maxHeap.isEmpty() || queue.length > 0) {
    i += 1;
    if (!maxHeap.isEmpty()) {
      const [ch, cnt] = maxHeap.pop();
      const newCnt = cnt - 1;
      if (newCnt > 0) {
        queue.push([[ch, newCnt], i + 1]);
      }
      res += ch;
    }
    if (queue.length > 0 && i >= queue[0][1]) {
      maxHeap.push(queue.shift()[0]);
    }
  }

  return res;
};

// 測試
(function () {
  console.log('Testing [p0767_reorganizeString]...');

  // 檢查是否有任何相鄰元素為相同
  const noAnySameAdjacents = (s) => {
    let pre = s[0];
    for (let i = 1, n = s.length; i < n; i++) {
      if (pre === s[i]) return false;
      else pre = s[i];
    }
    return true;
  };

  // 檢查是否所有元素為同義詞
  const isAnagram = (s1, s2) => {
    if (!s2.length) return true; // s2 空字串時，返回true
    if (s1.length !== s2.length) return false;
    let cnt = new Array(26).fill(0);
    for (let i = 0, n = s1.length; i < n; i++) {
      cnt[s1.charCodeAt(i) - 97] += 1;
      cnt[s2.charCodeAt(i) - 97] -= 1;
    }
    return Math.max(...cnt) === 0;
  };

  const isValid = (s1, s2) => isAnagram(s1, s2) && noAnySameAdjacents(s2);

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(isValid('abbabbaaab', cb('abbabbaaab')));
    console.log(isValid('acacacbcbcbcc', cb('acacacbcbcbcc')));
    console.log(isValid('cacacacbcbccb', cb('cacacacbcbccb')));
    console.log(isValid('cacacacbcbcb', cb('cacacacbcbcb')));
    console.log(isValid('accaabbbcccc', cb('accaabbbcccc')));
    console.log(isValid('bfrbs', cb('bfrbs')));
    console.log(isValid('eqmeyggvp', cb('eqmeyggvp')));
    console.log(isValid('accaabbbcccccc', cb('accaabbbcccccc')));
  };

  testingWith(reorganizeString);

  console.log('All Testing Passed ✅');
})();
