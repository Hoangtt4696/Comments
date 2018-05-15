import * as React from 'react';

import Comment from '../Comment';

import * as CommentAPI from '../../../utils/apis/comment.api';

interface ICommentStates {
  comment: any,
  newComment: string
}

interface ICommentProps {
  comment: any,
  onDelete: any
}

export default class CommentContainer extends React.Component<ICommentProps, ICommentStates> {
  constructor(props) {
    super(props);

    this.state = {
      comment: this.props.comment,
      newComment: ''
    };
  }

  handleEditClick(comment, e) {
    e.preventDefault();

    comment.editable = true;

    this.setState({
      comment: comment,
      newComment: comment.content
    });
  }

  handleCommentChange(comment, e) {
    this.setState({
      newComment: e.target.value
    });
  }

  handleUpdateClick(comment) {
    comment.content = this.state.newComment;

    this.updateComment(comment);
  }

  handleDeleteClick(comment) {
    this.deleteComment(comment);
  }

  async updateComment(comment) {
    const updatedComment = await CommentAPI.update(comment._id, comment.content);

    if (updatedComment) {
      this.setState({
        comment: updatedComment
      });
    }

    return updatedComment || null;
  }

  async deleteComment(comment) {
    const result = await CommentAPI.remove(comment._id);

    if (result) {
      this.props.onDelete(comment);
    }

    return result || null;
  }

  render() {
    const { comment, newComment } = this.state;

    return (
      <Comment
        comment={comment}
        newComment={newComment}
        handleEditClick={this.handleEditClick.bind(this)}
        handleCommentChange={this.handleCommentChange.bind(this)}
        handleUpdateClick={this.handleUpdateClick.bind(this)}
        handleDeleteClick={this.handleDeleteClick.bind(this)}
      />
    );
  }
}