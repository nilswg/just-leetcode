// @ts-check

// 題目鏈結

// 題目說明

// 解題重點

// 解題思路

// 複雜度
// Time Complexity : O(??)
// Space Complexity: O(??)

/**
 *
 * @param {number} key
 * @param {number} val
 * @param {ListNode} prev
 * @param {ListNode} next
 */
function ListNode(key, val, prev = null, next = null) {
  this.key = key;
  this.val = val;
  this.prev = prev;
  this.next = next;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cap = capacity;
  this.mp = new Map();
  this.head = new ListNode(0, 0);
  this.tail = new ListNode(0, 0);
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 1. 透過map來快速查找出節點
  // 2. 把節點放到最前端

  const addToHead = (node) => {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  };

  const has = this.mp.has(key);
  if (has) {
    const node = this.mp.get(key);
    addToHead(node);
    return node.val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {

  //last.prev -> (last) -> tail
  const addToHead = (node) => {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  };

  const removeLast = () => {
    let last = this.tail.prev;
    last.prev.next = this.tail;
    this.tail.prev = last.prev;
    last.prev = null;
    last.next = null;
    return last;
  };

  let node = new ListNode(key, value);

  if (this.mp.size + 1 > this.cap) {
    let last = removeLast();
    this.mp.delete(last.key);
  }

  addToHead(node);
  this.mp.set(key, node);
};

// 測試

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

(function () {
  console.log('Testing p0146_LRUCache...');

  /**
   * Write Some Testing here
   */

  console.log('All Testing Passed ✅');
})();
