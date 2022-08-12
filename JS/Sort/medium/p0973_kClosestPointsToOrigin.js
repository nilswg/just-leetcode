// @ts-check

import { isArrayEqual } from '../sort.js';

// 題目鏈結
// https://leetcode.com/problems/k-closest-points-to-origin

// 題目說明
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
//

// Example 1:
// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
//

// Example 2:
// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.
//

// Constraints:
// 1 <= k <= points.length <= 10^4
// -10^4 < xi, yi < 10^4
//

// 解題重點
// 1.瞭解 Sort
// 2.思考 quickSelect 來優化空間複雜度

// 解題思路
// 1.先用JS sort 方法，以MergeSort 來實作暴力解。
// 2.再思考 quickSelect 來優化空間複雜度。

// Solution : 暴力解
//
// JS中的Sort方法實為 MergeSort，所以時間複雜度為 O(NlogN)、空間複雜度 O(logN)
//
// 複雜度
// Time Complexity : O(NlogN)
// Space Complexity: O(logN)

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosestBrute = function (points, k) {
  points.sort(([a1, a2], [b1, b2]) => a1 * a1 + a2 * a2 - (b1 * b1 + b2 * b2));
  return points.slice(0, k);
};

// Solution : 使用 QuickSelect Sort
//
// 1. 以
//
// 複雜度
// Time Complexity : O(NlogN)
// Space Complexity: O(1)

// Runtime: 172 ms, faster than 99.82% of JavaScript online submissions for K Closest Points to Origin.
// Memory Usage: 51.8 MB, less than 98.75% of JavaScript online submissions for K Closest Points to Origin.
/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {

  // 根據題目設定檢查，能提升性能。
  if (points.length <= k) {
    return points;
  }

  // 取到原點(0,0)的長度
  const dist = (i) => {
    const [a, b] = points[i];
    return a * a + b * b;
  };

  const partition = (st, ed) => {
    // if (st === ed) return; <== 因為返回的不是單點，而是區間，此處無意義。

    // 改用亂數產生 p 位址減少 WorstCase 機會。
    // let pivotPoint = points[st];
    // let pivot = dist(st);
    let p = Math.floor(Math.random() * (ed - st + 1)) + st;
    let pivotPoint = points[p];
    let pivot = dist(p);
    points[p] = points[st];

    let l = st;
    let r = ed;

    while (l < r) {
      while (l < r && dist(r) >= pivot) {
        r -= 1;
      }
      points[l] = points[r];
      while (l < r && dist(l) <= pivot) {
        l += 1;
      }
      points[r] = points[l];
    }
    points[l] = pivotPoint;

    // 每次partition僅選擇一側，優化空間複雜度。
    if (l === k-1) {
      return points.slice(0, k);
    } else if (l > k-1) {
      return partition(st, l-1);
    }else {
      return partition(l + 1, ed);
    }
  };

  return partition(0, points.length - 1);
};

// 測試
(function () {
  console.log('Testing [p0973_kClosestPointsToOrigin]...');

  const testingWith = (cb) => {
    console.log(
      isArrayEqual(
        cb(
          [
            [1, 3],
            [-2, 2],
          ],
          1
        ),
        [[-2, 2]]
      )
    );

    console.log(
      isArrayEqual(
        cb(
          [
            [3, 3],
            [5, -1],
            [-2, 4],
          ],
          2
        ),
        [
          [3, 3],
          [-2, 4],
        ]
      )
    );

    console.log(
      isArrayEqual(
        cb(
          [
            [0, 1],
            [1, 0],
          ],
          2
        ),
        [
          [0, 1],
          [1, 0],
        ]
      )
    );

    const q5 = cb(
      [[68,97],[34,-84],[60,100],[2,31],[-27,-38],[-73,-74],[-55,-39],[62,91],[62,92],[-57,-67]],
      5
    )
    q5.sort(([a1, a2], [b1, b2]) => a1 * a1 + a2 * a2 - (b1 * b1 + b2 * b2))
    console.log(
      isArrayEqual(
        q5,
        [[2,31],[-27,-38],[-55,-39],[-57,-67],[34,-84]]
      )
    );
  };

  console.log('Testing [kClosestBrute]');
  testingWith(kClosestBrute);

  console.log('Testing [kClosest]');
  testingWith(kClosest);

  console.log('All Testing Passed ✅');
})();
