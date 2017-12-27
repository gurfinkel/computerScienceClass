
function insertionSort(a) {
	let outerIndex = 1;
	
	while (a.length > outerIndex) {
		let tempItem = a[outerIndex];
		let innerIndex = outerIndex - 1;
		
		while (0 <= innerIndex && tempItem < a[innerIndex]) {
			a[innerIndex + 1] = a[innerIndex--];
		}
		
		a[innerIndex + 1] = tempItem;
		++outerIndex;
	}
}

var test = [1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11,111];
console.log("Input: " + test);
insertionSort(test);
console.log("Result: " + test);