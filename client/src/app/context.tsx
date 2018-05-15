import * as React from 'react';

export const AppContext = React.createContext({ user: window['user'] || {} });

export class AppProvider extends React.Component {
  state = {
    user: window['user'] || {}
  };

  setValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}