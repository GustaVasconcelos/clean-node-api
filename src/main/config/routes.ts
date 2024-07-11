import { type Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  const files = fg.sync('**/src/main/routes/**routes.ts')

  app.use('/api', router)

  files.forEach(file => {
    import(`../../../${file}`).then(module => {
      module.default(router)
    }).catch(error => {
      console.error(`Failed to load route ${file}:`, error)
    })
  })
}
