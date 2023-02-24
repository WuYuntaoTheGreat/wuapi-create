import { Project } from "@wuapi/processor"
import * as Basic from "./Basic"

/**
 * The Project.
 */
const prj = new Project(
  "{{project_name}}",
  "{{project_version}}",
  "{{project_package}}",
).setModules({
  Basic,
})

export default prj

