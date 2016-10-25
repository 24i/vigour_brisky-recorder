# brisky-recorder

<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky-recorder.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-recorder)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-recorder.svg)](https://badge.fury.io/js/brisky-recorder)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-recorder/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-recorder?branch=master)

<!-- VDOC END -->

<!-- VDOC.jsdoc recorder -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
Record and play back vigour-state events

<!-- VDOC END -->

```javascript
const createState = require('vigour-state/s')
const recorder = require('brisky-recorder')
var state = createState({
  your: 'data'
})
recorder.rec(state) // starts recording
// manipulate the state
recorder.export() // Opens a new browser window with the recording shown as JSON
recorder.load() // Opens a new browser window in which you can paste a recording as JSON which will be loaded and can then be played back
recorder.play() // Replays the recorded events
```
