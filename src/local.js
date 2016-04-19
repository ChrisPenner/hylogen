import React from "react";
import ReactDOM from "react-dom";

import Program from "./Program.jsx";

const initialFsSource = `
void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

const App = React.createClass({
  getInitialState: function() {
    return {
      fsSource: initialFsSource
    };
  },
  componentWillMount: function() {
    this.connectToServer();
  },
  connectToServer: function() {
    var wsConn = new WebSocket("ws://localhost:8080/");

    wsConn.onopen = function() {
      console.log("websocket opened!");
    };

    wsConn.onclose = () => {
      console.log('websocket closed');
      window.setTimeout(this.connectToServer, 1000);
    };

    wsConn.onmessage = (m) => {
      console.log(m.data);
      this.setState({
        fsSource: m.data
      });
    };
  },
  render: function() {
    return (
      <div>
        <Program startAnimating={true}
                 fsSource={this.state.fsSource}/>
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById("entry"));



// TODO: add hylogen landing screen


// function fadeOut(elem) {
//   elem.className =  "removing";
//   window.setTimeout(function() {
//     elem.remove();
//   }, 1000);
// }

