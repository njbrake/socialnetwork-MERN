import React, { Component } from 'react';
import { connect } from 'http2';
import Profiles from '../layout/Profiles';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			instagram: '',
			linkedin: '',
			youtube: '',
			errors: {},
		};
	}
	render() {
		return (
			<div className="CreateProfile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 md-auto">
							<h1 className="display-4 text-center"> Create Your Profile</h1>
							<p className="lead-text-center">
								Lets get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required fields</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state = {
	profile: state.profile,
	errors: state.errors,
});
export default connect(null)(CreateProfile);
