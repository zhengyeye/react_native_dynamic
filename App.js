/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	AppRegistry,
	Text,
	Image,
	View,
	Alert,
	TextInput,
	TouchableHighlight,
	Keyboard
} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class App extends Component<{}> {
	/**
   * 动态图片(最多九张图)选择显示
   * 
   * @author zhengyeye
   * @returns 
   * @memberof App
   */
	//simgsArr:存放小图片地址的数组  [{index:0,url:"xxx"},{index:1,url:"xxx"},...{index:5,url:"xxx"}]
	//bigimgsArr：大图图片地址[{url:"xxx"},{url:"xxx"},...{url:"xxx"}]
	createImageItem() {
		let defaultImgView;
		if (this.state.simgsArr != null && this.state.simgsArr.length >= 9) {
			//这里的判断根据所传图片张数定
			defaultImgView = null;
		} else {
			defaultImgView = (
				<TouchableHighlight
					activeOpacity={1}
					underlayColor={'#fff'}
					onPress={() => {
						this.onPress();
					}}
				>
					<Image source={{ uri: './img/addimg.png' }} style={{ width: 70, height: 70 }} />
				</TouchableHighlight>
			);
		}

		return (
			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap'
				}}
			>
				{this.state.simgsArr
					? this.state.simgsArr.map((
							i //这里对于图片集合进行循环遍历，以展示九宫格形式  ItemPress()则是另外一个组件(使用react-native-swiper的轮播)
						) => (
							<View
								key={i.url}
								style={{
									width: 70,
									height: 70,
									marginTop: 5,
									marginLeft: (width - 4 * 70) / 5
								}}
							>
								<TouchableHighlight
									activeOpacity={1}
									underlayColor={skin.tint}
									onPress={() => this.ItemPress(i.index)}
								>
									<Image style={{ width: 70, height: 70 }} source={{ uri: i.url }} />
								</TouchableHighlight>
							</View>
						))
					: null}
				<View style={{ width: 70, height: 70, marginLeft: (width - 4 * 70) / 5, marginTop: 5 }}>
					{defaultImgView}
				</View>
			</View>
		);
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: '#fff',
					justifyContent: 'flex-start',
					flex: 1
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 10,
						flex: 3
					}}
				>
					{this.createImageItem()}
				</View>
			</View>
		);
	}
}

//defaultImgView 中的点击事件
onPress = async () => {
	let uriArray = []; //图片上传组件的本地路径数组集合
	let simgsArr = this.state.simgsArr == '' ? [] : this.state.simgsArr; //小图路径
	let bimgsArr = this.state.bimgsArr == '' ? [] : this.state.bimgsArr; //大图路径
	let imgLength = 9;
	let nowImgsLen = this.state.simgsArr.length;
	let len = imgLength - nowImgsLen;

	//上传图片
	ImagePicker.showImagePicker(image.ImagePickerMultiOptions(len), async (err, selectedPhotos) => {
		//selectedPhotos为选中的图片数组
		if (err) {
			// 取消选择
			return;
		}
		let index = 0;
		let result = selectedPhotos;
		let len = result.length;
		//处理上传的图片
		for (let i = 0, len = result.length; i < len; i++) {
			simgsArr.length == 0 ? 0 : simgsArr.length + 1;
			let uploadres = await Upload.UploadImg(result[i], 'ywg_dynamic'); //这里是与接口交互的图片处理过程
			simgsArr.push({ index: simgsArr.length, url: uploadres.split(',')[0] });
			bimgsArr.push({ url: uploadres.split(',')[1] });
		}
		this.setState({
			imgs: result,
			simgsArr: simgsArr,
			bimgsArr: bimgsArr
		});
		this.createImageItem();
		//上传图片完成后的提示
		let toast = Toast.show('成功上传' + len + '张图片', {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM
		});
		setTimeout(function() {
			Toast.hide(toast);
		}, 2000);
	});
};
const styles = StyleSheet.create({});
