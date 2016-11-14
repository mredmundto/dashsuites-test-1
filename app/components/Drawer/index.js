import React, { Component, PropTypes } from 'react';
import SideMenu from './SideMenu';
// import {
//   DrawerLayoutAndroid,
// } from 'react-native';
// using third-party library to get controlled component
import RNDrawer from 'react-native-drawer';

import preventPressBack from '../../HOC/android/preventPressBack';
import HOC from '../../HOC';
import { connect } from 'react-redux';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.backButtonHandler = this.backButtonHandler.bind(this);
    this.state = {};
  }

  backButtonHandler() {
    if (this.props.open) {
      this.props.toggleDrawer(false);
      return true;
    }
  }

  render() {
    const {
      open,
      toggleDrawer,
      ...others,
    } = this.props;
    return (
      <RNDrawer
        {...others}
        open={open}
        tapToClose
        styles={{
          drawer: {
            backgroundColor: 'white',
            shadowColor: '#000000',
          },
          mainOverlay: { backgroundColor: 'black', opacity: 0 },
        }}
        negotiatePan
        type="overlay"
        closedDrawerOffset={0}
        panOpenMask={0.1}
        panCloseMask={0.3}
        openDrawerOffset={100}
        tweenHandler={(ratio) => ({
          mainOverlay: { opacity: (ratio * 0.65) },
        })}
        onClose={() => {
          toggleDrawer(false);
        }}
        tweenEasing={'linear'}
        content={<SideMenu toggleDrawer={toggleDrawer} />}
      />
    );
  }
}

Drawer.propTypes = {
  navigationState: PropTypes.object,
  onNavigate: PropTypes.func,
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
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

const composedDrawer = HOC(Drawer, [preventPressBack]);

const connectedDrawer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(composedDrawer);

export default connectedDrawer;
