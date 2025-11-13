import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xs6ve8e6',
    dataset: 'production'
  },
  deployment: {
    appId: 'yti5uo5hrldmldpwp10l7wg7',   // <-- ADD THIS VALUE
  }
})
