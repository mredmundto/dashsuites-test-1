import React, { PropTypes } from 'react';
import DefaultHeader from '../../components/Header';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
const ApplyHeader = ComposedComponent => {
  console.log('applyHeader');
  const ExtendedComponent = (props) => {
    const {
      Header,
      headerProps,
      router,
      ...others,
    } = props;
    console.log('others', others);
    const RenderedHeader = Header || DefaultHeader;
    return (
      <View>
        <RenderedHeader
          title={_.get(router, 'scene.title', 'title')}
          {...headerProps}
        />
        <ComposedComponent {...others} />
      </View>
    );
  };
  ExtendedComponent.propTypes = {
    router: PropTypes.object,
    Header: PropTypes.node,
    headerProps: PropTypes.object,
  };

  const mapStateToProps = (state) => {
    return {
      router: state.router,
    };
  };

  return connect(mapStateToProps)(ExtendedComponent);
};

export default ApplyHeader;
