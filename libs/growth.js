// 第一个插件：轮播图
// import './utils.js'
(function(window){
	function Growth(){
	}

	Growth.prototype.setStyle = function(dom,options,fn){
		new Promise(function(resolve,reject){
			for (var key in options){
				dom.style[key] = options[key];
			}
			resolve();
		}).then(res => {
			if (fn) {
				fn()
			}
		}).catch(err => {
			console.log(err)
		})
	}

	// 轮播图
	Growth.prototype.slider = function(options){
		let self = this;
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
	
	Growth.prototype.collapse = function(options){
		
	}
	
	Growth.prototype.showModals = function(options){
		var self = this;
		var _options = {
			title:options.title || '标题',
			content : options.content || '文本内容',
			confirmText: options.confirmText || '确认',
			cancelText: options.cancelText || '取消',
			onConfirm: options.onConfirm || (() => {}),
			onCancel: options.onCancel || (() => {})
		}
		var box = document.createElement('div');
		this.setStyle(box,{
			position:'fixed',
			left: '50%',
			top: '40%',
			transform: 'translate(-50%,-50%)',
			width: '700px',
			// height: '400px',
			boxShadow: '0px 0px 10px #ddd',
			backgroundColor:'#fff'
		});
		var boxTit = document.createElement('div');
		boxTit.textContent = _options.title;
		this.setStyle(boxTit,{
			borderBottom: '1px solid #ddd',
			height:'50px',
			lineHeight:'50px',
			padding:'0px 20px'
		})
		box.appendChild(boxTit);
		var closeBtn = document.createElement('button');
		closeBtn.textContent = 'X';
		this.setStyle(closeBtn,{
			position: 'absolute',
			right:'0px',
			top:'0px',
			height:'50px',
			width: '50px',
			backgroundColor:'#fff',
			border:'none',
			outline:'none',
			fontSize:'25px'
		});
		closeBtn.addEventListener('click',function(){
			self.setStyle(box,{
				display: 'none'
			})
		},false)
		box.appendChild(closeBtn);
		var content = document.createElement('div');
		content.textContent = _options.content,
		this.setStyle(content,{
			padding: '20px',
			lineHeight: '20px',
			textAlign: 'center',
		});
		box.appendChild(content);
		var btnBox = document.createElement('div');
		this.setStyle(btnBox,{
			textAlign: 'center',
			margin: '10px'
		})
		var confirmBtn = document.createElement('button');
		confirmBtn.textContent = _options.confirmText;
		this.setStyle(confirmBtn,{
			backgroundColor:'#fff',
			border: '1px solid #ddd',
			borderRadius: '5px',
			padding: '10px 15px',
			marginRight: '100px'
		})
		var cancelBtn = document.createElement('button');
		this.setStyle(cancelBtn,{
			backgroundColor:'#fff',
			border: '1px solid #ddd',
			borderRadius: '5px',
			padding: '10px 15px'
		})
		cancelBtn.textContent = _options.cancelText;
		confirmBtn.addEventListener('click',function () {
			new Promise((resolve,reject) => {
				_options.onConfirm()
				resolve();
			}).then(() => {
				self.setStyle(box,{
					display: 'none'
				})
			})
		},false);
		cancelBtn.addEventListener('click',function () {
			new Promise((resolve,reject) => {
				_options.onCancel()
				resolve();
			}).then(() => {
				self.setStyle(box,{
					display: 'none'
				})
			})
		},false);
		btnBox.appendChild(confirmBtn);
		btnBox.appendChild(cancelBtn);
		box.appendChild(btnBox)
		document.getElementsByTagName('body')[0].appendChild(box)
	}

	window.growth = new Growth();
}(window))