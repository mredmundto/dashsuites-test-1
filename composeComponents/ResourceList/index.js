import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import Item from './Item';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import HOC from '../../app/HOC';
import applyHeader from '../../app/HOC/applyHeader';
import SearchModal from '../Search/Modal';

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
      searchable,
      searchModalOpen,
      onSearchClose,
      onSearchModalRequestClose,
      onItemPress,
      ...others,
    } = this.props;
    const {
      data,
    } = this.state;
    return (
      <View>
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
        {searchable ?
          <SearchModal
            onRequestClose={onSearchModalRequestClose}
            visible={searchModalOpen}
            onClose={onSearchClose}
          />
        : null}
      </View>
    );
  }
}

List.defaultProps = {
  onSearchModalRequestClose: () => {},
  searchModalOpen: false,
  searchable: true,
  allowCreate: true,
  infiniteScroll: true,
  data: () => [],
  onSearchClose: () => {},
};

List.propTypes = {
  onSearchModalRequestClose: PropTypes.func,
  searchModalOpen: PropTypes.bool,
  searchable: PropTypes.bool,
  onSearchClose: PropTypes.func,
  allowCreate: PropTypes.bool,
  data: PropTypes.func, // can return the data, or a promise that resolves with the data
  infiniteScroll: PropTypes.bool,
  onItemPress: PropTypes.func,
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
const connectedList = connect(mapStateToProps, mapDispatchToProps)(composedList);

export default connectedList;
