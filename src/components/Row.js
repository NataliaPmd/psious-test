import React, { Component } from "react";
import { SortablePane, Pane } from "react-sortable-pane";
import "./styles/Row.css";

class Row extends Component {
  allowDrop = (e) => {
    e.preventDefault();
    e.target.style.border = "1px dotted rgba(2, 72, 72, 0.2)";
  };

  dragLeave = (e) => {
    e.target.style.border = "1px solid transparent";
  };

  drop = (e) => {
    e.preventDefault();
    e.target.style.border = "1px solid transparent";
    if (
      this.calcTotalWidth() <=
      document.getElementsByClassName("grid")[0].clientWidth - 40
    ) {
      const newPaneId = Object.keys(this.props.panes).length;
      const newPane = {
        [newPaneId]: {
          width: 80,
          ...this.props.selectedBlock,
        },
      };
      const newOrder = this.props.order;
      newOrder.push(newPaneId.toString());
      this.props.createPane(this.props.sortablePaneId, newPane, newOrder);
    }
  };

  calcTotalWidth() {
    let totalWidth = 0;
    Object.keys(this.props.panes).forEach((paneIndex) => {
      totalWidth += this.props.panes[paneIndex].width;
    });
    return totalWidth;
  }

  resizeStop(key, d) {
    const panes = this.props.panes;
    const lastPaneDistance = document
      .getElementById(
        `element_${this.props.sortablePaneId}_${
          Object.keys(this.props.panes).length - 1
        }`
      )
      .getBoundingClientRect().right;
    const gridDistance = document
      .getElementsByClassName("grid")[0]
      .getBoundingClientRect().right;
    let distance = 0;
    if (lastPaneDistance - gridDistance > 0) {
      distance = d.width - (lastPaneDistance - gridDistance);
    } else {
      distance = d.width;
      if (
        this.calcTotalWidth() + distance >
        document.getElementsByClassName("grid")[0].clientWidth
      ) {
        distance =
          document.getElementsByClassName("grid")[0].clientWidth -
          this.calcTotalWidth();
      }
    }
    panes[key].width += distance;
    this.props.updateWidth(this.props.sortablePaneId, panes);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.keys(this.props.panes).length > Object.keys(prevProps.panes).length
    ) {
      const resizableBase =
        document.getElementsByClassName("__resizable_base__")[0];
      if (resizableBase) {
        resizableBase.remove();
      }
    }
  }

  render() {
    const panes = Object.keys(this.props.panes).map((key) => (
      <Pane
        key={key}
        style={{ backgroundColor: this.props.panes[key].color }}
        className="paneStyle"
        id={`element_${this.props.sortablePaneId}_${key}`}
        size={{ width: this.props.panes[key].width, height: "40px" }}
      >
        {this.props.panes[key].text}
      </Pane>
    ));
    return (
      <div
        className={`${this.props.sortablePaneId} sortable-pane`}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        onDragLeave={this.dragLeave}
      >
        <SortablePane
          direction="horizontal"
          margin={0}
          order={this.props.order}
          isSortable={true}
          resizable={{ x: true }}
          onOrderChange={(order) => {
            this.props.updateOrder(this.props.sortablePaneId, order);
          }}
          onResizeStop={(e, key, dir, ref, d) => {
            this.resizeStop(key, d);
          }}
        >
          {panes}
        </SortablePane>
      </div>
    );
  }
}
export default Row;
