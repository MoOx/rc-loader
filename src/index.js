import rc from "rc"
import rcParser from "./parser"

export default function rcLoader(name, defaults, argv, parser) {
  return rc(name, defaults, argv, parser || rcParser)
}
