// @ts-check

// 題目鏈結
// https://leetcode.com/problems/implement-queue-using-stacks/

// 題目說明
//
// Implement a first in first out (FIFO) queue using only two stacks.
// The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
// Implement the MyQueue class:
//
//   void push(int x) Pushes element x to the back of the queue.
//   int pop() Removes the element from the front of the queue and returns it.
//   int peek() Returns the element at the front of the queue.
//   boolean empty() Returns true if the queue is empty, false otherwise.

// Notes:
//
// You must use only standard operations of a stack, which means only push to top,
// peek/pop from top, size, and is empty operations are valid.
//
// Depending on your language, the stack may not be supported natively.
// You may simulate a stack using a list or deque (double-ended queue)
// as long as you use only a stack's standard operations.

// Constraints:
//
// 1 <= x <= 9
// At most 100 calls will be made to push, pop, peek, and empty.
// All the calls to pop and peek are valid.

// Follow-up:
//
// Can you implement the queue such that each operation is amortized O(1) time complexity?
// In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.

// 解題重點
// 瞭解 Queue 與 Stack 兩者的特性，FIFO vs FILO
// 時間複雜度必須為 amortized O(1) (amortized 平攤的意思，平均下來達到 O(1))

// 解題思路
// 嘗試用兩個Stack去實作 queue；一個順序是正的，負責pop，另一個則是反著，負責push
// 交替使用 pop 或 push 時，都會發生兩個 stack 交換資料的情形。
// 應向面試官詢問使用情境，有效地避免 Worst Case 的方式來實作，
//  (以下作法在反覆使用 pop、push 時會發生 Worst Case)
//  (最佳實作 deQuene 的方式，應該是使用"雙向鏈結串列"與"HashMap")

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

class MyQueue {
  stack = [];
  stackRev = [];
  constructor() {}

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    while (this.stackRev.length > 0) {
      this.stack.push(this.stackRev.pop());
    }
    this.stack.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    while (this.stack.length > 0) {
      this.stackRev.push(this.stack.pop());
    }
    return this.stackRev.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (this.stack.length > 0) {
      return this.stack[0];
    } else {
      return this.stackRev[this.stackRev.length - 1];
    }
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.stack.length === 0 && this.stackRev.length === 0;
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// 測試
(function () {
  console.log('Testing [XXX]...');

  console.log('Test_MyQueue');
  let q = new MyQueue();

  q.push(0);
  console.log(!q.empty());

  q.push(1);
  q.push(2);
  console.log(q.pop() === 0);
  console.log(q.pop() === 1);
  console.log(q.pop() === 2);
  console.log(q.empty());

  q.push(3);
  console.log(q.pop() === 3);
  console.log(q.empty());

  q.push(1);
  q.push(2);
  console.log(q.peek() === 1);
  console.log(q.pop() === 1);
  console.log(q.empty() === false);

  console.log('All Testing Passed ✅');
})();
