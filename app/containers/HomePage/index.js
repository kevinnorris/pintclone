/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import popupTools from 'popup-tools';
import Header from './Header';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    token: '',
    user: '',
    error: '',
  }

  handelGithubLogin = () => {
    popupTools.popup('/auth/github', 'Github Connect', {}, (err, response) => {
      console.log(err);
      console.log(response);
      if (err) {
        this.setState({
          ...this.state,
          error: err,
        });
      } else {
        if (response.success) {
          this.setState({
            ...this.state,
            user: response.user,
            token: response.token,
          });
          // this.props.loginSuccess({token: response.token, user: response.user});
          // redirect to home
        } else {
          this.setState({
            ...this.state,
            error: 'Error logging into github.',
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Header error={this.state.error} />
        <h1>
          Home Page
        </h1>
        <button onClick={this.handelGithubLogin}>Login With Github</button>
        <h2>Token: {this.state.token}</h2>
        <h2>User: {this.state.user}</h2>
      </div>
    );
  }
}
