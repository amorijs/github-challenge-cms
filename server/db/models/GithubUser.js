import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import Pot from './Pot';
import Event from './Event';
import rp from 'request-promise-native';

const GithubUser = new GraphQLObjectType({
  name: 'GithubUser',
  description: 'A user to keep track of git activity',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: GithubUser => GithubUser.id,
      },
      name: {
        type: GraphQLString,
        resolve: GithubUser => GithubUser.name,
      },
      githubID: {
        type: GraphQLInt,
        resolve: GithubUser => GithubUser.githubID,
      },
      githubUsername: {
        type: GraphQLString,
        resolve: GithubUser => GithubUser.githubUsername,
      },
      githubEmail: {
        type: GraphQLString,
        resolve: GithubUser => GithubUser.githubEmail.toLowerCase(),
      },
      events: {
        type: new GraphQLList(Event),
        resolve: (GithubUser) => GithubUser.getEvents(),
      },
      joinedPots: {
        type: new GraphQLList(Pot),
        resolve: GithubUser => GithubUser.getPots(),
      },
    };
  },
});


export default GithubUser;
