// @ts-check

// 題目鏈結
// https://leetcode.com/problems/ransom-note/

// 題目說明
// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using
// the letters from magazine and false otherwise.
//
// Each letter in magazine can only be used once in ransomNote.
//
// Example 1:
//
// Input: ransomNote = "a", magazine = "b"
// Output: false
//
//
// Example 2:
//
// Input: ransomNote = "aa", magazine = "ab"
// Output: false
//
//
// Example 3:
//
// Input: ransomNote = "aa", magazine = "aba"
// Output: true


// 解題重點
// 1.瞭解HashTable

// 解題思路
// 1.先統計 magazine 中的各別出現的文字出現數； magazine.length > ransomNote.length
// 2.再與 ransomNote 中的文字扣除，若出現小於0的情形，則表示 ransomNote 無法透過 magazine 構成(false) ； 反之，表示可以(true)。

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N) // 此N為magazine的長度。

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
 var canConstruct = function(ransomNote, magazine) {
  if (magazine.length < ransomNote.length) return false;
  let mp = Array(26).fill(0);
  let base = 'a'.charCodeAt(0);

  for (let i=0, n=magazine.length; i<n; i++) {
      const char = magazine.charCodeAt(i) - base;
      mp[char] += 1;
  }

  for (let i=0, n=ransomNote.length; i<n; i++) {
      const char = ransomNote.charCodeAt(i) - base;
      mp[char] -= 1;

      if (mp[char] < 0) {
          return false
      }
  }
  return true;
};

// 測試
(function () {
  console.log('Testing [p0383_RansomNote]...');

  console.log(canConstruct('a', 'b')===false)
  console.log(canConstruct('aa', 'ab')===false)
  console.log(canConstruct('aa', 'aba')===true)

  console.log('All Testing Passed ✅');
})();
