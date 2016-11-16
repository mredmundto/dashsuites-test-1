import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Item from './Item';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import HOC from '../../app/HOC';
import applyHeader from '../../app/HOC/applyHeader';
import SearchModal from '../Search/Modal';
import ListHeader from './Header';

const viewPortHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: viewPortHeight - 70,
  },
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: '',
      dataBlob: props.data,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => {
          // let result = false;
          // if (r1.length !== r2.length) {
          //   result = true;
          // } else {
          //   for (let i = 0; i < r1.length; i++) {
          //     result = result || r1[i].number !== r2[i].number;
          //     result = result || r1[i].updatedAt !== r2[i].updatedAt;
          //   }
          // }
          // return result;
          return r1 !== r2;
        },
      }),
    };
    this.state.dataSource = this.state.dataSource.cloneWithRows(props.data);
    this._renderRow = this._renderRow.bind(this);
  }

  // componentDidMount() {
  //   Promise.resolve(this.props.data())
  //     .then((data) => {
  //       this.setState({
  //         dataBlob: data,
  //         dataSource: this.state.dataSource.cloneWithRows(data),
  //       });
  //       console.log(this.state.dataSource);
  //     })
  //     .catch((err) => {
  //       this.setState({ errorMessage: err.message });
  //     });
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.length === nextProps.data.length) return;
    const data = nextProps.data;
    this.setState({
      dataBlob: data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  _renderRow(rowData) {
    return (
      <Item onItemPress={this.props.onItemPress} data={rowData} />
    );
  }

  render() {
    const {
      searchable,
      searchModalOpen,
      onSearchClose,
      onSearchModalRequestClose,
      ...others,
    } = this.props;
    const {
      dataBlob,
      dataSource,
    } = this.state;
    return (
      <View
        style={styles.container}
        {...others}
      >
        {this.state.errorMessage ?
          <Text>{this.state.errorMessage}</Text>
        : null}

        {this.state.loading ?
          <Text>{'loading...'}</Text>
        : null}

        {searchable ?
          <SearchModal
            onRequestClose={onSearchModalRequestClose}
            visible={searchModalOpen}
            onClose={onSearchClose}
          />
        : null}
        <View>
          <ListHeader data={dataBlob[0]} />
          <ListView
            enableEmptySections
            dataSource={dataSource}
            renderRow={this._renderRow}
          />
        </View>
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
  onSearchClose: () => {},
  data: [],
};

List.propTypes = {
  onSearchModalRequestClose: PropTypes.func,
  searchModalOpen: PropTypes.bool,
  searchable: PropTypes.bool,
  onSearchClose: PropTypes.func,
  allowCreate: PropTypes.bool,
  data: PropTypes.array, // can return the data, or a promise that resolves with the data
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
