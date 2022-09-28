// @ts-check

// 題目鏈結
// https://leetcode.com/problems/longest-palindromic-substring

// 題目說明
// Given a string s, return the longest palindromic substring in s.
//

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
//

// Example 2:
// Input: s = "cbbd"
// Output: "bb"
//

// Constraints:
// 1 <= s.length <= 1000
// s consist of only digits and English letters.
//

// 解題重點
// 1. 瞭解動態規劃。

// 解題思路
// 1. 以字串 s 中的每個 s[i]，個別為以 i 為中心向外尋找所能到達的最大回文長度。 
// 2. 中心向外時，須考量中心區段為奇數[i,i]或偶數[i-1,i]的情況。

/**
 * Solution : 中心擴散法，窮舉每個位址 i，所能實現的最大回文長度。 
 * 
 * 對於字串中每個位址 i 各別分析，其所能達到的最大回文長度，考慮兩種情況
 * (1) i 為 中心 : 當個 i 作為中心時，其最大回文長度必為奇數。
 * (2) i 與 i-1 中心 : 另一種可能，是讓 i 與前一位 i-1 共同構成中心，其最大回文長度必為偶數。
 * (3) 綜上兩(1)、(2)去求出各別所能到達的長度，分別與當前 maxLen 去比較，若超過其，則更新當前 l,r的位址。
 * 
 * 最後 l, r 為該字串s所能到達的最大回文長度的區間，故返回 s.slice(l, r+1) 即是答案。  
 * 
 * [註] 此作法亦能用動態規劃的概念來說明，因為中心向外擴散時發生狀態的轉移。
 *      e.g :  e - a - b - c - b - a - d
 *                   <-i       j->        
 *      若區間 dp[i,j] 為回文段，則 dp[i-1, j+1] 才有可能夠成回文；反之，dp[i-1, j+1] 則一定不是。
 * 
 *
 * 複雜度
 * Time Complexity : O(n²)
 * Space Complexity: O(1)
 *
 * @param {string} s
 * @return {string}
 */
 var longestPalindromeBrute = function(s) {
  let n = s.length;
  if (n === 1) return s;

  const getPairs = (l, r) => {
    if (s[l] !== s[r]) return [r, r];
    while (0 <= l - 1 && r + 1 < n && s[l - 1] === s[r + 1]) {
      l -= 1;
      r += 1;
    }
    return [l, r];
  };

  let maxLen = 1;
  let l = 0;
  let r = 0;

  // T: O(n)
  for (let i = 1; i < n; i++) {
    
    // T: O(n)
    let [l1, r1] = getPairs(i, i);
    let len1 = r1 - l1 + 1;
    if (len1 > maxLen) {
      maxLen = len1;
      l = l1;
      r = r1;
    }

    // T: O(n)
    let [l2, r2] = getPairs(i - 1, i);
    let len2 = r2 - l2 + 1;
    if (len2 > maxLen) {
      maxLen = len2;
      l = l2;
      r = r2;
    }
  }

  return s.slice(l, r + 1);
};

// 測試
(function () {
  console.log('Testing [p0005_longestPalindromicSubstring]...');

  const testingWith = (cb) => {
    console.log(`Testing ${cb.name}`);
    console.log(cb('babad') === 'bab');
    console.log(cb('cbbd') === 'bb');
    console.log(cb('a') === 'a');
    console.log(cb('aa') === 'aa');
    console.log(cb('aaa') === 'aaa');
    console.log(cb('ab') === 'a');
    console.log(cb('aba') === 'aba');
    console.log(cb('babadxybabbab') === 'babbab');
  };

  testingWith(longestPalindromeBrute);

  console.log('All Testing Passed ✅');
})();
