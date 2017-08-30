import {
  GraphQLObjectType,
  GraphQLFloat
} from 'graphql';

const Time = new GraphQLObjectType({
  name: 'Time',
  description: 'Cutom time object',
  fields: () => {
    return {
      unix: {
        type: GraphQLFloat,
        resolve: Time => Time.unix
      },
    };
  }
});

export default Time;