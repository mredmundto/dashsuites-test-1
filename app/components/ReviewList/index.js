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

  selectReview(selectedReview) {
    // this.props.selectReview(selectedReview);
    // Actions.RoomView();
  }
  render() {
    const {
      toggleDrawer,
    } = this.props;
    return (
      <View
        style={styles.container}
      >
        <ResourceList
          headerProps={{
            onLeft: () => {
              toggleDrawer(true);
            },
            onRight: () => {
              this.setState({ modalOpen: true });
            },
          }}
          data={this.props.reviews}
          onItemPress={this.selectReview}
          searchModalOpen={this.state.modalOpen}
          onSearchClose={() => {
            this.setState({ modalOpen: false });
          }}
          onSearchModalRequestClose={() => {
            this.setState({ modalOpen: false });
          }}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.addItem()}
        >
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
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

function mapStateToProps(store) {
  const storeReviews = store.list.getIn(['reviews', 'list']);
  const reviews = [];
  storeReviews.forEach(mapReview => {
    reviews.push(mapReview.toJS());
  });
  return {
    reviews,
  };
}

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
