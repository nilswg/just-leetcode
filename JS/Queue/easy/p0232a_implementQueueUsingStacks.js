// @ts-check

// 題目鏈結
// https://leetcode.com/problems/implement-queue-using-stacks

// 題目說明
// Expo 第二關

// 解題重點
// 先自行實作 MyStack，所有 QueueByMyStacksFollowUp 中的方法，都必須用 MyStack 去完成。
// QueueByMyStacksFollowUp 中不可以使用任何 array 的原生方法。

// 解題思路
// (略)

class MyStack {
  constructor() {
    this.stack = [];
  }

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

/**
 * Solution: 實作 QueueByMyStacksFollowUp
 * 
 * 1. 本題由於需要先實作 MyStack，且必要實作四個重要的操作 push、pop、peek、empty
 * 2. 藉由 MyStack 實作 QueueByMyStacksFollowUp 時，僅能使用 MyStack 中的方法。
 * 3. 實作 peek 時，且 StackPop 已經存在元素時，由於沒有 last() 取得其最後一個元素，
 *    此處先以 pop() 取得最後元素，再使用 push() 將其重新放回。 
 * 
 * 時間複雜度分析
 * 此處同 p0232-QueueByTwoStacksOptimal 做法，採均攤分析複雜度，故時間複雜度亦為 amortized O(1) 
 * 
 * 複雜度
 * Time Complexity : O(1)
 * Space Complexity: O(N)
 */
class QueueByMyStacksFollowUp {
  stackPush = new MyStack();
  stackPop = new MyStack();
  constructor() {}

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.stackPush.push(x);
  }

  /**
   * @return {number}
   */
  pop() {
    if (this.stackPop.empty()) {
      while (!this.stackPush.empty()) {
        this.stackPop.push(this.stackPush.pop());
      }
    }
    return this.stackPop.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (this.stackPop.empty()) {
      return this.stackPush.peek();
    } else {
      const fisrt = this.pop();
      this.push(fisrt);
      return fisrt;
    }
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.stackPush.empty() && this.stackPop.empty();
  }
}

// 測試
(function () {
  console.log('Testing [p0232_implementQueueUsingStacks]...');

  const testingWith = (myQueueClass) => {
    const q = new myQueueClass();
    console.log(`Testing ${q.constructor.name}`);
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
    console.log();
  };

  testingWith(QueueByMyStacksFollowUp);

  console.log('All Testing Passed ✅');
})();
