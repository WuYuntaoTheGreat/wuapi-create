import prj from './project'
import { WuApi } from '@wuapi/processor'


const api = new WuApi()

api.main(process.argv, prj)

