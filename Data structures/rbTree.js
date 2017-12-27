'use strict'

const black = 'black';
const red = 'red';

class Node {
	constructor(value, color = black, leftChild = null, rightChild = null, leftParent = null, rightParent = null) {
		this._value = value;
		this._color = color;
		
		this._leftChild = leftChild;
		this._rightChild = rightChild;
		this._leftParent = leftParent;
		this._rightParent = rightParent;
  }
}

class rbTree {

	constructor() {
		this._root = null;
  }

	function succ(x) {
		if (x.rightChild && x.rightChild.leftChild) {
			let succ = x.rightChild.leftChild;
			while (succ.leftChild) {
				succ = succ.leftChild;
			}
			
			return succ;		
		} else if (!x.rightChild && x.rightParent) {
			return x.rightParent;
		} else {
			let succ = x.rightParent;
			while (succ.rightParent) {
				succ = succ.rightParent;
			}
			
			if (succ.leftParent) {
				return succ.leftParent;
			} else {
				return null;
			}
		}
	}
	
	function pred(x) {
	}
	
	function traversal() {
		a,x,b -> a<x<b
	}

	function insert(x) {
		if (this._root) {
		} else {
			this._root = new Node(x);
		}
	}
	
	function remove(x) {
	}
}

module.export = rbTree;
