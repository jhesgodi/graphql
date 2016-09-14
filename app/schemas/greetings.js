import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

/* Query example

  {
    greetings {
      es
      en
      fr
    }
  }

 */

const greetingType = new GraphQLObjectType({
  name: 'greetingType',
  description: '[...]',

  fields: () => ({
    es: {
      type: GraphQLString,
      description: '[greetings in spanish]',
      resolve: () => 'Hola'
    },
    en: {
      type: GraphQLString,
      description: '[greetings in english]',
      resolve: () => 'Hello'
    },
    fr: {
      type: GraphQLString,
      description: '[greetings in french]',
      resolve: () => 'Salut'
    }
  })
})

const greetingsQuery = {
  type: greetingType,
  args: {},
  resolve: () => true
}

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '[...]',

    fields: () => ({
      // Each fields is a query type
      greetings: greetingsQuery
    })
  })
})
