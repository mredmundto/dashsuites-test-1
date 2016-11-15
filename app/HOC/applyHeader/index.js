import React, { PropTypes } from 'react';
import DefaultHeader from '../../components/Header';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
const ApplyHeader = ComposedComponent => {
  const ExtendedComponent = (props) => {
    const {
      Header,
      headerProps,
      router,
      ...others,
    } = props;
    const RenderedHeader = Header || DefaultHeader;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
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
