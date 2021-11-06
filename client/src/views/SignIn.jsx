import { Component } from 'react';
import { signIn } from '../services/authentication';

class SignInView extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    // const value = event.target.value;
    // const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signIn({ email, password });
      this.props.onAuthenticationChange(user);
    } catch (error) {
      alert('There was an error signing in');
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            placeholder="A Secure Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInView;
