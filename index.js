/*
Error: <Layout_MDSVEX_DEFAULT> is not a valid SSR component.
You may need to review your build config to ensure that dependencies are compiled,
rather than imported as pre-compiled modules. Otherwise you may need to fix a <Layout_MDSVEX_DEFAULT>.
*/

import { rollup } from 'rollup';
import virtual from '@rollup/plugin-virtual';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import * as sv from 'svelte/compiler'
import { mdsvex, compile } from 'mdsvex'


let mdsvexOptions = {
  extensions: ['.md', '.svx'],
  layout: {
    email: './layouts/Email.svelte',
    _: './layouts/default.svelte'
  }
}

const svx = `
---
layout: email
---

<script>
export let name = 'replace'
</script>

# Hello {name}
`
const {code} = await compile(svx, mdsvexOptions)

console.log(code)

const compiled = sv.compile(code, {generate: 'ssr'})

console.log(compiled.js.code)

let rollupOptions = {
  input: 'code',
  plugins: [
    virtual({ code: compiled.js.code }),
    nodeResolve(),
    svelte()
  ]
}

rollup(rollupOptions).then(async (res) => {
  let r = await res.write({file: './bundle.js'})
  let App = await import('./bundle.js')
  let {html} = App.default.render({})
  console.log(html)
})

