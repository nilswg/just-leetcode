
// 暴力解 O(N^2)
// Time Complexity : O(N^2)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {

  let l = 0;
  let r = k-1;

  const getMax = (st, ed)=>{
      let max = -Math.pow(10, 4);
      for (let i=st; i <= ed; i++) {
          if (nums[i] > max){
              max = nums[i];
          }
      }
      return max;
  }

  let res = [];
  while(r < nums.length) {
      res.push(getMax(l, r));
      l+=1
      r+=1;
  }
  return res;
};

// 使用 monotonicQuene
// Time Complexity : O(N)
// Space Complexity: O(N)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var maxSlidingWindow = function(nums, k) {

  let monotonicQuene = [];
  let max = -Math.pow(10,4);
  let res = [];
  for (let i = 0; i<nums.length; i++) {
    const num = nums[i];
    if (num > max) {
      // 把其他比自己小的都移除掉。
      max = num;
      monotonicQuene = [num];
    }else {
      monotonicQuene.push(num);
    }
    if (i >= k -1) {
      res.push(max);
    }
  }
  return res;
};
