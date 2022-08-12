/**
 *
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 */
 export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
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