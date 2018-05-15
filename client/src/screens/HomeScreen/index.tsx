import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class HomeScreen extends React.Component<RouteComponentProps<any>, {}> {
  render() {
    return (
      <section>
        <h1>Home Screen</h1>
        <h2>Comment topics</h2>
        <ul>
          <li><a href={'/topics/t1'}>Topic 1</a></li>
          <li><a href={'/topics/t2'}>Topic 2</a></li>
        </ul>
        <a href={'/logout'}>Logout</a>
      </section>
    );
  }
}
