// @ts-check
import { ListNode } from '../linkedList.js';
// 題目鏈結
// https://leetcode.com/problems/linked-list-cycle/

// 題目說明
//

// 解題重點
// 1.瞭解鏈結串列(LikedList)的走訪。
// 2.瞭解鏈結串列中的環，並通過"快慢指針"檢驗是否存在環。
// 3.快慢指針出自 Floyd's cycle detection algorithm

// 解題思路
// 1.快慢指針是"鏈結串列"中重要的技術，能幫助找出發生環的地方。
//   (1) 透過兩個不同移動速度的指針, t, h
//   (2) 當鏈結串列中"不存在"環時，則 t 會最先走到盡頭。 (t 或 t.next 為 null)
//   (3) 當鏈結串列中"存在"環時，則 t 與 h 先後到達環圈中，必定 t 將倒追上 h 發生重合。(t === h)

// 暴力解
// 透過額外的儲存空間去檢查，有重複的節點表示有環，返回 true, 反之，返回 false
// 注意，這裡Set中儲存的是節點的記憶體位址 " map.add(head) "；不是節點擁有的值 " map.add(head.val) "
//
// Time Complexity : O(N)
// Space Complexity: O(N)
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycleBrute = function (head) {
  let map = new Set();
  while (head) {
    if (map.has(head)) {
      return true;
    } else {
      map.add(head);
      head = head.next;
    }
  }
  return false;
};

// 快慢指針
//
// Time Complexity : O(N)
// Space Complexity: O(1)

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let t = head; //tortoise 慢指針
  let h = head; //hare 快指針

  // 因為 h 走得比較快，所以檢查 h.next 就好；不寫: t?.next && h?.next?.next
  // h?.next 相當於 h && h.next
  while (h?.next) {
    t = t.next;
    h = h.next.next;
    if (t === h) {
      return true;
    }
  }
  return false;
};

// 測試
(function () {
  console.log('Testing [XXX]...');

  const LinkedList = (arr = [], pos) => {
    let cycleNode;
    let cur = new ListNode(null);
    let res = cur;
    for (let i = 0, n = arr.length; i < n; i++) {
      cur = cur.next = new ListNode(arr[i]);
      if (i === pos) {
        cycleNode = cur;
      }
      if (pos > -1 && i === n - 1) {
        //題目的描述，將最後一個點連到 cycleNode
        cur.next = cycleNode;
      }
    }
    return res.next;
  };

  const testingWith = (cb) => {
    let t1 = LinkedList([3, 2, 0, -4], 1);
    let t2 = LinkedList([1, 2], 0);
    let t3 = LinkedList([1], -1);
    let t4 = LinkedList(
      [
        -21, 10, 17, 8, 4, 26, 5, 35, 33, -7, -16, 27, -12, 6, 29, -12, 5, 9,
        20, 14, 14, 2, 13, -24, 21, 23, -21, 5,
      ],
      -1
    );
    console.log(cb(t1) === true);
    console.log(cb(t2) === true);
    console.log(cb(t3) === false);
    console.log(cb(t4) === false);
  };

  console.log('Testing [hasCycleBrute]...');
  testingWith(hasCycleBrute);

  console.log('Testing [hasCycle]...');
  testingWith(hasCycle);

  console.log('All Testing Passed ✅');
})();
