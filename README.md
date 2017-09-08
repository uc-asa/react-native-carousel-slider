## 介绍
使用react native scrollList封装，轮播图
## 安装
```
npm install react-native-carousel-slider
```
## API
属性|说明|类型|默认值
---|---|---|---
dataSource | 数据源| Array|[]
height | 轮播图高度| number|150
initialSlide | 手动设置当前显示的索引| number|0
autoplay | 是否自动切换| Boolean|true
autoplaySpeed | 切换时间| number|3000 ms
dots | 是否显示面板指示点| Boolean|true
dotsClass | 指示点样式| Object|无
dotSelectedClass | 当前激活的指示点样式| Object|无
beforeChange  | 切换面板前的回调函数| (from: number, to: number): void|无
afterChange | 切换面板后的回调函数| (current: number): void|无
onPress | 点击面板的回调函数| (event: object,index:number): void|无
## 效果
![image](http://note.youdao.com/yws/api/personal/file/WEBd626ffc915a73bf5b1fb5a3a95ffef8c?method=download&shareKey=d8c0447c13683703738090d7c228aae8)
## 用法
```
import { AppRegistry, View } from "react-native";
import React, { Component } from "react";
import Carousel from "react-native-carousel-slider";

const imgs = [
  "https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png",
  "https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png",
  "https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png"
];

export default class Index extends Component {
  beforeChange(from, to) {
    console.log("beforeChange--->", from, to);
  }

  afterChange(current) {
    console.log("afterChange--->", current);
  }

  onPress(event, index) {
    console.log(event, index);
  }

  render() {
    return (
      <View>
        <Carousel
          dataSource={imgs}
          autoPlay={false}
          initialSlide={0}
          dots={true}
          beforeChange={(from, to) => this.beforeChange(from, to)}
          afterChange={current => this.afterChange(current)}
          dotsClass={{ backgroundColor: "blue" }}
          dotActiveStyle={{ backgroundColor: "red" }}
          onPress={(event, index) => this.onPress(event, index)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("Test", () => Index);


```