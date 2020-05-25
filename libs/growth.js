// 第一个插件：轮播图
// import './utils.js'
(function(window){

	function _gUtils(){
		return {
			cDom(type) {
				return document.createElement(type);
			},
			gDom(sign){
				return document.querySelector(sign);
			},
			setStyle(map){
				map.forEach(function(styleList,domObj){
					for (var s in styleList) {
						domObj.style[s] = styleList[s];
					}
				})
			},
			addDom(parent,children){
				children.forEach(child => {
					parent.appendChild(child);
				})
			}
		}
	}
	var _ = _gUtils();

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

	// 模态框
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
		// var box = document.createElement('div');
		var box = _.cDom('div');
		var boxTit = _.cDom('div');
		boxTit.textContent = _options.title;
		var closeBtn = _.cDom('button');
		closeBtn.textContent = 'X';
		var content = _.cDom('div');
		content.textContent = _options.content;
		var btnBox = _.cDom('div');
		var confirmBtn = _.cDom('button');
		var cancelBtn = _.cDom('button');
		confirmBtn.textContent = _options.confirmText;
		cancelBtn.textContent = _options.cancelText;
		const m = new Map([
			[box,{
				position:'fixed',
				left: '50%',
				top: '40%',
				transform: 'translate(-50%,-50%)',
				width: '700px',
				// height: '400px',
				boxShadow: '0px 0px 10px #ddd',
				backgroundColor:'#fff',
				borderRadius:'5px'
			}],
			[boxTit,{
				borderBottom: '1px solid #ddd',
				height:'50px',
				lineHeight:'50px',
				padding:'0px 20px'
			}],
			[closeBtn,{
				position: 'absolute',
				right:'0px',
				top:'0px',
				height:'50px',
				width: '50px',
				backgroundColor:'#fff',
				border:'none',
				outline:'none',
				fontSize:'25px'
			}],
			[content,{
				padding: '20px 30px',
				lineHeight: '20px',
				textAlign: 'justify',
			}],
			[btnBox,{
				textAlign: 'center',
				margin: '10px'
			}],
			[confirmBtn,{
				backgroundColor:'#fff',
				border: '1px solid #ddd',
				borderRadius: '5px',
				padding: '10px 15px',
				marginRight: '100px'
			}],
			[cancelBtn,{
				backgroundColor:'#fff',
				border: '1px solid #ddd',
				borderRadius: '5px',
				padding: '10px 15px'
			}]
		])
		_.setStyle(m);
		closeBtn.addEventListener('click',function(){
			self.setStyle(box,{
				display: 'none'
			})
		},false)
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
		_.addDom(btnBox,[confirmBtn,cancelBtn])
		_.addDom(box,[boxTit,closeBtn,content,btnBox]);
		document.getElementsByTagName('body')[0].appendChild(box)
	}


	// 轮播图
	Growth.prototype.slider = function(options){
		let self = this;
		if (!options.el) {
			console.error('请传入选择器！');
			return;
		}
		var _options = {
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

		var boxDom = document.querySelector(_options.el);
		var boxWidthVal,boxWidthUnit;
		if (_options.width.indexOf('px') !== -1) {
			boxWidthVal = parseFloat(_options.width.substring(0,_options.width.length-2));
			boxWidthUnit = 'px';
		} else if (_options.width.indexOf('rem') !== -1) {
			boxWidthVal = parseFloat(_options.width.substring(0,_options.width.length-3));
			boxWidthUnit = 'rem';
		} else if (_options.width.indexOf('em') !== -1) {
			boxWidthVal = parseFloat(_options.width.substring(0,_options.width.length-2));
			boxWidthUnit = 'em';
		} else {
		}
		var ulDom = boxDom.getElementsByTagName('ul')[0];
		var liDom = ulDom.getElementsByTagName('li');
		var itemLength = liDom.length;
		var index = _options.firstShow < 0 ? 0 : (_options.firstShow > liDom.length - 1 ? (liDom.length - 1) : _options.firstShow) 
		initStyle()
		initArrow();
		if (_options.dotShow) {
			initDot();
		}
		function initStyle(){
			// if(_options.cycle){
			// 	var repLi = document.createElement('li');
			// 	var repImg = document.createElement('img');
			// 	repImg.src = liDom[0].getElementsByTagName('img')[0].src;
			// 	repLi.appendChild(repImg);
			// 	ulDom.appendChild(repLi);
			// }
			var ulWid = boxWidthVal * liDom.length;
			_.setStyle(new Map([
				[boxDom,{
					width: _options.width,
					height: _options.height,
					overflow: 'hidden',
					position: 'relative'
				}],
				[ulDom,{
					width: ulWid + boxWidthUnit,
					padding: '0px',
					margin: '0px',
					position: 'relative',
					left: -index * boxWidthVal + boxWidthUnit,
					transition: `left ${_options.scrollTransitonTime}s`,
					listStyle: 'none'
				}]
			]))
			for(var i = 0; i < liDom.length; i++) {	
				var imgItem = liDom[i].getElementsByTagName('img')[0];
				(function(index){
					_.setStyle(new Map([
										[liDom[index],{
											width: _options.width,
											height: _options.height,
											float: 'left'
										}],
										[imgItem,{
											width: '100%',
											height: '100%'
										}]
									]))
				}(i))
				
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
			var arrowBox = _.cDom('div');
			var arrowLeft = document.createElement('span');
			arrowLeft.textContent = '<';
			var arrowRight = document.createElement('span');
			arrowRight.textContent = '>';
			_.setStyle(new Map([
				[arrowBox,{
					position: 'absolute',
					top: '45%',
					width: '100%',
					fontSize: '40px',
					color: '#fff'
				}],
				[arrowLeft,{
					cursor: 'pointer'
				}],
				[arrowRight,{
					float: 'right',
					cursor: 'pointer'
				}]
			]))
			_.addDom(arrowBox,[arrowLeft,arrowRight]);
			_.addDom(boxDom,[arrowBox])
			arrowLeft.addEventListener('click',function(){
				prev();
			},false);

			arrowRight.addEventListener('click',function(){
				next();
			},false);
		}	

		function initDot(){
			var dotBox = _.cDom('div');
			_.setStyle(new Map([
				[dotBox,{
					position: 'absolute',
					bottom: '30px',
					left: '50%',
					transform: 'translateX(-50%)'
				}]
			]))
			for(var i = 0; i < liDom.length; i++) {
				var dotItem = _.cDom('span');
				_.setStyle(new Map([
					[dotItem,{
						display: 'inline-block',
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						margin: '10px',

					}]
				]))
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
				_.addDom(dotBox,[dotItem])
			}
			_.addDom(boxDom,[dotBox])
		}

		function resetDotColor(){
			if (!_options.dotShow)  return;
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

			},_options.scrollStayTime * 1000);
		}
	}
	
	// 下拉框
	Growth.prototype.collapse = function(options){

	}
	

	window.growth = new Growth();
}(window))