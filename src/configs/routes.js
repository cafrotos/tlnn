import CreateResource from "views/CreateResource"
import Resources from "views/Resources"
import NotFound from "views/NotFound"
import Home from "views/Home"
import Login from "views/Login"

export const RESOURCE = "/resource"
export const CREATE_RESOURCE = "/resource/create"
export const HOME = "/"
export const NOT_FOUND = "*"
export const LOGIN = "/login"

export default [
  {
    title: "Create Resouces",
    path: CREATE_RESOURCE,
    Component: CreateResource,
    exact: true,
    inMenuBar: true,
    rules: []
  },
  {
    title: "Resource",
    path: RESOURCE,
    Component: Resources,
    exact: true,
    inMenuBar: true,
    rules: []
  },
  {
    title: "Home",
    path: HOME,
    Component: Home,
    exact: true,
    rules: []
  },
  {
    title: "Login",
    path: LOGIN,
    Component: Login,
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