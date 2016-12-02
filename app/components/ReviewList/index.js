import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import allList from '../../../composeComponents/ResourceList';
import Action from './../List/action';

const ResourceList = allList.composedList;

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

const displayedInList = ['issueList', 'room name', 'createdAt'];
// const displayedInList = ['roomname', 'createdAt'];

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.selectReview = this.selectReview.bind(this);
  }

  componentWillMount() {
    // get all reviews
    // fetch('http://127.0.0.1:3000/REST/review', {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then((res) => {
    //   return res.json();
    // })
    // .then((resJSON) => {
    //   this.props.loadReview(resJSON);
    // })
    // .catch((e) => {
    //   console.log('e', e);
    //   throw e;
    // });
  }

  addItem() {
    // Actions.RoomCreate();
  }

  selectReview(selectedReview, reviewIndex) {
    //Actions.ReviewView(`${selectedReview.roomIndex} reviewList ${reviewIndex}`);
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
          data={reviewList}
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
  loadReview: PropTypes.func,
  reviewList: PropTypes.array,
};

const mapStateToProps = (store) => {
  // console.log('store in review', store.list.toJS());
  const reviewList = store.list.toJS().review;
  // this is to map the room name from the room object back to the review array
  reviewList.forEach((review) => {
    review['room name'] = review.room.name;
  });

  return {
    reviewList,
  };

  // const roomList = store.list.get('data');
  // const reviewList = roomList
  //   .map((room, i) => {
  //     return room.get('reviewList')
  //       .map(review => review.set('room', room.get('name')).set('roomIndex', i));
  //   })
  //   .flatten(1);

  // return {
  //   roomList,
  //   reviewList,
  // };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadReview: (initObj) => {
    //   dispatch(Action.loadReview(initObj));
    // },
    toggleDrawer: (open) => {
      return dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
