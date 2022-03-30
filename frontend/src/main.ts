import { createApp, h } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
// @ts-ignore
import VueApolloComponents from '@vue/apollo-components'
import router from './router'
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

// const app = createApp(App, {
//   provider: apolloProvider,
// }).mount('#app')

const app = createApp({
  render: () => h(App),
})

// const app = createApp(App);
app.use(apolloProvider)
app.use(VueApolloComponents)
app.use(router)
app.mount('#app')

// new Vue({
//   el:'#app',
// apolloProvider,
// render: () => h(App)
// })
