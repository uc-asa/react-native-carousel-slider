import { Dimensions, View, Image } from "react-native";
import React, { Component } from "react";
import Dots from "./Dots";

const width = Dimensions.get("window").width;

export default class Item extends Component {
  render() {
    return (
      <View>
        <Image
          source={{ uri: this.props.source }}
          resizeMode="cover"
          style={{ width: width, height: this.props.height }}
        />
        {this.props.dots ? (
          <Dots
            slideIndex={this.props.slideIndex}
            dataSource={this.props.dataSource}
            dotsClass={this.props.dotsClass}
            dotActiveStyle={this.props.dotActiveStyle}
          />
        ) : null}
      </View>
    );
  }
}
