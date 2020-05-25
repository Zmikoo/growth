# growth
决定自己开始封装库和插件

# 用法

引入growth.js
```
<script src='./libs/growth.js'></script>
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
growth.slider({
		el:'.gr-slider-box',//必填
		width: '50em',//选填 支持单位px,em,rem
		height:'520px',//选填 支持单位px,em,rem
		autoSroll: false, // 选填 是否自动轮播 默认为true
		scrollStayTime: 1,// 选填 自动轮播时图片停留时间 1代表1s
		scrollTransitonTime: 1, // 选填，自动轮播时图片切换动画的时间间隔 
		cycle:true,//选填
		dotShow:true,//选填
		firstShow:1//选填 第一张显示的图片
	});
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
