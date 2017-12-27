
function swap(a, firstIndex, secondIndex) {
	let temp = a[firstIndex];
	a[firstIndex] = a[secondIndex];
	a[secondIndex] = temp;
}

function selectionSort(a) {
	for (let outerIndex = 0; a.length - 1 > outerIndex; ++outerIndex) {
		let minItemIndex = outerIndex;
		
		for (let innerIndex = outerIndex + 1; a.length > innerIndex; ++innerIndex) {
			if (a[minItemIndex] > a[innerIndex]) {
				minItemIndex = innerIndex;
			}
		}
		
		if (outerIndex !== minItemIndex) {
			swap(a, outerIndex, minItemIndex);
		}
	}
}

var test = [1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11,111];
console.log("Input: " + test);
selectionSort(test);
console.log("Result: " + test);