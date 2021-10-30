import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
import CreatorCourseListView from './views/CreatorCourseList';
import { signOut, loadAuthenticatedUser } from './services/authentication';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

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
      <BrowserRouter>
        <Navigation user={this.state.user} onSignOut={this.handleSignOut} />
        <Switch>
          <Route path="/" component={HomeView} exact />
          <ProtectedRoute
            path="/sign-up"
            authorized={!this.state.user}
            redirect="/"
            render={(props) => (
              <SignUpView
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
            exact
          />
          <ProtectedRoute
            path="/sign-in"
            authorized={!this.state.user}
            redirect="/"
            render={(props) => (
              <SignInView
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
            exact
          />
          <ProtectedRoute
            path="/course/list"
            redirect="/sign-up"
            authorized={this.state.user && this.state.user.role === 'creator'}
            component={CreatorCourseListView}
          />
          <ProtectedRoute
            path="/course/create"
            redirect="/sign-up"
            authorized={this.state.user && this.state.user.role === 'creator'}
            component={CourseCreateView}
          />
          <ProtectedRoute
            path="/course/:id/manage"
            redirect="/sign-up"
            authorized={this.state.user && this.state.user.role === 'creator'}
            component={CourseManagementView}
          />
          <Route path="/course/:id" component={CourseView} exact />
          <ProtectedRoute
            path="/episode/:id"
            redirect="/sign-up"
            authorized={this.state.user}
            component={EpisodeView}
          />
          <ProtectedRoute
            path="/sign-up-creator"
            redirect="/"
            authorized={!this.state.user}
            render={(props) => (
              <CreatorSignUpView
                {...props}
                onAuthenticationChange={this.handleAuthenticationChange}
              />
            )}
          />
          <ProtectedRoute
            path="/settings"
            redirect="/sign-up"
            authorized={this.state.user}
            component={SettingsView}
          />
          <ProtectedRoute
            path="/subscription"
            redirect="/sign-up"
            authorized={this.state.user && this.state.user.role === 'viewer'}
            component={SubscriptionView}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
