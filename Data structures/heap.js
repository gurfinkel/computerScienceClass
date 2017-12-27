'use strict'

const ascSortOrder = 'asc';
const descSortOrder = 'desc';

class heap {

	constructor(sortOrder = ascSortOrder) {
		this._baseArray = [];
		this._sortOrder = sortOrder;
		this._comp = this._sortOrder === ascSortOrder ? (a, b) => +a < +b : (a, b) => +a > +b;
  }
  
  init(baseArray, sortOrder = ascSortOrder) {
  	this._baseArray = baseArray.slice();
  	this._sortOrder = sortOrder;
  	this._comp = this._sortOrder === ascSortOrder ? (a, b) => +a < +b : (a, b) => +a > +b;

  	if (0 === this._baseArray.length || 1 === this._baseArray.length) {
  		return;
  	}
  	
  	if (2 === this._baseArray.length) {
  		this.siftDown(this._baseArray, this._comp, 0);
  		return;
  	}

  	let h = Math.floor(Math.log2(this._baseArray.length) + 1);
  	let tempIndex = 1;

  	while (h > tempIndex) {
  		let highBorder = Math.pow(2, h - tempIndex) - 1;
  		let lowBorder = Math.pow(2, h - ++tempIndex) - 1;

  		for (let index = lowBorder; highBorder > index; ++index) {
  			let leftChildIndex = this.getLeftChildIndex(index);
  			let rightChildIndex = this.getRightChildIndex(index);
  			
  			if (this._baseArray.length > leftChildIndex && this._baseArray.length > rightChildIndex) {
  				this._baseArray[index] = this.merge(this._baseArray[index], this._baseArray[leftChildIndex], this._baseArray[rightChildIndex]);
  			} else if (this._baseArray.length > leftChildIndex) {
  				this._baseArray[index] = this._baseArray[index] < this._baseArray[leftChildIndex] ?
  					[this._baseArray[index], this._baseArray[leftChildIndex]] :
  					[this._baseArray[leftChildIndex], this._baseArray[index]];
  			} else if (this._baseArray.length > rightChildIndex) {
  				this._baseArray[index] = this._baseArray[index] < this._baseArray[rightChildIndex] ?
  					[this._baseArray[index], this._baseArray[rightChildIndex]] :
  					[this._baseArray[rightChildIndex], this._baseArray[index]]
  			}

				if (1 < this._baseArray[index].length) {
					
					//this._sortOrder === ascSortOrder ? this.siftDownAsc(this._baseArray[index], 0) : this.siftDownDesc(this._baseArray[index], 0);
	  			this.siftDown(this._baseArray[index], this._comp, 0);
	  		}
  		}
  	}

  	this._baseArray = this._baseArray[0];
  }

	merge(root, a, b) {
		root = [root];

		if (0 !== a.length && 0 !== b.length) {
			let aHeapLength = a.length;
			let bHeapLength = b.length;
			
			if (undefined === aHeapLength || undefined === bHeapLength) {
				if (undefined === aHeapLength && undefined !== bHeapLength) {
					root.push(b.shift());
					root.push(a);
					for (let index = 0; bHeapLength - 1 > index; ++index) {
						root.push(b.shift());
					}
				} else if (undefined !== aHeapLength && undefined === bHeapLength) {
					root.push(a.shift());
					root.push(b);
					for (let index = 0; aHeapLength - 1 > index; ++index) {
						root.push(a.shift());
					}
				} else {
					root.push(a);
					root.push(b);
				}
			} else {
				let itemsOnLevel = 1;
				let aHeapFirst = (1 === bHeapLength % 2 && aHeapLength > bHeapLength)	|| (1 === aHeapLength % 2 && 0 === bHeapLength % 2);

				while (aHeapLength || bHeapLength) {					
					if (aHeapFirst) {
						for (let itemCount = 0; itemsOnLevel > itemCount; ++itemCount) {
							let nextItem = a.shift();
							if (0 <= nextItem) {
								root.push(nextItem);
							}
						}
	
						for (let itemCount = 0; itemsOnLevel > itemCount; ++itemCount) {
							let nextItem = b.shift();
							if (0 <= nextItem) {
								root.push(nextItem);
							}
						}
					} else {
						for (let itemCount = 0; itemsOnLevel > itemCount; ++itemCount) {
							let nextItem = b.shift();
							if (0 <= nextItem) {
								root.push(nextItem);
							}
						}
						
						for (let itemCount = 0; itemsOnLevel > itemCount; ++itemCount) {
							let nextItem = a.shift();
							if (0 <= nextItem) {
								root.push(nextItem);
							}
						}
					}			
  					
					aHeapLength = a.length;
 					bHeapLength = b.length;
					itemsOnLevel*=2;
				}
			}			
		} else if (0 === a.length) {
			root = root.concat(b);
		} else if (0 === b.length) {
			root = root.concat(a);
		}

		return root;
	}

	getRoot() {
		return this._baseArray[0];
	}
	
	insert(a) {
		this._baseArray.push(a);
		//this._sortOrder === ascSortOrder ? this.siftUpAsc(this._baseArray, this._baseArray.length - 1) : this.siftUpDesc(this._baseArray, this._baseArray.length - 1);		
		
		this.siftUp(this._baseArray, this._comp, this._baseArray.length - 1);
	}
	
	extractRoot() {
		if (0 === this._baseArray.length) {
			return;
		}
		
		if (1 === this._baseArray.length) {
			return this._baseArray.shift();
		}

		this.swap(this._baseArray, 0, this._baseArray.length - 1);
		let item = this._baseArray.pop();
		//this._sortOrder === ascSortOrder ? this.siftDownAsc(this._baseArray, 0) : this.siftDownDesc(this._baseArray, 0);
		
		this.siftDown(this._baseArray, this._comp, 0);

		return item;
	}
	
	print() {
		console.log(this._baseArray);
	}
	
	siftUp(a, comp, childIndex) {
		if (0 < childIndex) {
			let parentIndex = this.getParentIndex(childIndex);

			if (comp(a[childIndex], a[parentIndex])) {
				this.swap(a, childIndex, parentIndex);
				this.siftUp(a, comp, parentIndex);
			}
		}
	}

	siftDown(a, comp, parentIndex) {
		if (a.length > parentIndex) {
			
			let leftChildIndex = this.getLeftChildIndex(parentIndex);
			let rightChildIndex = this.getRightChildIndex(parentIndex);

			if (a.length > leftChildIndex && a.length > rightChildIndex) {
				if (comp(a[leftChildIndex], a[rightChildIndex]) && comp(a[leftChildIndex], a[parentIndex])) {
					this.swap(a, parentIndex, leftChildIndex);
					this.siftDown(a, comp, leftChildIndex);
				} else if (comp(a[rightChildIndex], a[parentIndex])) {
					this.swap(a, parentIndex, rightChildIndex);
					this.siftDown(a, comp, rightChildIndex);
				}
			} else if (a.length > leftChildIndex) {
				if (comp(a[leftChildIndex], a[parentIndex])) {
					this.swap(a, parentIndex, leftChildIndex);
					this.siftDown(a, comp, leftChildIndex);
				}
			}
		}
	}

	siftUpAsc(a, childIndex) {
		let parentIndex = this.getParentIndex(childIndex);

		while (0 <= parentIndex) {
			if (a[childIndex] < a[parentIndex]) {
				this.swap(a, childIndex, parentIndex);
				childIndex = parentIndex;
			}
			
			parentIndex = this.getParentIndex(parentIndex);
		}
	}
	
	siftDownAsc(a, parentIndex) {
		let leftChildIndex = this.getLeftChildIndex(parentIndex);
		let rightChildIndex = this.getRightChildIndex(parentIndex);
		
		while (a.length > leftChildIndex) {
			if (a.length > rightChildIndex) {
				if (a[leftChildIndex] < a[rightChildIndex] && a[leftChildIndex] < a[parentIndex]) {
					this.swap(a, parentIndex, leftChildIndex);
					parentIndex = leftChildIndex;
				} else if (a[rightChildIndex] < a[parentIndex]) {
					this.swap(a, parentIndex, rightChildIndex);
					parentIndex = rightChildIndex;
				} else {
					return;
				}
			} else if (a[leftChildIndex] < a[parentIndex]) {
				this.swap(a, parentIndex, leftChildIndex);
				parentIndex = leftChildIndex;
			} else {
				return;
			}

			leftChildIndex = this.getLeftChildIndex(parentIndex);
			rightChildIndex = this.getRightChildIndex(parentIndex);
		}
	}

	siftUpDesc(a, childIndex) {
		let parentIndex = this.getParentIndex(childIndex);

		while (0 <= parentIndex) {
			if (a[childIndex] > a[parentIndex]) {
				this.swap(a, childIndex, parentIndex);
				childIndex = parentIndex;
			}
			
			parentIndex = this.getParentIndex(parentIndex);
		}
	}
	
	siftDownDesc(a, parentIndex) {
		let leftChildIndex = this.getLeftChildIndex(parentIndex);
		let rightChildIndex = this.getRightChildIndex(parentIndex);
		
		while (a.length > leftChildIndex) {
			if (a.length > rightChildIndex) {
				if (a[leftChildIndex] > a[rightChildIndex] && a[leftChildIndex] > a[parentIndex]) {
					this.swap(a, parentIndex, leftChildIndex);
					parentIndex = leftChildIndex;
				} else if (a[rightChildIndex] > a[parentIndex]) {
					this.swap(a, parentIndex, rightChildIndex);
					parentIndex = rightChildIndex;
				} else {
					return;
				}
			} else if (a[leftChildIndex] > a[parentIndex]) {
				this.swap(a, parentIndex, leftChildIndex);
				parentIndex = leftChildIndex;
			} else {
				return;
			}

			leftChildIndex = this.getLeftChildIndex(parentIndex);
			rightChildIndex = this.getRightChildIndex(parentIndex);
		}
	}
	
	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}
	
	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}
	
	getParentIndex(childIndex) {
		if (0 === childIndex) {
			return -1;
		}
	
		return Math.floor((childIndex - 1) / 2);
	}
	
	swap(a, firstIndex, secondIndex) {
		[a[firstIndex], a[secondIndex]] = [a[secondIndex], a[firstIndex]];
	}
}

module.exports = heap;
