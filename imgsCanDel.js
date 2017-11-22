import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
let Dimensions = require('Dimensions');
import skin from '../../style';
import image from '../../logic/image';
import event from '../../logic/event';
let { width } = Dimensions.get('window');

/**
 * 
 * 动态中的九宫格图片展示(带删除功能：上传图片能用到的大图展示组件)
 * @author zhengyeye
 * @export
 * @class imgsCanDel
 * @extends {Component}
 */
export default class imgsCanDel extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerStyle: {
			backgroundColor: skin.tujibg, //导航条背景色
			height: 60 //导航条高度,40导航条高度+20沉侵高度
		},
		headerRight: (
			<TouchableOpacity
				activeOpacity={1}
				underlayColor={skin.tint}
				onPress={() => navigation.state.params.clickDel()}
				style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}
			>
				<View>
					<Image style={{ width: 16, height: 16 }} source={image.newsimages.del} />
				</View>
			</TouchableOpacity>
		)
	});

	_press = () => {};
	//构造方法
	constructor(props) {
		super(props);
		this.nav = this.props.navigation; //获取导航对象
		this.params = this.nav.state.params; //获取参数
		this.state = {
			index: this.params.index, //图片下标
			list: this.params.bigimgsdata
		};
	}
	//组件初始化完毕
	componentDidMount() {
		let index = this.params.index;
		this.setState({
			index: index,
			list: this.params.bigimgsdata
		});
		this.props.navigation.setParams({
			clickDel: this._delImg //顶部删除事件
		});
	}
	//清空按钮触发的点击事件
	_delImg = async () => {
		let imgIndex = this.state.index;
		let bImg = this.state.list; //这是大图集合
		let newBimg = new Array(); //删掉大图后组成的图片集合
		for (let i = 0, len = bImg.length; i < len; i++) {
			if (i != imgIndex) {
				newBimg.push(bImg[i]);
			}
		}
		let nowIndex = imgIndex - 1;
		this.setState({
			list: newBimg,
			index: nowIndex < 0 ? 0 : nowIndex
		});
		if (newBimg.length == 0) {
			this.nav.goBack();
		}
		event.Send(event.Events.dynamic.delImg, { index: imgIndex, bImg: newBimg });
	};
	render() {
		if (this.state.list == 0) {
			//页面还未加载完成
			return <View style={dyImgsStyle.container} />;
		} else {
			//页面加载完成
			return (
				<View style={dyImgsStyle.container}>
					<ImageViewer
						index={this.state.index}
						imageUrls={this.state.list}
						onChange={index => {
							this.setState({ index: index });
						}}
						renderHeader={() => {
							return <Text>我是头部</Text>;
						}}
						renderFooter={() => {
							return <Text>我是脚步</Text>;
						}}
						onLongPress={this.longpress}
						saveToLocalByLongPress={false}
						//索引指示器重写
						renderIndicator={(currentIndex, allSize) => {
							return null;
						}}
					/>
					<View style={{ justifyContent: 'flex-end' }}>
						<View style={dyImgsStyle.indexOuterStyle}>
							<Text style={dyImgsStyle.indexText}>
								{this.state.index + 1 + '/' + this.state.list.length}
							</Text>
						</View>
					</View>
				</View>
			);
		}
	}
}
//设置样式
const dyImgsStyle = StyleSheet.create({
	//最外层的容器
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	//图片下标样式开始
	indexOuterStyle: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#000',
		position: 'absolute',
		width: width,
		bottom: 0,
		height: 40,
		// justifyContent: 'flex-end'
		paddingLeft: width - 40 //TODO:这里的样式为什么改不过去？flex-end不起作用
	},
	indexText: {
		flex: 1,
		justifyContent: 'flex-end',
		color: '#fff',
		fontSize: 16
	}
	//图片下标样式结束
});
