import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteComment, addLike, removeLike } from '../../actions/postActions';

class CommentItem extends React.Component {
	onDeleteClick(postId, commentId) {
		this.props.deleteComment(postId, commentId);
	}
	onLikeClick(id) {
		this.props.addLike(id);
	}
	onUnlikeClick(id) {
		this.props.removeLike(id);
	}
	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}
	render() {
		const { comment, postId, auth, showActions } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img
								className="rounded-circle d-none d-md-block"
								src={comment.avatar}
								alt=""
							/>
						</a>
						<br />
						<p className="text-center">{comment.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{comment.text}</p>
						{comment.user === auth.user.id ? (
							<button
								onClick={this.onDeleteClick.bind(this, postId, comment._id)}
								type="button"
								className="btn btn-danger mr-1"
							>
								<i className="fas fa-times" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.defaultProps = {
	showActions: true,
};
CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ deleteComment, addLike, removeLike },
)(CommentItem);
