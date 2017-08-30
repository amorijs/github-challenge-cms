import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import rp from 'request-promise-native';

// Define connection
const Conn = new Sequelize(
  'gitchallenge',
  'postgres',
  'postgres', {
    dialect: 'postgres',
    host: 'localhost',
  }
);


const Pot = Conn.define('pot', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  potSize: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

const GithubUser = Conn.define('githubUser', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  githubID: {
    type: Sequelize.INTEGER,
    // allowNull: false,
  },
  githubUsername: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  githubEmail: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
});

GithubUser.hook('afterCreate', (user) => {
  rp({
      url: `https://api.github.com/users/${user.githubUsername}/events`,
      headers: { 'User-Agent': user.githubUsername }
    })
    .then(events => {
      JSON.parse(events).forEach(event => {
        if (event.type !== 'PullRequestEvent' && event.type !== 'PushEvent') return;

        let message;
        if (event.type === 'PushEvent') message = event.payload.commits[0].message;
        else message = event.payload.pull_request.title;

        user.createEvent({
          type: event.type,
          repoUrl: event.repo.url,
          message,
          eventDate: new Date(event.created_at).toString(),
        });
      });
    });

  rp({
    url: `https://api.github.com/users/${user.githubUsername}`,
    headers: { 'User-Agent': user.githubUsername }
  }).then(data => console.log(JSON.parse(data).location));

});

const Event = Conn.define('event', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  repoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


// Relationships -> sequelize will provide us with dynamic functions to call (ie: getPosts)
Pot.hasMany(GithubUser);
GithubUser.belongsToMany(Pot, { through: 'joinedPots' });
GithubUser.hasMany(Event);
Event.belongsTo(GithubUser);

// Sync models to the database
Conn.sync({ force: true }).then(() => {});

export default Conn;
