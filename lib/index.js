'use strict'

/**
 * @id recorder
 */
module.exports = {
  recoding: false,

  rec: function (state) {
    if (!state) { state = global.state }
    if (!state) { console.erro('No state') }
    var arr = []
    state.child.prototype.set({
      on: {
        data: {
          record (val) {
            console.log('\n\nfire', this.path().join('.'))
            var obj = {}
            var top = obj
            var path = this.path()
            for (let i = 0; i < path.length; i++) {
              if (i === path.length - 1) {
                obj[path[i]] = this.serialize()
              } else {
                obj = obj[path[i]] = {}
              }
            }
            arr.push(top)
          }
        }
      }
    })
    this.recording = arr
  },

  export: function () {
    // return this.recording
    var w = window.open('', '', 'width=600, height=400, scrollbars=yes')
    w.document.body.innerHTML = JSON.stringify(this.recording)
  },

  load: function () {
    const body = '<html><head></head><body><textarea id="recordingText" style="width: 100%; height: 90%;"></textarea><button id="loadBt">Load</button></body></html>'
    var w = window.open('', '', 'width=600, height=400, scrollbars=yes')

    w.document.body.innerHTML = body
    const button = w.document.getElementById('loadBt')
    const recordingTextarea = w.document.getElementById('recordingText')

    button.onclick = (e) => {
      this.recording = JSON.parse(recordingTextarea.value)
      w.close()
    }
  },

  play: function (lag, state) {
    if (!lag) { lag = 100 }
    if (!state) { state = global.state }
    if (!state) { console.erro('No state') }

    const recording = this.recording
    console.log(recording)

    var i = 0
    function doit () {
      setTimeout(() => {
        state.set(recording[i])
        if (i < recording.length) {
          i++
          doit()
        }
      }, lag)
    }
    doit()
  }
}
