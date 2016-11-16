import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Item from './Item';
// import Promise from 'bluebird';
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
      <Item
        onItemPress={this.props.onItemPress}
        data={rowData}
        displayedInList={this.props.displayedInList}
      />
    );
  }

  render() {
    const {
      searchable,
      searchModalOpen,
      onSearchClose,
      onSearchModalRequestClose,
      displayedInList,
      ...others,
    } = this.props;
    const {
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
          <ListHeader
            displayedInList={displayedInList}
          />
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
  displayedInList: [],
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
  displayedInList: PropTypes.array,
};

const composedList = HOC(List, [applyHeader]);

export default composedList;
