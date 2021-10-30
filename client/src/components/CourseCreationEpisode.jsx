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
        {/* <label htmlFor="input-file">Video URL</label>
        <input
          id="input-file"
          type="text"
          placeholder="URL"
          name="url"
          value={this.props.episode.url}
          onChange={this.handleInputChange}
        /> */}
        <IKUpload
          urlEndpoint="https://ik.imagekit.io/mt7m0yaczq1"
          publicKey="public_E+GMs/gXx1yMKtlWGwOHLLKBmFY="
          authenticationEndpoint="http://localhost:3010/file-upload-authentication"
          onSuccess={this.handleUploadSuccess}
          onError={this.handleUploadError}
        />
        {this.props.episode.url && <span>✅</span>}
      </>
    );
  }
}

export default CourseCreationEpisode;
