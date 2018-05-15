import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CommentListContainer from '../../components/Comment/CommentListContainer';

export default class CommentScreen extends React.Component<RouteComponentProps<any>, {}> {
  render() {
    return (
      <section>
        <h1>Comment Screen</h1>
        <CommentListContainer {...this.props} />
      </section>
    );
  }
}