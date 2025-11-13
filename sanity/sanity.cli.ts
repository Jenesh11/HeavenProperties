import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xs6ve8e6',
    dataset: 'production',
  },
  deployment: {
    appId: 'yti5uo5hrldmldpwpl017wg7',   // <-- ADD THIS VALUE
  }
})
