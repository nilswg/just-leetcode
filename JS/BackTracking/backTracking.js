/**
 *
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 */
export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  arr1.sort();
  arr2.sort();

  for (let i = 0, n = arr1.length; i < n; i++) {
    if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
      if (!isArrayEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }

  return true;
};

// 測試一個函數執行時間，並返回其回傳值
/**
 *
 * @param {()=>any} fTest
 * @returns
 */
export const printElapsedTime = (fTest) => {
  var nStartTime = Date.now();
  var vReturn = fTest();
  var nEndTime = Date.now();

  console.log(
    'Elapsed time: ' + String(nEndTime - nStartTime) + ' milliseconds'
  );
  return vReturn;
};
