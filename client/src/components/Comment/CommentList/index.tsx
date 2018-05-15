import * as React from 'react';

import CommentContainer from '../CommentContainer';

interface ICommentListProps {
  comments: any,
  newComment: string,
  onDeleteComment: any,
  handleNewCommentChange: any,
  handleAddComment: any
}

export default class CommentList extends React.PureComponent<ICommentListProps, {}> {
  renderComments(comments) {
    return comments.map(comment => {
      return (
        <li key={comment._id}>
          <CommentContainer
            comment={comment}
            onDelete={this.props.onDeleteComment.bind(this)}
          />
          {comment.replies ? <ul>{this.renderComments(comment.replies)}</ul> : null}
        </li>
      );
    });
  }

  render() {
    const { comments, newComment, handleNewCommentChange, handleAddComment } = this.props;

    return (
      <section>
        <ul>
          {this.renderComments(comments)}
        </ul>
        <div>
          <input onChange={handleNewCommentChange.bind(this)} value={newComment} />
          <button onClick={handleAddComment.bind(this)}>Add Comment</button>
        </div>
      </section>
    );
  }
}