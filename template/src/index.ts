import prj from './project'
import { WuApi } from '@wuapi/processor'
import {JavaPlugin, SwiftPlugin} from '@wuapi/generator'


const api = new WuApi()

api.use(new JavaPlugin)
api.use(new SwiftPlugin)

api.main(process.argv, prj)

