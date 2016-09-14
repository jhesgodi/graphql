import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType
} from 'graphql'

/* Query example

  // 01

  {
    greeting {
      es
      en
      fr
    }
  }

  //02

  {
    greeting {
      message
    }

  }

  //03

  {
    greeting(lang: "es") {
      message
    }

  }

 */

const greetingsType = new GraphQLObjectType({
  name: 'greetingsType',
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
  type: greetingsType,
  args: {},
  resolve: () => true
}

const langEnum = new GraphQLEnumType({
  name: 'langEnum',
  description: '[...]',

  values: {
    es: { value: 'es' },
    en: { value: 'en' },
    fr: { value: 'fr' }
  }
})

const messages = {
  es: 'Hola',
  en: 'Hello',
  fr: 'Salut'
}

const greetingType = new GraphQLObjectType({
  name: 'greetingType',
  description: '[...]',

  fields: () => ({
    message: {
      type: GraphQLString,
      description: '[...]',
      resolve: (lang) => messages[lang] || 'Not available'
    }
  })
})

const greetingQuery = {
  type: greetingType,
  args: {
    lang: {
      // type: GraphQLString
      // type: new GraphQLNonNull(GraphQLString)
      type: new GraphQLNonNull(langEnum)
    }
  },
  resolve: (_, args) => args.lang
}

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '[...]',

    fields: () => ({
      // Each fields is a query type
      greetings: greetingsQuery,
      greeting: greetingQuery
    })
  })
})
