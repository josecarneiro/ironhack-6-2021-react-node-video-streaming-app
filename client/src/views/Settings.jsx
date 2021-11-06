import { useState, useEffect } from 'react';
import { changeUserSettings } from '../services/other';

const SettingsView = (props) => {
  const [data, changeData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (props.user) {
      changeData({
        name: props.user.name,
        email: props.user.email
      });
    }
  }, [props.user]);

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const { name, email } = data;
    try {
      const user = await changeUserSettings({ name, email });
      props.onSettingsChange(user);
      props.history.push('/');
    } catch (error) {
      alert('There was an error changing user settings.');
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    changeData({ [name]: value });
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          type="text"
          placeholder="First and Last Name"
          name="name"
          value={data.name}
          onChange={handleInputChange}
        />
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          placeholder="Your Email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
        <button>Change User Settings</button>
      </form>
    </div>
  );
};

export default SettingsView;
