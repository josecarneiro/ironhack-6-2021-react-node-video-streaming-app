import { Component } from 'react';
import {
  cancelSubscription,
  createSubscription,
  loadSubscription
} from '../services/subscription';
import PaymentForm from './../components/PaymentForm';

class SubscriptionView extends Component {
  constructor() {
    super();
    this.state = {
      subscription: null
    };
  }

  componentDidMount() {
    loadSubscription()
      .then((subscription) => {
        this.setState({ subscription });
      })
      .catch((error) => {
        alert('There was an error loading the subscription.');
        console.log(error);
      });
  }

  handleSubscriptionCreation = (paymentMethodToken) => {
    createSubscription({ paymentMethodToken })
      .then((subscription) => {
        this.setState({ subscription });
        this.props.onUserRefresh();
      })
      .catch((error) => {
        alert('There was an error creating the subscription.');
        console.log(error);
      });
  };

  handleSubscriptionCancelation = (event) => {
    event.preventDefault();
    cancelSubscription()
      .then(() => {
        this.setState({ subscription: null });
        this.props.onUserRefresh();
      })
      .catch((error) => {
        alert('There was an error canceling the subscription.');
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Subscription View</h1>
        {(this.state.subscription && (
          <div>
            <p>
              You have an active subscription. Your next billing date is{' '}
              {new Date(
                this.state.subscription.nextBillingDate
              ).toLocaleDateString()}
            </p>
            <form onSubmit={this.handleSubscriptionCancelation}>
              <button>Cancel Subscription</button>
            </form>
          </div>
        )) || (
          <div>
            <p>
              You are not yet subscribed. Please, fill out your credit card
              details and click "Subscribe".
            </p>
            <PaymentForm
              onConfirmPaymentMethod={this.handleSubscriptionCreation}
            />
            {/* <form onSubmit={this.handleSubscriptionCreation}>
              <input type="text" placeholder="Credit Card Number" />
              <button>Subscribe</button>
            </form> */}
          </div>
        )}
      </div>
    );
  }
}

export default SubscriptionView;
