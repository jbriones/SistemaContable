import React, { PropTypes } from 'react';
import styled from 'styled-components';
const _ = require('lodash');

const propTypes = {
  items: PropTypes.oneOfType([
    React.PropTypes.array.isRequired,
    React.PropTypes.object.isRequired,
  ]),
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
};

const PaginadorContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;

  a{
    width: 100px;
    color: blue;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  div.options{
    float: left;
  }

  ul.items{
    padding: 0;
    float: left;
    list-style: none;
    display: inline-block;
    margin: 0;
  }
  ul.items li{
    float: left;
  }
  ul.items li.active{
    font-weight: bold;
  }
`;

class Paginador extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
       // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    const items = this.props.items;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

       // get new pager object for specified page
    pager = this.getPager(items.length, page);

       // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

       // update state
    this.setState({ pager });

       // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
       // default to first page
    currentPage = currentPage || 1;

       // default page size is 10
    pageSize = pageSize || 10;

       // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage,
      endPage;
    if (totalPages <= 10) {
           // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
           // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

       // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

       // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

       // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  render() {
    const pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <PaginadorContainer>
        <div className="options back-buttons">
          <a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(1)}>Primero</a>
          <a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage - 1)}>Anterior</a>
        </div>
        <ul className="items">
          {pager.pages.map((page, index) =>
            <li key={index} className={pager.currentPage === page ? 'active' : ''}>
              <a onClick={() => this.setPage(page)}>{page}</a>
            </li>
          )}
        </ul>
        <div className="options next-buttons">
          <a className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage + 1)}>Siguiente</a>
          <a className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.totalPages)}>Último</a>
        </div>
      </PaginadorContainer>
    );
  }
}

Paginador.propTypes = propTypes;
Paginador.defaultProps = defaultProps;
export default Paginador;
