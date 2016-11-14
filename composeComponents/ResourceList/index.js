import React, { Component, PropTypes } from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';
import Item from './Item';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import HOC from '../../app/HOC';
import applyHeader from '../../app/HOC/applyHeader';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      errorMessage: '',
    };
  }
  componentDidMount() {
    Promise.resolve(this.props.data())
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  }

  render() {
    const {
      ...others,
    } = this.props;
    const {
      data,
    } = this.state;
    return (
      <ScrollView
        {...others}
        style={{ flex: 1 }}
      >
        {this.state.errorMessage ?
          <Text>{this.state.errorMessage}</Text>
        : null}

        {this.state.loading ?
          <Text>{'loading...'}</Text>
        : null}

        {data.map((rowData, i) => (
          <Item data={rowData} key={i} />
        ))}
      </ScrollView>
    );
  }
}

List.defaultProps = {
  allowCreate: true,
  infiniteScroll: true,
  data: () => [],
};

List.propTypes = {
  allowCreate: PropTypes.bool,
  data: PropTypes.func, // can return the data, or a promise that resolves with the data
  infiniteScroll: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    open: state.drawer.open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

const composedList = HOC(List, [applyHeader]);
export default connect(mapStateToProps, mapDispatchToProps)(composedList);
