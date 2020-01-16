// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class MattermostLogo extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='generic_icons.mattermost'
                    defaultMessage='Mattermost Logo'
                >
                    {(ariaLabel) => (
                        <svg version="1.1" 
                             id="Layer_1"
                             x="0px" 
                             y="0px"
                        	 viewBox="0 0 64 64" 
                        	 style={style.background}
                        	 aria-label={ariaLabel}
                        	 >
                        <g>
                        	<circle id="XMLID_365_" style={style.st0} cx="31.19" cy="8.76" r="5.91"/>
                        	<path id="XMLID_334_" style={style.st1} d="M24.37,37.28L1.89,7.37C0.66,5.42,2.05,2.88,4.36,2.88l0.42,0c0.81,0,1.58,0.34,2.14,0.93
                        		l22.24,20.07c1.15,1.23,3.11,1.24,4.26,0.01L55.9,3.79c0.55-0.59,1.32-0.92,2.13-0.92h0c2.31,0,3.71,2.55,2.46,4.5L38.04,37.03
                        		c-0.3,0.47-0.46,1.02-0.46,1.57l0,22.25l-12.76,0l0-22.01C24.82,38.29,24.67,37.75,24.37,37.28z"/>
                        </g>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}

const style = {
    background: {
        enableBackground: 'new 0 0 64 64',
    },
    st0: {
        fill: '#F51F02'
    },
    st1: {
        fill: '#283658'
    },
};
