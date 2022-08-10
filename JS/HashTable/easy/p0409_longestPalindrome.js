// @ts-check

// 題目鏈結
// https://leetcode.com/problems/longest-palindrome

// 題目說明
// Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
// Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
//

// Example 1:
// Input: s = "abccccdd"
// Output: 7
// Explanation:
// One longest palindrome that can be built is "dccaccd", whose length is 7.
//

// Example 2:
// Input: s = "a"
// Output: 1
//

// Example 3:
// Input: s = "bb"
// Output: 2
//

// Constraints:
// 1 <= s.length <= 2000
// s consists of lowercase and/or uppercase English letters only.
//

// 解題重點
// 1.瞭解如何使用HashTable
// 2.此題相當單純，s 的順序不重要，不需要考慮subString的問題
// 3.本題出現的字符會區分大小寫，建議使用HashTable；不建議使用固定大小的陣列，因轉換上會比較困難


// 解題思路
// 1.使用HashTable來統計出現的字符數量
// 2.根據統計的結果，求出最大的回文長度
// 3.加總時: (1) 出現次數為偶數時，直接加總；
//          (2) 若為奇數時，則要扣除1再加總；
//          (3) 最後，如果有出現奇數情形，加總要加1。

// Solution :
//
// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let mp = Object.create(null);
  let res = 0;
  let hasOdd = 0;

  for (const c of s) {
    mp[c] = (mp[c] ?? 0) + 1;
  }

  for (const k of Object.keys(mp)) {
    if (mp[k] % 2 === 0) {
      res += mp[k];
    } else {
      res += mp[k] - 1;
      hasOdd = 1;
    }
  }

  res += hasOdd;
  return res;
};

// 測試
(function () {
  console.log('Testing [p0409_longestPalindrome]...');

  console.log(longestPalindrome('a') === 1);
  console.log(longestPalindrome('ab') === 1);
  console.log(longestPalindrome('aba') === 3);
  console.log(longestPalindrome('abca') === 3);
  console.log(longestPalindrome('abdcefa') === 3);
  console.log(
    longestPalindrome(
      'civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth'
    ) === 983
  );
  console.log('All Testing Passed ✅');
})();
