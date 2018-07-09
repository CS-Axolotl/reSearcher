import React, { Component } from 'react';
import axios from 'axios';
import MainSearchContainer from './../containers/mainSearchContainer.jsx';
import LoginComponent from './loginComponent.jsx';
import NavBarContainer from '../containers/navBarContainer';

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  logout = () => {
    axios.get('/api/logout').then(() => this.setState({ isAuthenticated: false, token: '', user: null }))
  };

  googleResponse = (response) => {
    axios.post('/auth/google/callback', {
      access_token: response.accessToken, profile: response.profileObj, withCredentials: true, type: 'application/json',
    }).then((res) => {
      const token = res.headers['x-auth-token'];
      const user = res.data;
      if (token) {
        this.setState({ isAuthenticated: true, user, token })
      }
    });
  };

  onFailure = (error) => {
    console.log('this used to be an error alert. you are welcome, but still, you need to login');
  }

  componentDidMount() {
    if (this.state.user == null) {
      axios.get('/api/verify-session').then((res) => {
        const token = res.headers['x-auth-token'];
        if (token) {
          const user = res.data;
          this.setState({ isAuthenticated: true, user, token })
        }
      });
    }
  }

  render() {
    let content = this.state.isAuthenticated ? (
      <div>
        <NavBarContainer logout={this.logout} user={this.user} />
        <MainSearchContainer username={this.state.user.username} />
      </div>
    ) : (<LoginComponent googleResponse={this.googleResponse} onFailure={this.onFailure} />);
    return (
      <div className="App">
        <h1 id="titleHeader">The ReSearcher</h1>

        {content}
      </div>
    )
  }
}

export default App;
