// @ts-check
import { isLinkedListEqual, LinkedList, ListNode } from '../index.js';

// 題目鏈結
// https://leetcode.com/problems/merge-two-sorted-lists/

// 題目說明
// Merge the two lists in a one sorted list.
// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]

// 解題重點
// 1. 用最直覺的答案就是優化後的最接解
// 2. 瞭解如何使用遞迴來解題(不是最佳解)

// 解題思路

// 複雜度 (直覺解)
//
// Time Complexity : O(M+N) => O(N)
// Space Complexity: O(1)
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let head = new ListNode(0);
  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      cur = cur.next;
      l1 = l1.next;
    } else {
      cur.next = l2;
      cur = cur.next;
      l2 = l2.next;
    }
  }
  cur.next = l1 ? l1 : l2;
  return head.next;
};

/**
 * 複雜度 (遞迴解)
 *
 * 時間複雜度: O(M+N) => O(N)
 * 空間複雜度: O(min(N, M)) => O(N)
 *  (每層都會從l1或l2取出一個節點，所以會往下作到第 Math.min(N, M) 層)
 *
 * e.g : l1: [1,3,5,7] ; l2: [2,4]
 *
 * T=0,  merge([1,3,5,7], [2,4])
 *  =>   [1] + merge([3,5,7], [2,4])
 *
 * T=1,  merge([3,5,7], [2,4])
 *  =>   [2] + merge([3,5,7], [4])
 *
 * T=2,  merge([3,5,7], [4])
 *  =>   [3] + merge([5,7], [4])
 *
 * T=3,  merge([5,7], [4])
 *  =>   [4] + merge([5,7], [])
 *
 * =============== Divide =================
 *
 * T=4,  merge([5,7], [])
 *  =>   [5,7] (因為l2為空；返回l1)
 *
 * =============== Merge  =================
 *
 * T='3,  merge([5,7], [])
 *  =>    [4,5,7]
 *
 * T='2,  merge([5,7], [])
 *  =>    [3,4,5,7]
 *
 * T='1,  merge([5,7], [])
 *  =>    [2,3,4,5,7]
 *
 * T='0,  merge([5,7], [])
 *  =>    [1,2,3,4,5,7]
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists_recursive = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

// 測試
(function () {
  console.log('Testing [mergeTwoLists]...');

  console.log(
    isLinkedListEqual(
      mergeTwoLists(LinkedList([1, 3, 5, 7]), LinkedList([2, 4, 6])),
      LinkedList([1, 2, 3, 4, 5, 6, 7])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists(LinkedList([1, 2, 4]), LinkedList([1, 3, 4])),
      LinkedList([1, 1, 2, 3, 4, 4])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists(LinkedList([]), LinkedList([])),
      LinkedList([])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists(LinkedList([]), LinkedList([0])),
      LinkedList([0])
    )
  );

  console.log('Testing [mergeTwoLists_recursive]...');
  console.log(
    isLinkedListEqual(
      mergeTwoLists_recursive(LinkedList([1, 3, 5, 7]), LinkedList([2, 4, 6])),
      LinkedList([1, 2, 3, 4, 5, 6, 7])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists_recursive(LinkedList([1, 2, 4]), LinkedList([1, 3, 4])),
      LinkedList([1, 1, 2, 3, 4, 4])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists_recursive(LinkedList([]), LinkedList([])),
      LinkedList([])
    )
  );
  console.log(
    isLinkedListEqual(
      mergeTwoLists_recursive(LinkedList([]), LinkedList([0])),
      LinkedList([0])
    )
  );

  console.log('All Testing Passed ✅');
})();
