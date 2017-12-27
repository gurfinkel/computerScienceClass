'use strict'

const Heap = require('../Data structures/heap');

const testArray = [12,4,5,3,8,7];heapS

function heapSort() {
	let heapAsc = new Heap('asc');
	for (let index = 0; testArray.length > index; ++index) {
		heapAsc.insert(testArray[index]);
	}
	
	let resultAsc = [];
	for (let index = 0; testArray.length > index; ++index) {
		resultAsc[index] = heapAsc.extractRoot();
	}
	
	let heapDesc = new Heap('desc');
	for (let index = 0; testArray.length > index; ++index) {
		heapDesc.insert(testArray[index]);
	}
	
	let resultDesc = [];
	for (let index = 0; testArray.length > index; ++index) {
		resultDesc[index] = heapDesc.extractRoot();
	}
	
	console.log("Input: " + testArray);
	console.log("Asc result: " + resultAsc);
	console.log("Desc result: " + resultDesc);
}

function heapSortAsc(a) {
	let heap = new Heap();
	heap.init(a, 'asc');
	
	for (let index = 0; a.length > index; ++index) {
		a[index] = heap.extractRoot();
	}
}

function heapSortDesc(a) {
	let heap = new Heap();
	heap.init(a, 'desc');
	
	for (let index = 0; a.length > index; ++index) {
		a[index] = heap.extractRoot();
	}
}

//heapSort();

const test = [1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11,111,10];
console.log("Input: " + test);

let ascResult = test.slice();
heapSortAsc(ascResult);
console.log("Asc result: " + ascResult);

let descResult = test.slice();
heapSortDesc(descResult);
console.log("Desc result: " + descResult);

//var outformat = new Intl.NumberFormat('en-US', {useGrouping: false, minimumFractionDigits: 1, maximumFractionDigits: 1})
//console.log(outformat.format(mid))
