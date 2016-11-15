import React, { Component, PropTypes } from 'react';
import {
  Text,
  ListView,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Item from './Item';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import HOC from '../../app/HOC';
import applyHeader from '../../app/HOC/applyHeader';
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
      dataBlob: '',
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
    this.state.dataSource = this.state.dataSource.cloneWithRows([]);
    this._renderRow = this._renderRow.bind(this);
  }

  componentDidMount() {
    Promise.resolve(this.props.data())
      .then((data) => {
        this.setState({
          dataBlob: data,
          dataSource: this.state.dataSource.cloneWithRows(data),
        });
        console.log(this.state.dataSource);
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  }

  _renderRow(rowData) {
    return (
      <Item onItemPress={this.props.onItemPress} data={rowData} />
    );
  }

  render() {
    const {
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
  allowCreate: true,
  infiniteScroll: true,
  data: () => [],
};

List.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(composedList);
