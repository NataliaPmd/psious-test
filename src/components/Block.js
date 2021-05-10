import React, { Component } from "react";
import "./styles/Block.css";

class Block extends Component {
  drag = (e) => {
    const { color, text } = this.props;
    this.props.setSelectedBlock({ color, text });
  };
  render() {
    return (
      <div
        style={{ backgroundColor: this.props.color }}
        className="block"
        draggable="true"
        onDragStart={this.drag}
      >
        {this.props.text}
      </div>
    );
  }
}
export default Block;
