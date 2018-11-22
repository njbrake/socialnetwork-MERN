import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { getCurrentProfile } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		return <h1> Dashboard</h1>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});
export default connect(
	mapStateToProps,
	{ getCurrentProfile },
)(withRouter(Dashboard));
