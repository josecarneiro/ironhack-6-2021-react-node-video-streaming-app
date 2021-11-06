import { useState } from 'react';
import { creatorCourseCreate } from './../services/creator';
import CourseCreationEpisode from './../components/CourseCreationEpisode';

const CourseCreateView = (props) => {
  const [data, changeData] = useState({
    title: 'Introduction to JavaScript',
    description: 'JavaScript topics for beginners.',
    episodes: [{ _id: 'abc', title: 'Episode 1: Value Types', url: '' }]
  });

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const { title, description, episodes } = data;
    try {
      await creatorCourseCreate({ title, description, episodes });
      props.history.push('/course/list');
    } catch (error) {
      alert('There was an error creating course.');
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    changeData({ [name]: value });
  };

  const handleEpisodeAddition = () => {
    changeData((previousData) => ({
      episodes: [
        ...previousData.episodes,
        { _id: String(Math.random()), title: '', url: '' }
      ]
    }));
  };

  const handleEpisodeChange = (id, data) => {
    changeData((previousData) => {
      return {
        episodes: previousData.episodes.map((episode) =>
          episode._id === id ? { ...episode, ...data } : episode
        )
      };
    });
  };

  return (
    <div>
      <h1>Course Create View</h1>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="input-title">Title</label>
        <input
          id="input-title"
          type="text"
          placeholder="Course Title"
          name="title"
          value={data.title}
          onChange={handleInputChange}
        />
        <label htmlFor="input-description">Description</label>
        <textarea
          id="input-description"
          type="text"
          placeholder="Course Description"
          name="description"
          value={data.description}
          onChange={handleInputChange}
        />
        {data.episodes.map((episode) => (
          <CourseCreationEpisode
            key={episode._id}
            episode={episode}
            onChange={(data) => handleEpisodeChange(episode._id, data)}
          />
        ))}
        <button type="button" onClick={handleEpisodeAddition}>
          + Add one more
        </button>
        <button>Create Course</button>
      </form>
    </div>
  );
};

export default CourseCreateView;
