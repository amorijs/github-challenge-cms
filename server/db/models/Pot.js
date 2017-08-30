import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import GithubUser from './GithubUser';

const Pot = new GraphQLObjectType({
  name: 'Pot',
  description: 'Group of GithubUsers competing in a challenge',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: Pot => Pot.id,
      },
      title: {
        type: GraphQLString,
        resolve: Pot => Pot.title
      },
      startTime: {
        type: GraphQLString,
        resolve: Pot => Pot.startTime,
      },
      endTime: {
        type: GraphQLString,
        resolve: Pot => Pot.endTime,
      },
      potSize: {
        type: GraphQLInt,
        resolve: Pot => Pot.potSize,
      },
      users: {
        type: new GraphQLList(GithubUser),
        resolve: Pot => Pot.getGithubUsers(),
      },
    };
  },
});

export default Pot;
