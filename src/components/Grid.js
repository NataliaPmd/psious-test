import React, { Component } from "react";
import "./styles/Grid.css";
import Row from "./Row";


class Grid extends Component {
  constructor(props) {
    super(props)
    this.updateOrder = this.updateOrder.bind(this)
    this.updatePanes = this.updatePanes.bind(this)
    this.createPane = this.createPane.bind(this)
  }
  state = {
    0: {
      order: [],
      panes: {
        
      },
    },
    1: {
      order: [],
      panes: {
        
      },
    },
    2: {
      order: [],
      panes: {
        
      },
    },
  };

  updateOrder(sortablePaneId, newOrder) {
    this.setState((prevState) => ({
      [sortablePaneId]: {
        panes: prevState[sortablePaneId].panes,
        order: newOrder
      }
    }))
  }

  updatePanes(sortablePaneId, updatedPanes) {
    this.setState((prevState) => ({
      [sortablePaneId]: {
        panes: {
          ...updatedPanes,
        },
        order: prevState.[sortablePaneId].order,
      }
    })) 
  }

  createPane(sortablePaneId, newPane, newOrder) {
    this.setState((prevState) => ({
      [sortablePaneId]: {
        panes: {
          ...prevState.[sortablePaneId].panes,
          ...newPane
        },
        order: newOrder,
      }
    })) 
  }  

  render() {
    return (      
      <div>
        <div className="grid">
          {Object.keys(this.state).map((sortablePaneId) => {
          return(
            <Row
              selectedBlock = {this.props.selectedBlock}
              key = {sortablePaneId}
              sortablePaneId = {sortablePaneId}
              order = {this.state[sortablePaneId].order}
              panes = {this.state[sortablePaneId].panes}
              updateOrder = {this.updateOrder}
              createPane = {this.createPane}
              updateWidth = {this.updatePanes}
            />        
          )
          })}
        </div>  
        <div onClick={()=>{console.log(this.state)}} className="button">
          Export Data
        </div>
      </div>
    );
  }
}
export default Grid;
