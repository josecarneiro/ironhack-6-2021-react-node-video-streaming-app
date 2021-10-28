import { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomeView from './views/Home';
import SignUpView from './views/SignUp';
import SignInView from './views/SignIn';
import CourseView from './views/Course';
import CourseCreateView from './views/CourseCreate';
import CourseManagementView from './views/CourseManagement';
import CreatorSignUpView from './views/CreatorSignUp';
import EpisodeView from './views/Episode';
import SettingsView from './views/Settings';
import SubscriptionView from './views/Subscription';
import { signOut, loadAuthenticatedUser } from './services/library-api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then((user) => {
        if (user) {
          this.setState({ user });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAuthenticationChange = (user) => {
    this.setState({ user });
  };

  handleSignOut = () => {
    signOut().then(() => {
      this.setState({ user: null });
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/">Streaming</Link>
            {(this.state.user && (
              <>
                <span>Welcome {this.state.user.name}</span>
                <button onClick={this.handleSignOut}>Sign Out</button>
              </>
            )) || (
              <>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/sign-in">Sign In</Link>
              </>
            )}
            <Link to="/course/abc">Course Detail</Link>
            <Link to="/course/abc/manage">Course Management</Link>
            <Link to="/episode/def">Episode Detail</Link>
            <Link to="/course/create">Create Course</Link>
            <Link to="/sign-up-creator">Sign Up as Creator</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/subscription">Manage Subscription</Link>
          </nav>
          <Switch>
            <Route path="/" component={HomeView} exact />
            <Route
              path="/sign-up"
              render={(props) => (
                <SignUpView
                  {...props}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
              exact
            />
            <Route
              path="/sign-in"
              render={(props) => (
                <SignInView
                  {...props}
                  onAuthenticationChange={this.handleAuthenticationChange}
                />
              )}
              exact
            />
            <Route path="/course/create" component={CourseCreateView} />
            <Route path="/course/:id/manage" component={CourseManagementView} />
            <Route path="/course/:id" component={CourseView} exact />
            <Route path="/episode/:id" component={EpisodeView} />
            <Route path="/sign-up-creator" component={CreatorSignUpView} />
            <Route path="/settings" component={SettingsView} />
            <Route path="/subscription" component={SubscriptionView} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
