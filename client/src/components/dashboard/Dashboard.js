import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner.js';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading === true) {
			dashboardContent = <Spinner />
		} else {
			//check if user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = <h4>DISPLAY PROFILE </h4>
			} else {
				//User is logged in but no profile
				dashboardContent = <div>
					<p className="lead text-muted">
						Welcome {user.name}
					</p>
					<p className="lead"> You have not yet set up your profile please add some info </p>
					<Link to='/create-profile' className="btn btn-lg btn-info"> Create Profile </Link>
				</div>
			}
		}
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row' >
						<div clssName="col-md-12">
							<div className="display-4"> {dashboardContent}</div>
						</div></div>
				</div>
			</div>
		)

	}
}

Dashboard.PropTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});
export default connect(
	mapStateToProps,
	{ getCurrentProfile },
)(Dashboard);
