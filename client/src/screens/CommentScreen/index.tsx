import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CommentList from '../../components/CommentList';

import * as CommentAPI from '../../utils/apis/comment.api';

interface ICommentScreenState {
  comments: any[]
}

export default class CommentScreen extends React.Component<RouteComponentProps<any>, ICommentScreenState> {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentWillMount() {
    this.loadData();
  }

  onAddComment(newComment) {
    const { topicId } = this.props.match.params;

    this.addComment(topicId, newComment);
  }

  onUpdateComment(item) {
    this.updateComment(item._id, item.content);
  }

  onRemoveComment(item) {
    this.removeComment(item);
  }

  onEditComment(item) {
    let { comments } = this.state;

    comments = comments.map(comment => {
      comment.editable = comment.editable || comment._id == item._id;

      if (comment.replies) {
        comment.replies = comment.replies.map(reply => {
          reply.editable = reply.editable || reply._id == item._id;

          return reply;
        });
      }

      return comment;
    });

    this.setState({
      comments: comments
    });
  }

  onCommentChanged(item) {
    let { comments } = this.state;

    comments = comments.map(comment => {
      comment.content = comment._id == item._id ? item.content : comment.content;

      if (comment.replies) {
        comment.replies = comment.replies.map(reply => {
          reply.content = reply._id == item._id ? item.content : reply.content;

          return reply;
        });
      }

      return comment;
    });

    this.setState({
      comments: comments
    });
  }

  onReplyClick(item) {
    let { comments } = this.state;

    comments = comments.map(comment => {
      comment.repliable = comment.repliable || comment._id == item._id;

      return comment;
    });

    this.setState({
      comments: comments
    });
  }

  onReplyComment(item, newReply) {
    const { topicId } = this.props.match.params;

    this.addReply(topicId, item, newReply);
  }

  async loadData() {
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
    const newComment =  await CommentAPI.create(topicId, commentContent);
    const { comments } = this.state;

    comments.push(newComment);

    this.setState({
      comments: comments
    });
  }

  async addReply(topicId, reply, replyContent) {
    const newReply =  await CommentAPI.replyComment(topicId, reply, replyContent);

    if (newReply) {
      let { comments } = this.state;

      comments = comments.map(comment => {
        if (comment._id == newReply.parentCommentId) {
          comment.replies = comment.replies || [];
          comment.replies.push(newReply);
        }

        return comment;
      });

      this.setState({
        comments: comments
      });
    }
  }

  async updateComment(commentId, newContent) {
    const updatedComment = await CommentAPI.update(commentId, newContent);

    if (updatedComment) {
      let { comments } = this.state;

      comments = comments.map(comment => {
        comment.content = comment._id == commentId ? newContent : comment.content;
        comment.editable = comment._id == commentId ? false : comment.editable;

        if (comment.replies) {
          comment.replies = comment.replies.map(reply => {
            reply.content = reply._id == commentId ? newContent : reply.content;
            reply.editable = reply._id == commentId ? false : reply.editable;

            return reply;
          });
        }

        return comment;
      });

      this.setState({
        comments: comments
      });
    }
  }

  async removeComment(item) {
    const result = await CommentAPI.remove(item._id);

    if (result) {
      let { comments } = this.state;

      comments = comments.filter(comment => {
        if (item.parentCommentId) { // Reply
          if (comment._id === item.parentCommentId) {
            comment.replies = comment.replies.filter(reply => reply._id !== item._id);
          }

          return true;
        } else { // Comment
          return comment._id !== item._id;
        }
      });

      this.setState({
        comments: comments
      });
    }
  }

  render() {
    const { comments } = this.state;

    return (
      <section>
        <h1>Comment Screen</h1>
        <CommentList
          comments={comments}
          onAddComment={this.onAddComment.bind(this)}
          onUpdateComment={this.onUpdateComment.bind(this)}
          onRemoveComment={this.onRemoveComment.bind(this)}
          onEditComment={this.onEditComment.bind(this)}
          onCommentChanged={this.onCommentChanged.bind(this)}
          onReplayClick={this.onReplyClick.bind(this)}
          onReplayComment={this.onReplyComment.bind(this)}
        />
        <a href={'/logout'}>Logout</a>
      </section>
    );
  }
}
