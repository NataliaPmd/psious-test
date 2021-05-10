import React, { Component } from "react";
import "./styles/Home.css";
import Block from "./../components/Block";
import Grid from "./../components/Grid";

class Home extends Component {
  state = {
    selectedBlock: {
      color: "",
      text: "",
    },
  };
  setSelectedBlock = (selectedBlock) => {
    this.setState({
      selectedBlock: selectedBlock,
    });
  };
  render() {
    return (
      <div className="home">
        <div className="home-blocks">
          <Block
            color="#009BD3"
            text="Audio 1"
            setSelectedBlock={this.setSelectedBlock}
          />
          <div className="home-blocks-separator"></div>
          <Block
            color="#D3008D"
            text="Audio 2"
            setSelectedBlock={this.setSelectedBlock}
          />
          <div className="home-blocks-separator"></div>
          <Block
            color="#8900E4"
            text="Audio 3"
            setSelectedBlock={this.setSelectedBlock}
          />
        </div>
        <div className="home-separator"></div>
        <div className="home-grid">
          <Grid selectedBlock={this.state.selectedBlock} />
        </div>
      </div>
    );
  }
}
export default Home;
