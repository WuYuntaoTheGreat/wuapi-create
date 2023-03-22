import prj from './project'
import { WuApi } from '@wuapi/processor'
import * as gen from '@wuapi/generator'


const api = new WuApi()

api.use(new gen.JavaPlugin)
api.use(new gen.SwiftPlugin)
api.use(new gen.GradlePlugin)
api.use(new gen.SpringPlugin)

api.main(process.argv, prj)

