# Trie

Trie 又稱`前綴樹`、`字典樹`或`單詞查找樹`。
二元樹表示每個節點均有 [0..2] 的子節點，而 Trie 樹是基於 26 的英文個字符來儲存單詞，
換句話說，即每個節點下均有[0..25]個子節點。範例如下:

如何儲存與表示 [them, zip, team, the, app, that] 這些單詞

```js
/**
 * 前綴樹的資料結構
 *
 *                    Root
 *                /    |    \
 *               /     |      \
 *              a      t       z
 *              |    /  \      |
 *              p   e    h     i
 *              |   |    / \   |
 *              p   a   a   e  p
 *                  |   |   |
 *                  m   t   m
 *
 */
class Trie {
  constructor(val, children) {
    this.val = val ?? false;
    this.children = children ?? new Array(26).fill(null);
  }
}
```

## 完整 Trie 與常見功能

```js
class Trie {
  constructor() {
    this.children = Object.create(null);
    this.end = false; // 這是指是否能是為一個完整單字。
  }

  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let curr = this;
    for (const ch of word) {
      if (!curr.children[ch]) {
        curr.children[ch] = new Trie();
      }
      curr = curr.children[ch];
    }
    curr.end = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search = function (word) {
    let curr = this;
    for (const ch of word) {
      if (!curr.children[ch]) {
        return false;
      }
      curr = curr.children[ch];
    }
    return curr.end;
  };

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let curr = this;
    for (const ch of prefix) {
      if (!curr.children[ch]) {
        return false;
      }
      curr = curr.children[ch];
    }
    return true;
  }
}

const root = Trie();
root.insert("team");
```
