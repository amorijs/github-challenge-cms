import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import Pot from './Pot';
import Time from './Time';
import GithubUser from './GithubUser';
import Db from './../db';

// Create root query -> starting point where graphql looks to establish "shape" of data its returning
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  // public api methods
  fields: () => {
    return {
      pots: {
        type: new GraphQLList(Pot),
        resolve: (root) => Db.models.pot.findAll(),
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation', // Arbitrary name
  description: 'Functions to create stuff',
  fields() {
    return {
      addPot: {
        type: Pot,
        args: {
          title: {
            type: GraphQLString,
          },
          startTime: {
            type: GraphQLString,
          },
          endTime: {
            type: GraphQLString,
          },
          potSize: {
            type: GraphQLInt,
          },
          // lastName: {
          //   type: new GraphQLNonNull(GraphQLString),
          // },
          // email: {
          //   type: new GraphQLNonNull(GraphQLString),
          // },
        },
        resolve(root, args) {
          return Db.models.pot.create({
            title: args.title,
            startTime: args.startTime,
            endTime: args.endTime,
            potSize: args.potSize,
          });
        },
      },
      addUser: {
        type: GithubUser,
        args: {
          potId: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          githubUsername: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(root, args) {
          return Db.models.pot.findOne({ where: { id: args.potId } })
            .then(pot => pot.createGithubUser({githubUsername: args.githubUsername}))
            .catch(e => console.log(e));
        },
      }
    };
  },
});

// Provide one root query for all api
const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
