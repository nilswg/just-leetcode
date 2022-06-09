// @ts-check

// 題目鏈結
// https://leetcode.com/problems/lru-cache/

// 題目說明
//
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
// The functions get and put must each run in O(1) average time complexity.
//
// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]
//
// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

// 解題重點
// 1. 瞭解HashMap
// 2. 瞭解雙頭串列(Doubly Linked List)，
// 3. 須將 1,2 合併使用，使其滿足實作 get 與 put 時間複雜度O(1)。
// 4. 當put資料時，將資料放到串列"尾端"表示"最近使用過"；當超出上限時，對當前於"頭端"的節點(ListNode)直接移除
// 5. 當get資料時，返回節點的值，將資料放到串列"尾端"表示"最近使用過"
// 6. 無論是put、get，操作時，都會將節點重新放至"尾端"；相對地，少用到的節點被推擠至"頭端"，成為被移除的對象。

// 解題思路
//
// before:                          move:              after:
//
// (head)<=>(1)<=>(tail)           put: (2)            (head)<=>(1)<=>(2)<=>(tail)  // 新節點直接放入至尾端。
//                                 (addTail (2))
//
// (head)<=>(1)<=>(2)<=>(tail)     put: (3)            (head)<=>(1)<=>(2)<=>(3)<=>(tail)
//                                 (remove (head:1))   (head)<=>(2)<=>(3)<=>(tail)  // 因為超出上限，還要從頭端移除一個節點。
//
// (head)<=>(2)<=>(3)<=>(tail)     get: (2)
//                                 (remove  (2))       (head)<=>(3)<=>(tail)        // (2) 被移出
//                                 (addTail (2))       (head)<=>(3)<=>(2)<=>(tail)  // (2) 被放入至尾端。
//                                                                                  // 已存在的節點，先移出，再放入至尾端。
//

// 複雜度
// Time Complexity : O(1)
// Space Complexity: O(N)

/**
 * @param {number} key
 * @param {number} val
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.cap = capacity;
    this.mp = new Map();
    this.head = this.getNode(0, 0);
    this.tail = this.getNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  getNode(key, val) {
    return { key, val, prev: null, next: null };
  }
  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (this.mp.has(key)) {
      let node = this.mp.get(key);
      if (node !== this.tail) {
        this._removeNode(node);
        this._addToTail(node);
      }
      return node.val;
    } else {
      return -1;
    }
  }
  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.mp.has(key)) {
      let node = this.mp.get(key);
      node.val = value;
      if (node !== this.tail) {
        this._removeNode(node);
        this._addToTail(node);
      }
      return null;
    } else {
      let node = this.getNode(key, value);
      this._addToTail(node);
      this.mp.set(key, node);
      if (this.mp.size > this.cap) {
        this.mp.delete(this.head.next.key);
        this._removeHead();
      }
      return null;
    }
  }
  _addToTail(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
  _removeHead() {
    let first = this.head.next;
    first.next.prev = this.head;
    this.head.next = first.next;
    first.next = null;
    first.prev = null;
    first = null;
  }
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = null;
    node.prev = null;
    node = null;
  }
}

// 測試
(function () {
  console.log('Testing p0146_LRUCache...');

  /**
   *
   * @param {string[]} inputs
   */
  function TestLRUCache(inputs, params) {
    let lru;
    let res = [];

    inputs.forEach((input, i) => {
      switch (input) {
        case 'LRUCache':
          lru = new LRUCache(params[i][0]);
          res.push(null);
          break;
        case 'put':
          let put = lru.put(params[i][0], params[i][1]);
          res.push(put);
          break;
        case 'get':
          let get = lru.get(params[i][0], params[i][1]);
          res.push(get);
          break;
      }
    });

    return res;
  }

  let isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  console.log(
    isEqual(
      TestLRUCache(
        ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get'],
        [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3]]
      ),
      [null, null, null, 1, null, -1, null, -1, 3]
    )
  );

  console.log(
    isEqual(
      TestLRUCache(
        ['LRUCache', 'put', 'put', 'get', 'put', 'put', 'get'],
        [[2], [2, 1], [2, 2], [2], [1, 1], [4, 1], [2]]
      ),
      [null, null, null, 2, null, null, -1]
    )
  );

  console.log('All Testing Passed ✅');
})();
