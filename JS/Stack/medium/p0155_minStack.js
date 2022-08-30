// @ts-check

// 題目鏈結
// https://leetcode.com/problems/min-stack

// 題目說明
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// Implement the MinStack class:
// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
//

// Example 1:
// Input
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]
// Output
// [null,null,null,null,-3,null,0,-2]
// Explanation
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); // return -3
// minStack.pop();
// minStack.top();    // return 0
// minStack.getMin(); // return -2
//

// Constraints:
// -2³¹ <= val <= 2³¹ - 1
// Methods pop, top and getMin operations will always be called on non-empty stacks.
// At most 3 * 10⁴ calls will be made to push, pop, top, and getMin.
//

// 解題重點
// 1.瞭解stack(棧)的基本操作，並能使用單向鏈結串列去實作stack。
// 2.重新設計儲存於 stack 中的元素(Node)，使其完成題目要求

// 解題思路
// 1.Stack中的元素Node，除了當前值以外，另額外儲存當前最小值。
// 2.直接使用stack或以鏈結串鏈去實作該儲存結構，並對外暴露操作該結構體的方法。

/**
 * Solution : 重新設計stack中的元素 Node, 使其同時儲存當前值(val)與最小值(min)。
 *
 * 該做法其實運用到"輔助棧"的概念，即透過額外的stack空間去儲存該資訊，配合主要的stack，同步移入與移出元素。
 * 而該作法，只是將這份額外的stack空間併入進Node之中，其概念上是完全相同的。
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */
class MinStackPairNode {
  constructor() {
    this.stack = [];
  }
  createNode(val, min) {
    return { val, min };
  }
  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    const min = this.stack.length > 0 ? this.getMin() : Infinity;
    const node = this.createNode(val, Math.min(min, val));
    this.stack.push(node);
  }
  /**
   * @return {void}
   */
  pop() {
    return this.stack.pop().val;
  }
  /**
   * @return {number}
   */
  top() {
    return this.stack[this.stack.length - 1].val;
  }
  /**
   * @return {number}
   */
  getMin() {
    return this.stack[this.stack.length - 1].min;
  }
}

/**
 * Solution : 使用單向鏈結串列(Single Listed List)
 * 
 * 1. 使用單向鏈結串列的節點來實作stack。
 * 2. 在單向鏈結的節點中，多放入額外屬性min，去紀錄當前的最小值。
 * 3. 無論移入或移出元素都應從頭端，其方向應與指標(next)指向相反。
 *    因為next是幫助在移出元素後，能重新指向下一個元素，例如:
 *
 *  init:     (null)
 *             ^head
 *
 *  add (-3): (-3)->(null)
 *             ^head
 *
 *  add (-2): (-2)->(-3)->(null)
 *             ^head
 *
 *  pop ()  : (-3)->(null),  return -2  // -2 移除後，重新指向下一個元素 -3
 *             ^head
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 */

class MinListNode {
  constructor(val, min, next = null) {
    this.val = val;
    this.min = min;
    this.next = next;
  }
}

class MinStackListNode {
  constructor() {
    //實作空點head，最小值為 Infinity
    this.head = this.createNode(null, Infinity);
  }
  createNode(val, min, next = null) {
    return { val, min, next };
  }
  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    const min = this.getMin();
    const node = this.createNode(val, Math.min(min, val), this.head);
    this.head = node;
  }
  /**
   * @return {void}
   */
  pop() {
    const pre = this.head;
    this.head = this.head.next;
    return pre.val;
  }
  /**
   * @return {number}
   */
  top() {
    return this.head.val;
  }
  /**
   * @return {number}
   */
  getMin() {
    return this.head.min;
  }
}

// 測試
(function () {
  console.log("Testing [p0155_minStack]...");

  const testingWith = (classMinStack, todos, args, expects) => {
    console.log(`Testing [${classMinStack.name}]`);

    console.assert(
      todos.length === args.length && todos.length === expects.length,
      "todos、args、expects 長度不相等"
    );

    const minStack = new classMinStack();
    console.log(`${classMinStack.name} 實例化成功`);

    for (let i = 1, n = todos.length; i < n; i++) {
      const todo = todos[i];
      const arg = args[i];
      const expect = expects[i];
      console.log(
        `use ${todo}, val:${arg} : `,
        minStack[todo](...arg) === expect
      );
    }
  };

  testingWith(
    MinStackPairNode,
    ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
    [[], [-2], [0], [-3], [], [], [], []],
    [[], undefined, undefined, undefined, -3, -3, 0, -2]
  );

  testingWith(
    MinStackListNode,
    ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
    [[], [-2], [0], [-3], [], [], [], []],
    [[], undefined, undefined, undefined, -3, -3, 0, -2]
  );

  console.log("All Testing Passed ✅");
})();
