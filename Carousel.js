import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Item from "./Item";

const width = Dimensions.get("window").width;

export default class Carousel extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      index: 0,
      autoPlay: typeof props.autoPlay == "undefined" ? true : props.autoPlay
    };
    this.autoplaySpeed = props.autoplaySpeed || 3000;
    this.dataSource = props.dataSource || [];
    this.dots = typeof props.dots == "undefined" ? true : props.dots;
    this.dotsClass = props.dotsClass || {};
    this.dotActiveStyle = props.dotActiveStyle || {};
    this.height = props.height || 150;
    this.infinite =
      typeof props.infinite == "undefined" ? true : props.infinite;
  }

  componentDidMount() {
    //默认显示item
    if (this.props.initialSlide >= 0) {
      if (this.props.initialSlide >= this.dataSource.length) {
        throw new Error("无效的initialSlide");
      }
      this.time = setTimeout(() => {
        //如果不加延迟，不会滚动
        this._startScroll(this.props.initialSlide);
        this.time && clearTimeout(this.time);
      }, 1);
    }

    //自动滚动item
    if (this.state.autoPlay) {
      this.timeID = setInterval(() => {
        if (!this.state.autoPlay) {
          this.setState({ autoPlay: true });
          return;
        }
        let page = this.state.index + 1;
        if (page == this.dataSource.length) {
          page = 0;
        }
        this._startScroll(page);
      }, this.autoplaySpeed);
    }
  }

  componentWillUnmount() {
    this.timeID && clearInterval(this.timeID);
  }

  slickGoTo(page) {
    if (page >= this.dataSource.length) {
      throw new Error("无效的值");
    }
    this._startScroll(page);
  }

  //开始滑动
  _onScrollBeginDrag(e) {
    this.setState({ autoPlay: false });
    this.startX = e.nativeEvent.contentOffset.x;
    if (
      this.props.beforeChange &&
      typeof this.props.beforeChange == "function"
    ) {
      let next = this.state.index + 1;
      if (next == this.dataSource.length) {
        next = 0;
      }
      this.props.beforeChange(this.state.index, next);
    }
  }

  //滑动结束
  _onMomentumScrollEnd(e) {
    let page = Math.floor(e.nativeEvent.contentOffset.x / width);
    if (e.nativeEvent.contentOffset.x == this.startX) {
      if (page + 1 == this.dataSource.length) {
        page = 0;
      } else if (page == 0) {
        page = this.dataSource.length - 1;
      }
    }
    this._startScroll(page);
    if (this.props.afterChange && typeof this.props.afterChange == "function") {
      this.props.afterChange(page);
    }
  }

  _startScroll(page) {
    this.setState({ index: page });
    this.refs.carousel.scrollTo({
      x: page * width,
      y: 0,
      animated: true
    });
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref="carousel"
        onScrollBeginDrag={e => this._onScrollBeginDrag(e)}
        onMomentumScrollEnd={e => this._onMomentumScrollEnd(e)}
      >
        {this.dataSource.map(function(item, index) {
          return (
            <TouchableOpacity
              key={index}
              onPress={e => this.props.onPress && this.props.onPress(e, index)}
            >
              <Item
                source={item}
                height={this.height}
                slideIndex={this.state.index}
                dataSource={this.dataSource}
                dots={this.dots}
                dotsClass={this.dotsClass}
                dotActiveStyle={this.dotActiveStyle}
              />
            </TouchableOpacity>
          );
        }, this)}
      </ScrollView>
    );
  }
}
