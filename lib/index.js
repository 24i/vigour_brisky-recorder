/**
 * @id recorder
 * Record and play back vigour-state events
 */
var bs
var paused
var added
var last = 0
var start

var recordings = {}
module.exports = {
  recoding: false,
  start: function (state, stamp) {
    bs = stamp
    if (!state) { state = global.state }
    if (!state) { console.error('No state') }
    var arr = []
    if (added) {
      paused = false
    } else {
      paused = false
      // just subscribe
      state.child.prototype.set({
        on: {
          data: {
            record (val, stamp) {
              if (!paused) {
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
                if (!recordings[stamp]) {
                  recordings[stamp] = [ Date.now() ]
                }
                recordings[stamp].push(top)
              }
            }
          }
        }
      })
      // this.recording = arr
    }
  },
  stop () {
    paused = true
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

  play: function (speedup = 1, i = 0, state) {
    paused = true
    if (!state) { state = global.state }
    if (!state) { console.erro('No state') }

    var records = Object.keys(recordings)
    var offset = recordings[records[i]][0]

    function doit () {
      setTimeout(() => {
        offset = recordings[records[i]][0]
        // const stamp = bs.create('replay', false, records[i])
        for (var j = 1; j < recordings[records[i]].length; j++) {
          state.set(recordings[records[i]][j])
        }
        // bs.close(stamp)
        if (i < records.length - 1) {
          last = ++i
          doit()
        } else {
          paused = false
        }
      },  (recordings[records[i]][0] - offset) / speedup)
    }
    doit()
  }
}
