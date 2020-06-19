# growth
决定自己开始封装库和插件

# 用法

引入growth.js
```
<script src='./src/growth.js'></script>
// 或者引入压缩版
<script src='./dist/growth.js'></script>
```
引入growth.css
```
<link rel="stylesheet" href="./src/index.css">
```
### 设置dom样式
```
// 第一个参数是获取的Dom节点，第二个参数是要设置的css样式对象，第三个参数是样式设置完成后执行的回调函数
growth.setStyle(document.querySelector('.gr-blue-btn'),{
		backgroundColor:'red',
		color:'blue'
	},function(){
		console.log('setStyleSuccess')
	})
```
### 轮播图
1. 编辑html:
```
<div class="gr-slider-box">
	<ul>
		<li><img src='./imgs/lb1.jpg'/></li>
		<li><img src='./imgs/lb2.jpg'/></li>
		<li><img src='./imgs/lb3.jpg'/></li>
	</ul>
</div>
```
2. 编辑js:
```
var slider = growth.slider({
		el:'.gr-slider-box',//必填 
		width: '50em',//选填 轮播图的宽度 支持单位px,em,rem
		height:'520px',//选填 轮播图的高度 支持单位px,em,rem
		autoSroll: false, // 选填 是否自动轮播 默认为true
		scrollStayTime: 1,// 选填 自动轮播时图片停留时间 1代表1s
		scrollTransitonTime: 1, // 选填，自动轮播时图片切换动画的时间间隔 
		cycle:true,//选填
		dotShow:true,//选填
		firstShow:1//选填 第一张显示的图片
	});

slider.goIndex(1,cb); // 调用此方法用于跳转到某轮播图 第一个参数传图片的index值 第二个参数cb为跳转完成后执行的回调函数
slider.next(cb); // 调用此方法用于去上一张图 cb为跳转完成后执行的回调函数
slider.prev(cb); // 调用此方法用于去下一张 cb为跳转完成后执行的回调函数
```
### 创建模态框
```
growth.showModals({
		title:'提示',// 选题 标题
		content:'确认删除吗？', // 选填 模态框内容
		confirmText: '确定',// 选填 确定按钮的文本
		cancelText: '取消',// 选填 取消按钮文本
		onConfirm:() => {
			alert('确认')// 确认回调函数
		},
		onCancel:()=> {
			alert('取消') // 取消回调函数
		}
	})
```
### tab
1. 编辑html
```
<!-- gr-tab-box类名可任意取，主要是用于js初始化时传入类名 -->
<div class="gr-tab-box">
	<div class="gr-tab-header">
		<a href='#' class="gr-tab-tit active" data-index='0'>首页</a>
		<a href='#' class="gr-tab-tit" data-index='1'>新闻</a>
		<a href='#' class="gr-tab-tit" data-index='2'>抽奖</a>
	</div>
	<div class="gr-tab-content">
		<div class="gr-tab-context active" data-index='0'>首页内容</div>
		<div class="gr-tab-context" data-index='1'>新闻内容</div>
		<div class="gr-tab-context" data-index='2'>抽奖内容</div>
	</div>
</div>
```
2. 编辑js
```
growth.tabs('.gr-tab-box')
```
### 下拉框
1. 编辑html
```
<!-- 属性gr-collapse-box可以任意命名 -->
<div class="gr-collapse-box" style="width:200px;">
	<div class="gr-collapse-header">
		点击出现下拉列表
	</div>
	<div class="gr-collapse-content">
		请不要把我隐藏起来！哼！
	</div>
</div>
```	
2. 编辑js
```
growth.collapse('.gr-collapse-box');
```
### 跑马灯
1. html
```
<div class="gr-marqueen">
	<span>季节是人心中的年轮，一日一日流动的光芒里，你终于忘不了的和总是放不下的，就那么沉淀下来，一圈又一圈，镂刻在离灵魂最近的地方，人们常常混然不觉。只是当某天惊讶的看到镜中自己褶皱的容颜时，才始发现，原来沧桑年年有痕。</span>
</div>
```
2. 编辑js
```
growth.marqueen({
		startStay:2,// 选填，开头文字停留时间，1为1s,0为0s,不填默认停留1s
		endStay:1 // 选填，结尾文字停留时间，1为1s,0为0s,不填默认停留1s
		speed:'quick' // 选填 文字滑动速度，可选值：slow,medium,quick 
	});
```