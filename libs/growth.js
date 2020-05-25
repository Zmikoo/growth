// 第一个插件：轮播图
// import './utils.js'
(function(window){

	function _gUtils(){
		return {
			cEle(type) {
				return document.createElement(type);
			},
			qSel(sign){
				return document.querySelector(sign);
			},
			qSels(sign){
				return document.querySelectorAll(sign)
			},
			setStyle(map){
				map.forEach(function(styleList,domObj){
					for (let s in styleList) {
						domObj.style[s] = styleList[s];
					}
				})
			},
			addEle(parent,children){
				children.forEach(child => {
					parent.appendChild(child);
				})
			}
		}
	}
	let _ = _gUtils();

	class Growth{
		constructor(){

		}

		setStyle(dom,options,fn){
			new Promise(function(resolve,reject){
				for (let key in options){
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
		showModals(options){
			let self = this;
			let _options = {
				title:options.title || '标题',
				content : options.content || '文本内容',
				confirmText: options.confirmText || '确认',
				cancelText: options.cancelText || '取消',
				onConfirm: options.onConfirm || (() => {}),
				onCancel: options.onCancel || (() => {})
			}
			// let box = document.createElement('div');
			let box = _.cEle('div');
			let boxTit = _.cEle('div');
			boxTit.textContent = _options.title;
			let closeBtn = _.cEle('button');
			closeBtn.textContent = 'X';
			let content = _.cEle('div');
			content.textContent = _options.content;
			let btnBox = _.cEle('div');
			let confirmBtn = _.cEle('button');
			let cancelBtn = _.cEle('button');
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
					lineHeight: '25px',
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
			_.addEle(btnBox,[confirmBtn,cancelBtn])
			_.addEle(box,[boxTit,closeBtn,content,btnBox]);
			document.getElementsByTagName('body')[0].appendChild(box)
		}

		// 轮播图
		slider(options){
			let self = this;
			if (!options.el) {
				console.error('请传入选择器！');
				return;
			}
			let _options = {
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

			let boxDom = document.querySelector(_options.el);
			let boxWidthVal,boxWidthUnit;
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
			let ulDom = boxDom.getElementsByTagName('ul')[0];
			let liDom = ulDom.getElementsByTagName('li');
			let itemLength = liDom.length;
			let index = _options.firstShow < 0 ? 0 : (_options.firstShow > liDom.length - 1 ? (liDom.length - 1) : _options.firstShow) 
			initStyle()
			initArrow();
			if (_options.dotShow) {
				initDot();
			}

			function initStyle(){
				// if(_options.cycle){
				// 	let repLi = document.createElement('li');
				// 	let repImg = document.createElement('img');
				// 	repImg.src = liDom[0].getElementsByTagName('img')[0].src;
				// 	repLi.appendChild(repImg);
				// 	ulDom.appendChild(repLi);
				// }
				let ulWid = boxWidthVal * liDom.length;
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
				for(let i = 0; i < liDom.length; i++) {	
					let imgItem = liDom[i].getElementsByTagName('img')[0];
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
				let arrowBox = _.cEle('div');
				let arrowLeft = document.createElement('span');
				arrowLeft.textContent = '<';
				let arrowRight = document.createElement('span');
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
				_.addEle(arrowBox,[arrowLeft,arrowRight]);
				_.addEle(boxDom,[arrowBox])
				arrowLeft.addEventListener('click',function(){
					prev();
				},false);

				arrowRight.addEventListener('click',function(){
					next();
				},false);
			}	

			function initDot(){
				let dotBox = _.cEle('div');
				_.setStyle(new Map([
					[dotBox,{
						position: 'absolute',
						bottom: '30px',
						left: '50%',
						transform: 'translateX(-50%)'
					}]
				]))
				for(let i = 0; i < liDom.length; i++) {
					let dotItem = _.cEle('span');
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
						let index = e.srcElement.dataset.index;
						goIndex(index)
					},false);
					_.addEle(dotBox,[dotItem])
				}
				_.addEle(boxDom,[dotBox])
			}

			function resetDotColor(){
				if (!_options.dotShow)  return;
				let dotList = boxDom.getElementsByClassName('gr-slider-dot');
				for (let i = 0; i < dotList.length; i++) {
					if (i === index) {
						dotList[i].style.backgroundColor = '#fff';
					} else {
						dotList[i].style.backgroundColor = '#ddd'
					}
				}
			}

			function play(){
				let timer = setInterval(function(){

				},_options.scrollStayTime * 1000);
			}
		}

		// 下拉框
		collapse(el){
			console.log(el + ' .gr-collapse-header')
			const header = _.qSel(el + ' .gr-collapse-header');
			const content = _.qSel(el + ' .gr-collapse-content');
			header.addEventListener('click', function(e){
				if (e.srcElement.attributes[0].value.indexOf('active') !== -1){
					header.classList.remove('active')
					content.classList.remove('active')
				} else {
					header.classList.add('active')
					content.classList.add('active')
				}
			},false)
		}

		tabs(el){
			let header = _.qSel(el + ' .gr-tab-header');
			let titList = _.qSels(el + ' .gr-tab-tit');
			let contentList = _.qSels(el + ' .gr-tab-context');
			header.addEventListener('click',function(e){
				let clickIndex = parseInt(e.srcElement.dataset.index);
				if (isNaN(clickIndex)) return;
				titList.forEach((item,index) => {
					if (index === clickIndex) {
						titList[index].classList.add('active');
					} else {
						titList[index].classList.remove('active');
					}
				});
				contentList.forEach((item,index) => {
					if (index === clickIndex) {
						contentList[index].classList.add('active');
					} else {
						contentList[index].classList.remove('active');
					}
				})
			},false)
		}
	}
	

	window.growth = new Growth();
}(window))