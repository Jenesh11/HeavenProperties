import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xs6ve8e6',
    dataset: 'production',
  },
  deployment: {
    /**
     * Link this Studio to a specific Sanity app ID
     * → Get your appId from https://www.sanity.io/manage/project/xs6ve8e6/studios
     */
    appId: 'B2h4toHQr',

    /**
     * Optional: keep auto updates on or turn off for version control
     */
    autoUpdates: true,
  },
})
