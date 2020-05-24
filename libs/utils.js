(function(window){
	// function Gutils(){

	// }
	// Gutils.prototype.getDom = function (selector) {
	// 	console.log(selector.charAt(0))
	// 	if (selector.charAt(0) === '#') {
	// 		return document.getElemenetById(selector.substr(1));
	// 	} else if (selector[0] = '.') {
	// 		return document.getElementsByClassName(selector.substr[1])[0]
	// 	}
	// }
	// Gutils.prototype.getStyle = function(dom,styleName){
	// 	return dom.currentStyle ? dom.currentStyle[styleName] : getComputedStyle(dom)[styleName]
	// }
	class Gutils{
		constructor(){

		}
		getDom(selector){
			// if (selector.charAt(0) === '#') {
			// 	return document.getElementById(selector.substr(1));
			// } else if (selector.charAt(0) === '.') {
			// 	return document.getElementsByClassName(selector.substr(1))[0]
			// }
			return document.querySelector(selector)
		}
		setTextContent(node,text){
			if (typeof(node.textContent) === 'undefined'){
				node.innerText = text;
			} else {
				node.textContent = text;
			}
		}
		getTextContent(node){
			if (typeof(node.textContent) === 'undefined') {
				return node.innerText;
			} else {
				return node.textContent;
			}
		}
		getFirstChild(node){
			if (node.firstElementChild) {
				return node.firstElementChild;
			} else {
				var fNode = node.firstChild;
				while(fNode && fNode.nodeType !== 1) {
					fNode = fNode.nextSibling;
				}
				return fNode;
			}
		}
		getLastChild(node){
			if (node.lastElementChild) {
				return node.lastElementChild;
			} else {
				var lNode = element.lastChild;
				while(lNode && lNode.nodeType !== 1) {
					lNode = lNode.previousSibling;
				}
				return lNode
			}
		}
		getStyle(node,styleName){
			return node.currentStyle ? node.currentStyle[styleName] : getComputedStyle(node)[styleName]
		}

	}

	window.gut = new Gutils()
}(window))