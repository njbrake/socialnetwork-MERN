import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

/**
 * Profiles
 */
class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		if (profiles === null || loading === true) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4> No Profiles Found</h4>;
			}
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="display-4 text-center">Developer Profiles</div>
							<p className="lead text-center">
								Browse and Connect with Developers
							</p>
							{profileItems}
						</div>
					</div>
				</div>
				<h1> This is the Profiles section </h1>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	Profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(
	mapStateToProps,
	{ getProfiles },
)(Profiles);