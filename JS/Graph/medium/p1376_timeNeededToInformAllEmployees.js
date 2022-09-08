// @ts-check

// 題目鏈結
// https://leetcode.com/problems/time-needed-to-inform-all-employees

// 題目說明
// A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.
// Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.
// The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.
// The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).
// Return the number of minutes needed to inform all the employees about the urgent news.
//

// Example 1:
// Input: n = 1, headID = 0, manager = [-1], informTime = [0]
// Output: 0
// Explanation: The head of the company is the only employee in the company.
//

// Example 2:
// Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
// Output: 1
// Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
// The tree structure of the employees in the company is shown.
//

// Constraints:
// 1 <= n <= 10^5
// 0 <= headID < n
// manager.length == n
// 0 <= manager[i] < n
// manager[headID] == -1
// informTime.length == n
// 0 <= informTime[i] <= 1000
// informTime[i] == 0 if employee i has no subordinates.
// It is guaranteed that all the employees can be informed.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution :
 *
 * 複雜度
 * Time Complexity : O(??)
 * Space Complexity: O(??)
 *
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  // 管理清單, 老闆 -> 員工
  const adjList = manager.map((x) => []);

  for (let i = 0; i < n; i++) {
    const mid = manager[i];
    if (mid === -1) continue;
    adjList[mid].push(i);
  }

  const dfs = (adjList, vertex) => {
    if (!adjList[vertex].length) return 0; //沒有下屬，告知時間為 0

    let maxSubTime = 0;
    const mytime = informTime[vertex];
    const employees = adjList[vertex];
    for (const emp of employees) {
      maxSubTime = Math.max(maxSubTime, dfs(adjList, emp));
    }
    return mytime + maxSubTime;
  };

  return dfs(adjList, headID);
};

/**
 * Solution :
 *
 * 複雜度
 * Time Complexity : O(??)
 * Space Complexity: O(??)
 *
 *
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  let res = 0;

  for (let i = 0; i < n; i++) {
    res = Math.max(res, dfs(i, manager, informTime));
  }

  return res;

  function dfs(i, manager, informTime) {
    if (manager[i] !== -1) {
      informTime[i] += dfs(manager[i], manager, informTime);
      manager[i] = -1;
    }

    return informTime[i];
  }
};

// 測試
(function () {
  console.log("Testing [p1376_timeNeededToInformAllEmployees]...");

  /**
   * Write Some Testing here
   */

  console.log("All Testing Passed ✅");
})();
