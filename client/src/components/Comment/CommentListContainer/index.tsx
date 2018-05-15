import * as React from 'react';

import CommentList from '../CommentList';
import * as CommentAPI from '../../../utils/apis/comment.api';

interface ICommentListProps {
  comments?: any,
  match: any
}

interface ICommentListStates {
  comments: any,
  newComment: string
}

export default class CommentListContainer extends React.Component<ICommentListProps, ICommentListStates> {
  constructor(props) {
    super(props);

    this.state = {
      comments: this.props.comments || [],
      newComment: ''
    };
  }

  componentWillMount() {
    this.loadComments();
  }

  onDeleteComment(deletedComment) {
    let { comments } = this.state;

    comments = comments.filter(comment => {
      if (deletedComment.parentCommentId) { // Reply
        if (comment._id === deletedComment.parentCommentId) {
          comment.replies = comment.replies.filter(reply => reply._id !== deletedComment._id);
        }

        return true;
      } else { // Comment
        return comment._id !== deletedComment._id;
      }
    });

    this.setState({
      comments: comments
    });
  }

  onNewCommentChange(e) {
    this.setState({
      newComment: e.target.value
    });
  }

  onAddComment() {
    const { topicId } = this.props.match.params;
    const { newComment } = this.state;

    this.addComment(topicId, newComment);
  }

  async loadComments() {
    const { topicId } = this.props.match.params;
    const list = await CommentAPI.topicComments(topicId);

    if (list && list.length) {
      const comments = await Promise.all(list.map(async (item) => {
        const replies = await CommentAPI.commentReplies(item._id);

        item.replies = replies || [];
        item.repliable = !!item.replies.length;

        return item;
      }));

      this.setState({
        comments: comments
      });
    }
  }

  async addComment(topicId, commentContent) {
    const addedComment = await CommentAPI.create(topicId, commentContent);

    if (addedComment) {
      const { comments } = this.state;

      comments.push(addedComment);

      this.setState({
        comments: comments,
        newComment: ''
      });
    }
  }

  render() {
    const { comments, newComment } = this.state;

    return (
      <CommentList
        comments={comments}
        newComment={newComment}
        onDeleteComment={this.onDeleteComment.bind(this)}
        handleNewCommentChange={this.onNewCommentChange.bind(this)}
        handleAddComment={this.onAddComment.bind(this)}>
      </CommentList>
    );
  }
}

