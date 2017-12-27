
function merge(a, b) {
	if (0 === a.length) {
		return b;
	}
	if (0 === b.length) {
		return a;
	}
	if (a[0] > b[0]) {
		return [b[0]].concat(merge(a, b.slice(1)));
	} else {
		return [a[0]].concat(merge(a.slice(1), b));
	}
}

function mergeSort(a) {
	if (1 === a.length) {
		return a;
	}
	
	let middle = Math.floor(a.length/2);
	let leftHalf = a.slice(0, middle);
	let rightHalf = a.slice(middle);
	
	return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

var test = [1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11,111];
var result = mergeSort(test);
console.log("Input: " + test);
console.log("Result: " + result);
