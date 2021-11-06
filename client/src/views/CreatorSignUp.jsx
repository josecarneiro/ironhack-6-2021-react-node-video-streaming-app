import { Component } from 'react';
import { signUp } from './../services/authentication';

class CreatorSignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    const { name, email, password } = this.state;
    try {
      const user = await signUp({ name, email, password, role: 'creator' });
      this.props.onAuthenticationChange(user);
    } catch (error) {
      alert('There was an error signing up');
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Sign Up as a Creator</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            type="text"
            placeholder="First and Last Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
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
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default CreatorSignUpView;
