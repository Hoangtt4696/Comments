import * as React from 'react';
import * as moment from 'moment-timezone';

import { AppContext } from '../../../app/context';

interface ICommentProps {
  comment: any,
  newComment: string,
  handleEditClick: any,
  handleCommentChange: any,
  handleUpdateClick: any,
  handleDeleteClick: any
}

export default class Comment extends React.PureComponent<ICommentProps, {}> {
  editLink(comment) {
    if (this.context.user.sub === comment.user.sub) {
      return <a href={'#'} onClick={this.props.handleEditClick.bind(this, comment)}>Edit</a>;
    }
  }

  itemContent(comment) {
    if (comment.editable) {
      return <input onChange={this.props.handleCommentChange.bind(this, comment)} value={this.props.newComment} />;
    } else {
      return <span>{comment.content} {this.editLink(comment)}</span>;
    }
  }

  updateButton (comment) {
    if (this.context.user.sub === comment.user.sub && comment.editable) {
      return <button onClick={this.props.handleUpdateClick.bind(this, comment)}>Update</button>;
    }
  }

  deleteButton(comment) {
    if (this.context.user.sub === comment.user.sub) {
      return <button onClick={this.props.handleDeleteClick.bind(this, comment)}>Delete </button>;
    }
  }

  render() {
    const { comment } = this.props;

    return (
      <AppContext.Consumer>
        {(context) => {
          this.context = context;

          return (
            <div>
              {this.itemContent(comment)}
              <br />
              {moment(comment.createdAt).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
              <br />
              by {comment.user.name} ({comment.user.email})
              {this.deleteButton(comment)}
              {this.updateButton(comment)}
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}