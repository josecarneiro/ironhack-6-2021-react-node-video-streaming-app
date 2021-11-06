import React from 'react';
import { Link } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './styles.scss';

const EpisodeList = ({ episodes }) => {
  return (
    <ul className="EpisodeList">
      {episodes.map((episode) => (
        <li className="EpisodeItem" key={episode._id}>
          <Link to={`/episode/${episode._id}`}>
            <div className="EpisodeItemOverlay">
              <PlayCircleIcon />
            </div>
            <span>{episode.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
