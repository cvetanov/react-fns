/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { render } from '../utils';

export interface GeoPositionProps {
  isLoading: boolean;
  coords?: {
    longitude: number;
    latitude: number;
  };
  error?: PositionError;
}

export class GeoPosition extends React.Component<
  SharedRenderProps<GeoPositionProps>,
  GeoPositionProps
> {
  geoId: any;

  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.requestGeo();
  }

  requestGeo = () => {
    this.setState({ isLoading: true });
    this.geoId = navigator.geolocation.watchPosition(
      (position: Position) =>
        this.setState({
          isLoading: false,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: undefined,
        }),
      (error: PositionError) => this.setState({ error, isLoading: false })
    );
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return render(this.props, this.state);
  }
}
