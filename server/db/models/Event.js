import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQL,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql';
import GithubUser from './GithubUser';

const Event = new GraphQLObjectType({
  name: 'Event',
  description: 'Github activity event',
  fields: () => {
    return {
      type: {
        type: GraphQLString,
        resolve: event => event.type,
      },
      actor: {
        type: GithubUser,
        resolve: event => event.getGithubUser(),
      },
      repoUrl: {
        type: GraphQLString,
        resolve: event => event.repoUrl,
      },
      message: {
        type: GraphQLString,
        resolve: event => event.message,
      },
      eventDate: {
        type: GraphQLString,
        resolve: event => event.eventDate,
      },
    };
  },
});

export default Event;
