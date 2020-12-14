import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Why is this needed? https://react-bootstrap.github.io/getting-started/introduction/#css
import 'bootstrap/dist/css/bootstrap.min.css'

import Widget from './components/Widget'


ReactDOM.render(
  <Widget />,
  document.getElementById('output')
)