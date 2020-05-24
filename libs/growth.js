// 第一个插件：轮播图
// import './utils.js'
(function(window){
	function Growth(){
	}

	// 轮播图
	Growth.prototype.slider = function(options){
		if (!options.el) {
			console.error('请传入选择器！');
			return;
		}
		var options = {
			el: options.el,
			width: options.width || '600px',
			height: options.height || '420px',
			autoSroll: options.autoSroll || true,
			scrollStayTime : options.scrollStayTime || 2,
			scrollTransitonTime : options.scrollTransitonTime || 1,
			cycle: options.cycle || true,
			dotShow: options.dotShow || true,
			firstShow: options.firstShow || 0
		}


		var boxDom = document.querySelector(options.el);
		var boxWidthVal,boxWidthUnit;
		if (options.width.indexOf('px') !== -1) {
			boxWidthVal = parseFloat(options.width.substring(0,options.width.length-2));
			boxWidthUnit = 'px';
		} else if (options.width.indexOf('rem') !== -1) {
			boxWidthVal = parseFloat(options.width.substring(0,options.width.length-3));
			boxWidthUnit = 'rem';
		} else if (options.width.indexOf('em') !== -1) {
			boxWidthVal = parseFloat(options.width.substring(0,options.width.length-2));
			boxWidthUnit = 'em';
		} else {
		}
		var ulDom = boxDom.getElementsByTagName('ul')[0];
		var liDom = ulDom.getElementsByTagName('li');
		var index = options.firstShow < 0 ? 0 : (options.firstShow > liDom.length - 1 ? (liDom.length - 1) : options.firstShow) 
		initStyle()
		initArrow();

		function initStyle(){
			boxDom.style.width = options.width;
			boxDom.style.height = options.height;
			boxDom.style.overflow = 'hidden';
			boxDom.style.position = 'relative';

			var ulWid = boxWidthVal * liDom.length;
			ulDom.style.width = ulWid + boxWidthUnit;
			ulDom.style.padding = '0px';
			ulDom.style.margin = '0px';
			ulDom.style.position = 'relative';
			ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
			ulDom.style.transition = `left ${options.scrollTransitonTime}s`;

			for(var i = 0; i < liDom.length; i++) {	
				liDom[i].style.width = options.width;
				liDom[i].style.height = options.height;
				liDom[i].style.float = 'left';
				liDom[i].style.listStyle = 'none';

				var imgItem = liDom[i].getElementsByTagName('img')[0];
				imgItem.style.width = '100%';
				imgItem.style.height = '100%';
			}
		}

		function prev(){
			if (index > 0) {
				index--;
				ulDom.style.left = -index * boxWidthVal + boxWidthUnit
			}
		}
		function next(){
			var itemLength = liDom.length;
			if (index < itemLength - 1) {
				index++;
				ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
			}
		}

		function initArrow(){
			var arrowBox = document.createElement('div');
			arrowBox.style.position = 'absolute';
			arrowBox.style.top = '45%';
			arrowBox.style.width = '100%';
			arrowBox.style.fontSize = '40px';
			arrowBox.style.color = '#fff';
			var arrowLeft = document.createElement('span');
			arrowLeft.textContent = '<';
			arrowLeft.style.cursor = 'pointer'
			var arrowRight = document.createElement('span');
			arrowRight.textContent = '>';
			arrowRight.style.float = 'right';
			arrowRight.style.cursor = 'pointer'
			arrowBox.appendChild(arrowLeft);
			arrowBox.appendChild(arrowRight);
			boxDom.appendChild(arrowBox)

			arrowLeft.addEventListener('click',function(){
				prev();
			},false);

			arrowRight.addEventListener('click',function(){
				next();
			},false);
		}	
		function play(){
			var timer = setInterval(function(){

			},options.scrollStayTime * 1000);
		}
	}
	
	window.growth = new Growth();
}(window))