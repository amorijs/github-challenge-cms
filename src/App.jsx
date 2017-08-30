import React, { Component } from 'react'
import PotPreview from './components/PotPreview.jsx'
// import rp from 'request-promise-native';
// import request from 'request';
 
class App extends Component {
  constructor() {
    super();

    this.state = {
      pots: [],
      // singlePot: false,
      // selectedPotId: null,
    }

    this.getPots = this.getPots.bind(this);
    // this.selectPot = this.selectPot.bind(this);
    this.getPots();    
  }
  
  render() {
    // if (this.state.singlePot === true) {
    //   const pot = pots.find(element => element.id === selectedPotId);
    //   return (<Pot 
    //     id={pot.id} title={pot.title} users={pot.users.length} 
    //     startTime={pot.startTime} endTime={pot.endTime} potSize={pot.potSize}
    //   />);
    // } else {
      const pots = [];
      console.log('****', this.state.pots);
      this.state.pots.forEach((pot) => {
        pots.push(<PotPreview 
          id={pot.id} title={pot.title} users={pot.users.length} 
          startTime={pot.startTime} endTime={pot.endTime} potSize={pot.potSize}
          /*clickHandler={potId => this.selectPot(potId)} */
        />);
      });
      return (<div>{pots}</div>)
    // }    
  }

  componentsDidMount() {
  }

  getPots() {
    const xhr = new XMLHttpRequest;

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const pots = JSON.parse(xhr.response).data.pots;
        console.log('*********', xhr.response);
        this.setState({pots});
      }
    }

    xhr.open('POST', 'http://localhost:3000/graphql');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({query: 
      `{ 
          pots { 
            id
            title 
            users {
              id
            }
            startTime
            endTime
            potSize
          }
        }`
    }));
  }

  selectPot(potId) {
    const pot = this.state.pots.find(element => element.id === selectedPotId);
  }
};

export default App;
