import * as React from 'react';

import * as moment from 'moment-timezone';

import { AppContext } from '../../app/context';

import './styles.scss';

interface ICommentListProps {
  comments: any[],
  onAddComment: any,
  onUpdateComment: any,
  onRemoveComment: any,
  onEditComment: any,
  onCommentChanged: any,
  onReplayClick: any,
  onReplayComment: any
}

interface ICommentListState {
  newComment: string,
  newReply: string
}

export default class CommentList extends React.Component<ICommentListProps, ICommentListState> {
  constructor(props) {
    super(props);

    this.state = {
      newComment: '',
      newReply: ''
    };
  }

  handleEditComment(item, e) {
    e.preventDefault();

    this.props.onEditComment(item);
  }

  handleCommentChange(item, e) {
    item.content = e.target.value;

    this.props.onCommentChanged(item);
  }

  handleAddComment() {
    const { newComment } = this.state;

    if (newComment) {
      this.props.onAddComment(newComment);

      this.setState({
        newComment: ''
      });
    }
  }

  handleUpdateComment(item) {
    this.props.onUpdateComment(item);
  }

  handleRemoveComment(item) {
    this.props.onRemoveComment(item);
  }

  handleNewCommentChange(e) {
    this.setState({
      newComment: e.target.value
    });
  }

  handleReplyClick(item) {
    this.props.onReplayClick(item);
  }

  handleNewReplyChange(e) {
    this.setState({
      newReply: e.target.value
    });
  }

  handleAddReply(item) {
    const { newReply } = this.state;

    if (newReply) {
      this.props.onReplayComment(item, newReply);

      this.setState({
        newReply: ''
      });
    }
  }

  renderComments(context) {
    const comments: any[] = this.props.comments;
    const { newReply } = this.state;

    const editLink = (item) => {
      if (context.user.sub === item.user.sub) {
        return <a href={'#'} onClick={this.handleEditComment.bind(this, item)}>Edit</a>;
      }
    };
    const replyLink = (item) => {
      return <a href={'#'} onClick={this.handleReplyClick.bind(this, item)}>Reply</a>;
    };
    const replayBox = (item) => {
      return (
        <div>
          <input onChange={this.handleNewReplyChange.bind(this)} value={newReply} />
          <button onClick={this.handleAddReply.bind(this, item)}>Add Reply</button>
        </div>
      );
    };
    const itemContent = (item) => {
      if (item.editable) {
         return <input onChange={this.handleCommentChange.bind(this, item)} value={item.content} />;
      } else {
        return <span>{item.content} {editLink(item)} {replyLink(item)}</span>;
      }
    };
    const updateButton = (item) => {
      if (context.user.sub === item.user.sub && item.editable) {
        return <button onClick={this.handleUpdateComment.bind(this, item)}>Update</button>;
      }
    };
    const deleteButton = (item) => {
      if (context.user.sub === item.user.sub) {
        return <button onClick={this.handleRemoveComment.bind(this, item)}>Delete </button>;
      }
    };
    const replies = (item) => {
      const replyItems = () => {
        return item.replies.map(reply => {
          return (
            <li key={reply._id}>
              {itemContent(reply)}
              <br />
              {moment(reply.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
              <br />
              by {reply.user.name} ({reply.user.email})
              {deleteButton(reply)}
              {updateButton(reply)}
            </li>
          );
        });
      };

      if (item.repliable) {
        return (
          <ul>
            {replyItems()}
            <li>{replayBox(item)}</li>
          </ul>
        );
      }
    };

    return comments.map(item => {
      return (
        <li key={item._id}>
          {itemContent(item)}
          <br />
          {moment(item.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
          <br />
          by {item.user.name} ({item.user.email})
          {deleteButton(item)}
          {updateButton(item)}
          {replies(item)}
        </li>
      );
    });
  }

  render() {
    const { newComment } = this.state;

    return (
      <section>
        <AppContext.Consumer>
          {(context) => {
            return (
              <ul className='commentList'>
                {this.renderComments(context)}
              </ul>
            );
          }}
        </AppContext.Consumer>
        <input onChange={this.handleNewCommentChange.bind(this)} value={newComment} />
        <button onClick={this.handleAddComment.bind(this)}>Add Comment</button>
      </section>
    );
  }
}