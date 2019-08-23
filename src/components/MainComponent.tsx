import React from 'react';
import { thisExpression } from '@babel/types';


export default class Clock extends React.Component<{}, {}> {

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  singleUnit=(props:any)=>{
    // props.value=1;
    return(
      <div className="unit">{1}</div>
    )
  }
  render() {
    return <this.singleUnit/>
  }
}