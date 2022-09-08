// @ts-check

// 題目鏈結
// https://leetcode.com/problems/course-schedule

// 題目說明
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.
//

// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
//

// Example 2:
// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
//

// Constraints:
// 1 <= numCourses <= 10⁵
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// All the pairs prerequisites[i] are unique.
//

// 解題重點
// 1.
// 2.

// 解題思路
// 1.
// 2.

/**
 * Solution : DFS
 *
 * 複雜度
 * Time Complexity : O(N)
 * Space Complexity: O(N)
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinishDFS = function (numCourses, prerequisites) {
  const adj = Array(numCourses)
    .fill(0)
    .map(() => []);

  for (const [a, b] of prerequisites) {
    adj[b].push(a); // To take 'a' course you should have finished 'b' course. (b->a)
  }

  const seen = new Set();

  const dfs = (adj, curr) => {
    if (!adj[curr].length) return true;

    // 若已走訪表示有迴圈
    if (seen.has(curr)) return false;
    // 設置為走訪過
    seen.add(curr);

    const courses = adj[curr];
    for (const course of courses) {
      if (!dfs(adj, course)) return false;
    }

    // 透過設置為空，表示該路徑正確。
    adj[curr] = [];
    return true;
  };

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(adj, i)) return false;
  }

  return true;
};

/**
 * Solution : BFS
 *
 * 時間複雜度分析
 * 其中使用的BFS，其最壞的情況，圖接近一個扇形，且在不會發生迴圈的狀況下
 * 舉例如 n= 6, 時間複雜度為: N*(n-1)/2 -> N^2/2 -> O(N^2)
 * [ [0, [1,2,3,4,5]] ]
 * [ [1, [2,3,4,5]] ]
 * [ [2, [3,4,5]] ]
 * [ [3, [4,5]] ]
 * [ [4, [5]] ]
 * [ [5, []] ]
 *
 * 而當我們將其使用在一個 O(N) 的迴圈中，最終整體時間複雜度為 O(N^3)
 *
 * 空間複雜度分析
 * 即所有相鄰關係的數量，最糟情況下，N個點下，每個點又相連到其他點(不含自己)，
 * 即 N*(N-1) -> O(N^2)
 *
 *
 *
 * 複雜度
 * Time Complexity : O(N^3)
 * Space Complexity: O(N^2)
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

var canFinishBFS = function (numCourses, prerequisites) {
  const adj = Array(numCourses)
    .fill(0)
    .map(() => []);

  for (const [a, b] of prerequisites) {
    adj[b].push(a); // To take 'a' course you should have finished 'b' course. (b->a)
  }

  for (let i = 0; i < numCourses; i++) {
    // queue 和 seen 要放在for迴圈裏面，不像dfs是共用的
    // 這也代表目前逐課進行 BFS 會有重覆的計算結果。
    const queue = [...adj[i]];
    let qi = 0;

    const seen = new Set();
    seen.add(i);

    // bfs
    while (queue.length > qi) {
      const j = queue[qi++];
      const courses = adj[j];
      for (const course of courses) {
        // 在走訪中，又回到起始點，表示發生迴圈
        if (i === course) return false;
        if (!adj[course].length) continue;
        if (!seen.has(course)) {
          seen.add(course);
          queue.push(course);
        }
      }
    }
  }

  return true;
};

/**
 * Solution : 使用 Typological Sort
 * 
 * 使用額外的 indegree 表，並以數量為0作為起始點放入queue中，
 * 在以BFS的方式，同時不斷更新 indegree，直到indegree所有數量為0表示無環圈，
 * 反之，如果產生環圈，indegree 尚有數量不為 0的點。
 *
 * 複雜度
 * Time Complexity : O(P+N^2) // P 是 prerequisites的數量
 * Space Complexity: O(N^2)
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinishDAG = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = inDegree.map(() => []);

  for (const [a, b] of prerequisites) {
    inDegree[a] += 1;
    adj[b].push(a); // To take 'a' course you should have finished 'b' course. (b->a)
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  let qi = 0;
  // 使用 qi 取代 count

  while (queue.length > qi) {
    const j = queue[qi];
    qi += 1;

    const courses = adj[j];
    for (const course of courses) {
      inDegree[course] -= 1;
      if (inDegree[course] === 0) {
        queue.push(course);
      }
    }
  }

  return qi === numCourses;
};

// 測試
(function () {
  console.log("Testing [p0207_courseSchedule]...");

  const testingWith = (cb) => {
    console.log(cb(2, [[1, 0]]) === true);
    console.log(
      cb(2, [
        [1, 0],
        [0, 1],
      ]) === false
    );
    console.log(
      cb(20, [
        [0, 10],
        [3, 18],
        [6, 11],
        [11, 14],
        [13, 1],
        [15, 1],
        [17, 4],
      ]) === true
    );
    console.log(
      cb(7, [
        [1, 0],
        [0, 3],
        [0, 2],
        [3, 2],
        [2, 5],
        [4, 5],
        [5, 6],
        [2, 4],
      ]) === true
    );
    console.log(
      cb(4, [
        [2, 0],
        [1, 0],
        [3, 1],
        [3, 2],
        [1, 3],
      ]) === false
    );
    console.log(
      cb(4, [
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 0],
      ]) === false
    );
    console.log(
      cb(4, [
        [0, 1],
        [3, 1],
        [1, 3],
        [3, 2],
      ]) === false
    );
    console.log(
      //worst case
      cb(4, [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3],
      ]) === true
    );
  };

  console.log("Testing [canFinishDFS]...");
  testingWith(canFinishDFS);

  console.log("Testing [canFinishBFS]...");
  testingWith(canFinishBFS);

  console.log("Testing [canFinishDAG]...");
  testingWith(canFinishDAG);

  console.log("All Testing Passed ✅");
})();
