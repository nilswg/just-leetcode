
// @ts-check

// 題目鏈結
// https://leetcode.com/problems/implement-queue-using-stacks

// 題目說明
// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
// Implement the MyQueue class:
// void push(int x) Pushes element x to the back of the queue.
// int pop() Removes the element from the front of the queue and returns it.
// int peek() Returns the element at the front of the queue.
// boolean empty() Returns true if the queue is empty, false otherwise.
// Notes:
// You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
// 

// Example 1:
// Input
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 1, 1, false]
// Explanation
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false
// 

// Constraints:
// 1 <= x <= 9
// At most 100 calls will be made to push, pop, peek, and empty.
// All the calls to pop and peek are valid.
// 

// Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.
// 

// 解題重點
// 1.瞭解 Queue 與 Stack 兩者的特性，FIFO vs FILO
// 2.時間複雜度必須為 amortized O(1) (amortized 平攤的意思，平均下來達到 O(1))

// 解題思路
// 1.嘗試用兩個Stack去實作 queue。一個順序是正的，負責pop；另一個則是反著，負責push。

/**
 * Solution 使用兩個Stack實作Queue
 *
 * 嘗試用兩個Stack去實作 queue。一個順序是正的，負責pop；另一個則是反著，負責push。
 *
 * 時間複雜度分析
 * 交替使用 pop 或 push 時，發生 Worst Case，時間複雜度為 O(N)
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */
 class QueueByTwoStacks {
  constructor() {
    this.stack = [];
    this.stackRev = [];
  }

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
 * Solution: 優化 QueueByTwoStacks
 *
 * 針對先前的做法的最糟狀況進行優化。
 *
 * -> push 1,2,3
 *
 *   stackPush            stackPop
 *   -----------          -----------
 *   | 1, 2, 3            |
 *   -----------          -----------
 *
 * -> pop
 *
 *   當 pop() 時，檢查 stackPop 是否尚有元素? 沒有就把元素從 stackPush 裝填進 stackPop。
 *   直接 stackPop.pop();
 *
 *   stackPush            stackPop
 *   -----------    存入  -----------
 *   |             --->   | 3, 2         pop() -> 1
 *   -----------          -----------
 *
 * ->
 * 
 * 時間複雜度分析
 * (1) 採用最糟狀況分析
 * - push() : O(1)
 * - pop()  : O(N) (可能觸發搬動)
 * 
 * (2) 採用均攤分析(Amortized Analysis)。
 *  a. 分析時間複雜度，是以多次執行後的總體時間，再去除以總共執行操作次數N後，所得到的均攤時間。
 *  b. 重新估算 Pop 的時間總成本 TimeCost(push) + TimeCost(pop) + TimeCost(move)；
 *     TimeCost(push) : O(1) 
 *     TimeCost(pop)  : O(1) 
 *     TimeCost(move) : nMove * O(1) (nMove執行move的次數，每次move的時間複雜度為O(1)，且 nMove <= N )
 *  c. TimeCost(total) = O(1) + O(1) + O(N) ≒ O(N)
 * 
 * 最終整體的時間複雜度，因能均攤到 N 次 => O(N)/N ≒ O(1)
 *
 * 複雜度
 * Time Complexity : O(1)
 * Space Complexity: O(N)
 */
class QueueByTwoStacksOptimal {
  constructor() {
    this.stackPush = [];
    this.stackPop = [];
  }

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
    if (!this.stackPop.length) {
      while (this.stackPush.length > 0) {
        this.stackPop.push(this.stackPush.pop());
      }
    }
    return this.stackPop.pop();
  }

  /**
   * @return {number}
   */
  peek() {
    if (!this.stackPop.length) {
      return this.stackPush[0];
    } else {
      return this.stackPop.at(-1); // 最後一項
    }
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.stackPush.length === 0 && this.stackPop.length === 0;
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

  testingWith(QueueByTwoStacks);
  testingWith(QueueByTwoStacksOptimal);

  console.log('All Testing Passed ✅');
})();

  