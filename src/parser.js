import evalModule from "eval"
import yaml from "js-yaml"
import stripJsonComments from "strip-json-comments"

export default function parser(content, file) {
  try {
    return yaml.safeLoad(stripJsonComments(content))
  }
  catch(e) {
    // `(module.)exports` = JS ?
    if (/exports/.test(content)) {
      return evalModule(content)
    }

    throw new Error(
      "Cannot parse runtime configuration as YAML, JSON or JS" +
      (file ? `from '${file}'` : "")
    )
  }
}
