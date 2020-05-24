# growth
决定自己开始封装库和插件

# 用法
### 轮播图
1. 引入growth.js
```
<script src='./libs/growth.js'></script>
```
2. 编辑html:
```
<div class="gr-slider-box">
	<ul>
		<li><img src='./imgs/lb1.jpg'/></li>
		<li><img src='./imgs/lb2.jpg'/></li>
		<li><img src='./imgs/lb3.jpg'/></li>
	</ul>
</div>
```
3. 编辑js:
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
