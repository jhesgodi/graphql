import Hapi from 'hapi'
import Good from 'good'
import GraphQL from 'hapi-graphql'

import * as Schema from './app/schemas'

const schema = Schema.ex02

/** Create new server instance */
const server = new Hapi.Server()

/** Add server’s connection information */
server.connection({
  port: 2016,
  host: 'localhost'
})

/** Register plugins to server instance */
server.register([
  {
    register: Good,
    options: {
      ops: {
        interval: 50000
      },
      reporters: {
        console: [
          {
            module: 'good-console',
            args: [{
              log: '*',
              response: '*',
              format: 'ddd, MMM Do YYYY, h:mm:ss a',
              utc: false
            }]
          },
          'stdout'
        ]
      }
    }
  },
  {
    register: GraphQL,
    options: {
      query: {
        schema: schema,
        graphiql: true,
        formatError: (error) => ({
          message: error.message,
          locations: error.locations,
          stack: error.stack
        })
      },
      route: {
        path: '/graphql',
        config: {}
      }
    }
  }
], (errPlugins) => {
  if (errPlugins) {
    server.log('error', 'Failed to install plugins')
    throw errPlugins
  }
  server.log('info', 'Plugins registered')

  /** Views configuration */

  /** Register routes */
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply('hello world')
      }
    }
  ])
  server.log('info', 'Routes registered')

  // Start the server after plugin registration
  server.start((errStart) => {
    if (errStart) {
      server.log('error', 'Failed to start server')
      server.log('error', errStart)
      throw errStart
    }
    server.log('info', `🌎  Server running at: ${server.info.uri}`)
  })
})
