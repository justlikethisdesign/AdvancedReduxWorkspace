import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

    // When component appears on the screen - run the signout action function
    componentDidMount() {
        this.props.signout();
    }

    render () {
        return <div>Bi for now</div>
    }
}

export default connect(null, actions)(Signout);
