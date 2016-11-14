import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Item from './Item';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: '',
    };
  }
  componentDidMount() {
    if (typeof this.props.data === 'function') {
      this.data()
      .then((data) => {

      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
    }
  }

  render() {
    const {
      data,
      ...others,
    } = this.props;
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
  data: [],
};

List.propTypes = {
  allowCreate: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
