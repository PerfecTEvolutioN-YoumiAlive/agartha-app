import React, { useState } from 'react';

import './Leaderboard.css';

import { StarIcon } from '../../helpers/icons/Icons';

function Leaderboad() {
  const [topUsers, setTopUsers] = useState([
    {
      username: 'sonnyparker',
      stars: 250
    },
    {
      username: 'bulik10',
      stars: 220
    },
    {
      username: 'iyoupp',
      stars: 220
    },
    {
      username: 'noknok',
      stars: 220
    },
    {
      username: 'ykdojo',
      stars: 198
    },
    {
      username: 'esenway',
      stars: 180
    },
    {
      username: 'parkour',
      stars: 170
    }
  ]);

  return (
    <section className='leaderboard'>
      <h1>Leaderboard</h1>

      <div className='leaderboard__topUsers'>
        {topUsers.map(user => (
          <div key={user.username} className='leaderboard__topUser'>
            <a href='#'>{user.username}</a>
            <p>{user.stars} <StarIcon className='icon' /></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboad;
