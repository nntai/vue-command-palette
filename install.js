import CommandPalette from "./CommandPalette.vue"

export default {
  install: (app, options) => {
    app.component("CommandPalette", CommandPalette)
  },
}