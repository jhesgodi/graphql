import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import data from '../../public/users.json'

const userType = new GraphQLObjectType({
  name: 'User',
  description: '[...]',

  fields: {
    id: { type: GraphQLString },
    rol: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',

    fields: {
      user: {
        type: userType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, args) => data[args.id]
      }
    }
  })
})
