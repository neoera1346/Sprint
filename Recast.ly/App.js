import React from "react";
import Nav from "./Nav";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import { fakeData } from "./__test__/fakeData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: fakeData,
      currentVideo: null,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(video) {
    this.setState({ currentVideo: video })
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="parent">
          <VideoPlayer video={ this.state.currentVideo === null ? fakeData[0] : this.state.currentVideo } />
          <VideoList videos={ this.state.videos } handleClick={ this.handleClick } />
        </div>
      </div>
    )
  }
}

export default App;