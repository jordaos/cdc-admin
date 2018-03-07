import React, { Component } from 'react';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class PaginationTable extends Component {
  constructor() {
    super();
    this.state = {loadingText: 'Loading.'};
  }

  componentDidMount() {
    let qtd = 2;
    this.interval = setInterval(() => {
      qtd = qtd % 4;
      qtd++;
      this.setState({loadingText: "Loading" + Array(qtd).join(".")});
    }, 600);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lista !== []) {
      clearInterval(this.interval);
    }
  }  

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.lista}
          columns={this.props.columns}
          defaultPageSize={10}
          noDataText={this.state.loadingText}
        />
      </div>
    );
  }
}

export default PaginationTable;