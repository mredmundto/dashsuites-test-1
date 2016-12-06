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

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    this.setState({
      dataBlob: data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  _renderRow(rowData, a, b) {
    return (
      <Item
        id={b}
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
      searchCriteria,
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
            criteria={searchCriteria}
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
  searchCriteria: [],
  onSearchModalRequestClose: () => {},
  searchModalOpen: false,
  searchable: false,
  allowCreate: true,
  infiniteScroll: true,
  onSearchClose: () => {},
  data: [],
  displayedInList: [],
};

List.propTypes = {
  searchCriteria: PropTypes.array,
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

// exporting both list and composedList with is with header to render in different cases
export default List;
export { composedList as ResourceListWithHeader };
