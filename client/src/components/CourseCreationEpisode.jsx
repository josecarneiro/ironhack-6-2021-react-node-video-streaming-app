import { Component } from 'react';
import { IKUpload } from 'imagekitio-react';

class CourseCreationEpisode extends Component {
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onChange({ [name]: value });
  };

  handleUploadSuccess = ({ url }) => {
    this.props.onChange({ url });
  };

  handleUploadError = (error) => {
    alert('Error uploading file');
    console.log(error);
  };

  render() {
    return (
      <>
        <label htmlFor="input-title">Episode Title</label>
        <input
          id="input-title"
          type="text"
          placeholder="Episode Title"
          name="title"
          value={this.props.episode.title}
          onChange={this.handleInputChange}
        />
        <IKUpload
          urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}
          publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
          authenticationEndpoint={
            process.env.REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT
          }
          onSuccess={this.handleUploadSuccess}
          onError={this.handleUploadError}
        />
        {this.props.episode.url && <span>✅</span>}
      </>
    );
  }
}

export default CourseCreationEpisode;
