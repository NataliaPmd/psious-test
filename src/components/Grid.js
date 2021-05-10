import React, { Component } from "react";
import "./styles/Grid.css";
import Block from "./Block";

class Grid extends Component {
  state = {
    selectedBlock: {
      color: "",
      text: "",
    },
    blockList: [],
  };
  setSelectedBlock = (selectedBlock) => {
    this.setState({
      selectedBlock: selectedBlock,
    });
  };

  allowDrop = (e) => {
    e.preventDefault();
  };

  drop = (e) => {
    e.preventDefault();
    this.state.blockList.push(this.props.selectedBlock);
    this.setState({
      blockList: this.state.blockList,
    });
  };
  render() {
    return (
      <div className="grid" onDrop={this.drop} onDragOver={this.allowDrop}>
        {this.state.blockList.map((block, i) => {
          return (
            <div key={i}>
              <Block
                color={block.color}
                text={block.text}
                setSelectedBlock={this.setSelectedBlock}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
export default Grid;
