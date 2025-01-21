function areArraysEqualIgnoreOrder(arr1, arr2) {
  // Sort and compare
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}
export default areArraysEqualIgnoreOrder;
