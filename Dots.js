import { StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class Dots extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.dataSource.map((item, index) => {
          return (
            <View
              key={index}
              style={
                index == this.props.slideIndex ? (
                  [styles.dot_select, this.props.dotSelectedClass]
                ) : (
                  [styles.dot, this.props.dotsClass]
                )
              }
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: "white",
    marginLeft: 5
  },
  dot_select: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: "red",
    marginLeft: 5
  }
});
