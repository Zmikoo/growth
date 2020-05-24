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
			autoSroll: options.autoSroll === false ? false : true,
			scrollStayTime : options.scrollStayTime || 2,
			scrollTransitonTime : options.scrollTransitonTime || 1,
			cycle: options.cycle === false ? false : true,
			dotShow: options.dotShow === false ? false : true,
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
		var itemLength = liDom.length;
		var index = options.firstShow < 0 ? 0 : (options.firstShow > liDom.length - 1 ? (liDom.length - 1) : options.firstShow) 
		initStyle()
		initArrow();
		if (options.dotShow) {
			initDot();
		}
		function initStyle(){
			boxDom.style.width = options.width;
			boxDom.style.height = options.height;
			boxDom.style.overflow = 'hidden';
			boxDom.style.position = 'relative';

			// if(options.cycle){
			// 	var repLi = document.createElement('li');
			// 	var repImg = document.createElement('img');
			// 	repImg.src = liDom[0].getElementsByTagName('img')[0].src;
			// 	repLi.appendChild(repImg);
			// 	ulDom.appendChild(repLi);
			// }

			var ulWid = boxWidthVal * liDom.length;
			ulDom.style.width = ulWid + boxWidthUnit;
			ulDom.style.padding = '0px';
			ulDom.style.margin = '0px';
			ulDom.style.position = 'relative';
			ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
			ulDom.style.transition = `left ${options.scrollTransitonTime}s`;
			ulDom.style.listStyle = 'none';
			for(var i = 0; i < liDom.length; i++) {	
				// liDom[i].style.listStyle = 'none';
				liDom[i].style.width = options.width;
				liDom[i].style.height = options.height;
				liDom[i].style.float = 'left';

				var imgItem = liDom[i].getElementsByTagName('img')[0];
				imgItem.style.width = '100%';
				imgItem.style.height = '100%';
			}
		}

		function prev(){
			if (index > 0) {
				index--;
				ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
				resetDotColor();
			}
		}
		function next(){
			if (index < itemLength - 1) {
				index++;
				ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
				resetDotColor();
			}
		}
		function goIndex(ind){
			if (ind >= 0 && ind <= itemLength ) {		
				index = parseInt(ind);
				ulDom.style.left = -index * boxWidthVal + boxWidthUnit;
				resetDotColor();
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

		function initDot(){
			var dotBox = document.createElement('div');
			dotBox.style.position = 'absolute';
			dotBox.style.bottom = '30px';
			dotBox.style.left = '50%';
			dotBox.style.transform = 'translateX(-50%)';
			for(var i = 0; i < liDom.length; i++) {
				var dotItem = document.createElement('span');
				dotItem.style.display = 'inline-block';
				dotItem.style.width = '20px';
				dotItem.style.height = '20px';
				dotItem.style.borderRadius = '50%';
				dotItem.style.margin = '10px';
				dotItem.dataset.index = i;
				dotItem.setAttribute('class','gr-slider-dot')
				if (i === index){
					dotItem.style.backgroundColor = '#fff';
				} else {
					dotItem.style.backgroundColor = '#ddd';
				}
				dotItem.addEventListener('click',function(e){
					var index = e.srcElement.dataset.index;
					goIndex(index)
				},false);
				dotBox.appendChild(dotItem);
			}
			boxDom.appendChild(dotBox);
		}

		function resetDotColor(){
			if (!options.dotShow)  return;
			var dotList = document.getElementsByClassName('gr-slider-dot');
			for (let i = 0; i < dotList.length; i++) {
				if (i === index) {
					dotList[i].style.backgroundColor = '#fff';
				} else {
					dotList[i].style.backgroundColor = '#ddd'
				}
			}
		}

		function play(){
			var timer = setInterval(function(){

			},options.scrollStayTime * 1000);
		}
	}
	
	window.growth = new Growth();
}(window))