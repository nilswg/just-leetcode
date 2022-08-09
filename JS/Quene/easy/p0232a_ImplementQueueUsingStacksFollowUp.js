// @ts-check

// 題目鏈結
// https://leetcode.com/problems/implement-queue-using-stacks/

// 題目說明
// Expo 第二關

// 解題重點
// 先實作 MyStack，所有 MyQueueFollowUp 中的方法，都必須用 MyStack 去完成。
// MyQueueFollowUp 中不可以使用任何 array 的原生方法。

// 解題思路

// 複雜度
// Time Complexity : O(N)
// Space Complexity: O(N)

class MyStack {
  stack = [];
  constructor() {}

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.stack.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    return this.stack.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    return this.stack[0];
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.stack.length === 0;
  }
}

class MyQueueFollowUp {
  stack = new MyStack();
  stackRev = new MyStack();
  constructor() {}

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    while (!this.stackRev.empty()) {
      this.stack.push(this.stackRev.pop());
    }
    this.stack.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    while (!this.stack.empty()) {
      this.stackRev.push(this.stack.pop());
    }
    return this.stackRev.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (!this.stackRev.empty()) {
      let last = this.stackRev.pop();
      this.stackRev.push(last);
      return last;
    } else {
      return this.stack.peek();
    }
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.stack.empty() && this.stackRev.empty();
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
  let q = new MyQueueFollowUp();

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


  q.push(1)
  q.push(2)
  console.log(q.peek()===1)
  console.log(q.pop()===1)
  console.log(q.empty()===false)

  console.log('All Testing Passed ✅');
})();
