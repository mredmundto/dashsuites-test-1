import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ResourceList from '../../../composeComponents/ResourceList';
import Action from './../List/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 20,
    margin: 5,
  },
  addButton: {
    elevation: 5,
    backgroundColor: '#1976d2',
    height: 65,
    width: 65,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 35,
    color: 'white',
  },
});

const displayedInList = ['issues', 'room', 'created'];

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.selectReview = this.selectReview.bind(this);
  }

  addItem() {
    // Actions.RoomCreate();
  }

  selectReview(selectedReview, reviewIndex) {
    Actions.ReviewView(`${selectedReview.roomIndex} reviewList ${reviewIndex}`);
  }
  render() {
    const {
      reviewList,
      toggleDrawer,
    } = this.props;
    return (
      <View
        style={styles.container}
      >
        <ResourceList
          headerProps={{
            leftImage: require('../../resources/images/path@3x.png'),
            onLeft: () => {
              toggleDrawer(true);
            },
            // onRight: () => {
            //   this.setState({ modalOpen: true });
            // },
          }}
          displayedInList={displayedInList}
          data={reviewList.toJS()}
          onItemPress={this.selectReview}
          searchModalOpen={this.state.modalOpen}
          onSearchClose={() => {
            this.setState({ modalOpen: false });
          }}
          onSearchModalRequestClose={() => {
            this.setState({ modalOpen: false });
          }}
        />
      </View>
    );
  }
}

ReviewList.defaultProps = {
  allowCreate: true,
  reviews: [],
  infiniteScroll: true,
};

ReviewList.propTypes = {
  toggleDrawer: PropTypes.func,
  allowCreate: PropTypes.bool,
  reviews: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  infiniteScroll: PropTypes.bool,
  selectReview: PropTypes.func,
};

const mapStateToProps = (store) => {
  const roomList = store.list.get('data');
  const reviewList = roomList
    .map((room, i) => {
      return room.get('reviewList')
        .map(review => review.set('room', room.get('name')).set('roomIndex', i));
    })
    .flatten(1);

  return {
    roomList,
    reviewList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (open) => {
      return dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
