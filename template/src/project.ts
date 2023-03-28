import { Project } from "@wuapi/processor"
import * as Basic from "./Basic"
import * as User from "./User"
import * as Todo from "./Todo"

/**
 * The Project.
 */
const prj = new Project(
  "{{project_name}}",
  "{{project_version}}",
  "{{project_package}}",
).setModules({
  Basic,
  User,
  Todo,
})

export default prj

