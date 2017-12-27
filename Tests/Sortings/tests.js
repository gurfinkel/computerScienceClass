'use strict'

const Heap = require('../../Data structures/heap');

function heapSort(a) {
	const heap = new Heap();
	heap.init(a, 'asc');
	
	for (let index = 0; a.length > index; ++index) {
		a[index] = heap.extractRoot();
	}
}

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

function swap(a, firstIndex, secondIndex) {
	[a[firstIndex], a[secondIndex]] = [a[secondIndex], a[firstIndex]];
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

function partition(a, low, high) {
	let pivot = a[high];
	let tempIndex = low - 1;
	
	for (let index = low; high > index; ++index) {
		if (pivot > a[index]) {
			swap(a, ++tempIndex, index);
		}
	}
	
	if (a[high] < a[++tempIndex]) {
		swap(a, high, tempIndex);
	}
	
	return tempIndex;
}

function quickSort(a, low, high) {
	if (low < high) {
		let pivot = partition(a, low, high);
		quickSort(a, low, pivot - 1);
		quickSort(a, pivot + 1, high);
	}
}

function merge(a, b) {
	if (0 === a.length) {
		return b;
	}
	if (0 === b.length) {
		return a;
	}
	if (a[0] < b[0]) {
		return [a[0]].concat(merge(a.slice(1), b));
	} else {
		return [b[0]].concat(merge(a, b.slice(1)));
	}
}

function mergeSort(a) {
	if (0 === a.length || 1 === a.length) {
		return a;
	}
	
	let middle = Math.floor(a.length / 2);
	let leftHalf = a.slice(0, middle);
	let rightHalf = a.slice(middle);
	
	return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

// ----------------------------------------
// Tests
// ----------------------------------------

function UserException(name, message) {
	this.name = name;
  this.message = message; 
}

function getRandomSequence(size, modulo) {
	let result = [];
	
	for (let index = 0; size > index; ++index) {
		result.push(Math.floor(Math.random() * 10 % modulo));
	}
	
	return result;
}

function testInsertionSort(testSequence, properAnswer) {
	let tempArray = testSequence.slice();
	insertionSort(testSequence, 0, testSequence.length - 1);
	
	if (JSON.stringify(properAnswer) !== JSON.stringify(testSequence)) {
		throw new UserException("InsertionSortError", "Input: " + tempArray + "; " + "Proper answer: " + properAnswer + "; " + "Your answer: " + testSequence);
	}
}

function testHeapSort(testSequence, properAnswer) {
	let tempArray = testSequence.slice();
	heapSort(testSequence);

	if (JSON.stringify(properAnswer) !== JSON.stringify(testSequence)) {
		throw new UserException("HeapSortError", "Input: " + tempArray + "; " + "Proper answer: " + properAnswer + "; " + "Your answer: " + testSequence);
	}
}

function testMergeSort(testSequence, properAnswer) {
	let sortSequence = mergeSort(testSequence);
	
	if (JSON.stringify(properAnswer) !== JSON.stringify(sortSequence)) {
		throw new UserException("MergeSortError", "Input: " + testSequence + "; " + "Proper answer: " + properAnswer + "; " + "Your answer: " + sortSequence);
	}
}

function testSelectionSort(testSequence, properAnswer) {
	let tempArray = testSequence.slice();
	selectionSort(testSequence, 0, testSequence.length - 1);
	
	if (JSON.stringify(properAnswer) !== JSON.stringify(testSequence)) {
		throw new UserException("SelectionSortError", "Input: " + tempArray + "; " + "Proper answer: " + properAnswer + "; " + "Your answer: " + testSequence);
	}
}

function testQuickSort(testSequence, properAnswer) {
	let tempArray = testSequence.slice();
	quickSort(testSequence, 0, testSequence.length - 1);
	
	if (JSON.stringify(properAnswer) !== JSON.stringify(testSequence)) {
		throw new UserException("QuickSortError", "Input: " + tempArray + "; " + "Proper answer: " + properAnswer + "; " + "Your answer: " + testSequence);
	}
}

function runInsertionSortUnitTests() {
	try {
		testInsertionSort([], []);
		testInsertionSort([1], [1]);
		testInsertionSort([2,1], [1,2]);
		testInsertionSort([1,2,2,1], [1,1,2,2]);
		testInsertionSort([4,5,1,3,2], [1,2,3,4,5]);
		testInsertionSort([1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11], [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);
	} catch (e) {
		console.log("InsertionSort error message: " + e.message);
	}
}

function runHeapSortUnitTests() {
	try {
		testHeapSort([], []);
		testHeapSort([1], [1]);
		testHeapSort([2,1], [1,2]);
		testHeapSort([1,2,2,1], [1,1,2,2]);
		testHeapSort([4,5,1,3,2], [1,2,3,4,5]);
		testHeapSort([1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11], [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);
	} catch (e) {
		console.log("HeapSort error message: " + e.message);
	}
}

function runMergeSortUnitTests() {
	try {
		testMergeSort([], []);
		testMergeSort([1], [1]);
		testMergeSort([2,1], [1,2]);
		testMergeSort([1,2,2,1], [1,1,2,2]);
		testMergeSort([4,5,1,3,2], [1,2,3,4,5]);
		testMergeSort([1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11], [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);
	} catch (e) {
		console.log("MergeSort error message: " + e.message);
	}
}

function runQuickSortUnitTests() {
	try {
		testQuickSort([], []);
		testQuickSort([1], [1]);
		testQuickSort([2,1], [1,2]);
		testQuickSort([1,2,2,1], [1,1,2,2]);
		testQuickSort([4,5,1,3,2], [1,2,3,4,5]);
		testQuickSort([1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11], [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);
	} catch (e) {
		console.log("QuickSort error message: " + e.message);
	}
}

function runSelectionSortUnitTests() {
	try {
		testSelectionSort([], []);
		testSelectionSort([1], [1]);
		testSelectionSort([2,1], [1,2]);
		testSelectionSort([1,2,2,1], [1,1,2,2]);
		testSelectionSort([4,5,1,3,2], [1,2,3,4,5]);
		testSelectionSort([1,99,2,88,3,77,4,66,5,55,6,44,7,33,8,22,9,11], [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,88,99]);
	} catch (e) {
		console.log("SelectionSort error message: " + e.message);
	}
}

function runStressTest(maxSize = 10, maxModulo = 10, maxAttempt = 1000) {
	for (let size = 0; maxSize >= size; ++size) {
		console.log("Size: " + size);
		for (let modulo = 1; maxModulo >= modulo; ++modulo) {
			console.log("Modulo: " + modulo);
			for (let attempt = 0; maxAttempt > attempt; ++attempt) {
				let testSequence = getRandomSequence(size, modulo);
				
				let properAnswer = mergeSort(testSequence);
				testInsertionSort(testSequence.slice(), properAnswer);
				testHeapSort(testSequence.slice(), properAnswer);
				testQuickSort(testSequence.slice(), properAnswer);
				testSelectionSort(testSequence.slice(), properAnswer);
			}
		}
	}
	
	console.log("Passed stress test!");
}

// runInsertionSortUnitTests();
// runHeapSortUnitTests();
// runMergeSortUnitTests();
// runQuickSortUnitTests();
// runSelectionSortUnitTests();

runStressTest(50, 10, 1000);
