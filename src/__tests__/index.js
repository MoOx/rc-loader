import path from "path"
import tape from "tape"
import rcLoader from ".."

function loadRc(ext) {
  const result = rcLoader("whatever", {}, {
    config: path.join(__dirname, `fixture.${ext}`),
  })
  if (!typeof result === "object") {
    throw new Error(`Cannot parse 'fixture.${ext}'`)
  }

  return result
}

tape("rc-loader", function(t) {
  function test(ext) {
    try {
      t.equal(
        loadRc(ext).prop,
        ext,
        `should parse ${ext}`
      )
    }
    catch (e) {
      t.fail(`cannot parse ${ext}`)
      throw e
    }
  }

  test("js")
  test("json")
  test("yml")

  t.end()
})
