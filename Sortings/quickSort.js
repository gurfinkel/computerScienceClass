
function swap(a, firstIndex, secondIndex) {
	let temp = a[firstIndex];
	a[firstIndex] = a[secondIndex];
	a[secondIndex] = temp;
}

function partition(a, low, high) {
	let pivot = a[high];
	let tempIndex = low - 1;
	
	for(let index = low; high > index; ++index) {
		if(pivot > a[index]) {
			swap(a, index, ++tempIndex);
		}
	}
	
	if(a[high] < a[++tempIndex]) {
		swap(a, high, tempIndex);
	}
	
	return tempIndex;
}

function quickSort(a, low, high) {
	if (low < high) {
		let p = partition(a, low, high);
		quickSort(a, low, p - 1);
		quickSort(a, p + 1, high);
	}
}

var test = [1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11,111];
console.log("Input: " + test);
quickSort(test, 0, test.length - 1);
console.log("Result: " + test);
