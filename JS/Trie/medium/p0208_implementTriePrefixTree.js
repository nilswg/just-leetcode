// @ts-check

// 題目鏈結
// https://leetcode.com/problems/implement-trie-prefix-tree

// 題目說明
// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
// Implement the Trie class:
// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
//

// Example 1:
// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]
// Explanation
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True
//

// Constraints:
// 1 <= word.length, prefix.length <= 2000
// word and prefix consist only of lowercase English letters.
// At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.
//

// 解題重點
// 1. 瞭解什麼是 Trie 樹。
// 2. Trie 樹可以視作每層含有 1..26 (a-z)的節點的樹。

// 解題思路
// 1.根據題目描述設計 Trie 類(class)，使其能執行 insert、search、startsWith 等操作
// 2.insert 時，逐字處理:
//   (1) 查找是否已有該字符(token)，沒有就建立新的Trie節點
//   (1) 建立Trie節點時，若是最後一個字符時，須將此節點標記成 'end'，表示完整的字詞。
// 3.空間優化上，巢狀創建dict，而非創建 Trie。(可以比較 trie.md 的原始作法)
// 

/**
 * Solution : 最初版本可參考 trie.md
 *
 * 複雜度
 * Time Complexity : O(logN)
 * Space Complexity: O(26^N)
 */

class Trie {
  constructor() {
    this.dict = new Map();
  }

  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let dict = this.dict;
    for (const ch of word) {
      if (!dict.has(ch)) {
        // 此處優化性能表現，不是巢狀創建 Trie，而是Map對象。
        dict.set(ch, new Map());
      }
      dict = dict.get(ch);
    }
    dict.set("end", true); // 結束旗標，識別是否為一個完整單字。
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search = function (word) {
    let dict = this.dict;
    for (const ch of word) {
      if (!dict.has(ch)) {
        return false;
      }
      dict = dict.get(ch);
    }
    return dict.has("end"); // 結束旗標，識別是否為一個完整單字。
  };

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let dict = this.dict;
    for (const ch of prefix) {
      if (!dict.has(ch)) {
        return false;
      }
      dict = dict.get(ch);
    }
    return true;
  }
}

// 測試
(function () {
  console.log("Testing [p0208_implementTriePrefixTree]...");

  console.log("Testing [MyTrie]");
  const t = new Trie();
  console.log("insert >", t.insert("apple") === undefined);
  console.log("search: [apple] >", t.search("apple") === true);
  console.log("search: [app] >", t.search("app") === false);
  console.log("startsWith: [app] >", t.startsWith("app") === true);
  console.log("insert >", t.insert("app") === undefined);
  console.log("search: [app] >", t.search("app") === true);
  console.log("All Testing Passed ✅");
})();
