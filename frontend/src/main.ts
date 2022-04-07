import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import App from './App.vue'
import router from './router'
import './index.css'
import naive from 'naive-ui'

// Vue Apollo
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
})

// const app = createApp(App, {
//   provider: apolloProvider,
// }).mount('#app')

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router).use(naive)
app.mount('#app')
