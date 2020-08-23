import CreateResource from "views/CreateResource"
import Resources from "views/Resources"
import NotFound from "views/NotFound"
import Home from "views/Home"

export const RESOURCE = "/resource"
export const CREATE_RESOURCE = "/resource/create"
export const HOME = "/"
export const NOT_FOUND = "*"

export default [
  {
    title: "Create Resouces",
    path: CREATE_RESOURCE,
    Component: CreateResource,
    exact: true,
    inMenuBar: true
  },
  {
    title: "Resource",
    path: RESOURCE,
    Component: Resources,
    exact: true,
    inMenuBar: true
  },
  {
    title: "Home",
    path: HOME,
    Component: Home,
    exact: true
  },
  {
    title: "Not Found",
    Component: NotFound,
    path: NOT_FOUND,
    exact: true,
    header: false
  }
]