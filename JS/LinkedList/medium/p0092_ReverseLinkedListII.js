// @ts-check
import { LinkedList, ListNode, isLinkedListEqual } from '../linkedList.js';

// 題目鏈結

// 題目說明
// Given the head of a singly linked list and two integers left and right where left <= right,
// reverse the nodes of the list from position left to position right, and return the reversed list.
//
// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]
//
// Input: head = [5], left = 1, right = 1
// Output: [5]
//
// Input: head = [3, 5], left = 1, right = 2
// Output: [5, 3]

// 解題重點

// 解題思路

// 複雜度
// Time Complexity : O(??)
// Space Complexity: O(??)

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const reverse = function (tail, end) {
    let hd = null;
    while (tail !== end) {
      let tmp = tail;
      tail = tmp.next;
      tmp.next = hd;
      hd = tmp;
    }
    return [hd, tail];
  };

  //a 停在left位置前一格。
  let a = new ListNode(null, head);
  for (let i = 1; i <= left - 1; i++) {
    if (!a.next) {
      return head;
    }
    a = a.next;
  }

  //b 剛好停在 right位置
  let b = new ListNode(null, head);
  for (let i = 1; i <= right; i++) {
    if (!b.next) {
      return head;
    }
    b = b.next;
  }

  /**
   * a.next 反轉前的頭節點位置
   * b.next 則是反轉後，尾節點(tail)將移動到的目標位置，
   */
  let [hd, tail] = reverse(a.next, b.next);
  // console.log('\nhd:>', hd, '\ntail:>', tail, '\na:>', a);

  a.next.next = tail;
  a.next = hd;

  return a.val !== null ? head : a.next;
};

// 測試
(function () {
  console.log('Testing [XXX]...');

  console.log(
    isLinkedListEqual(
      reverseBetween(LinkedList([1, 2, 3, 4, 5]), 2, 4),
      LinkedList([1, 4, 3, 2, 5])
    )
  );
  console.log(
    isLinkedListEqual(reverseBetween(LinkedList([5]), 1, 1), LinkedList([5]))
  );
  console.log(
    isLinkedListEqual(
      reverseBetween(LinkedList([3, 5]), 1, 2),
      LinkedList([5, 3])
    )
  );

  // console.log(reverseBetween(LinkedList([3, 5]), 1, 2))

  console.log('All Testing Passed ✅');
})();
