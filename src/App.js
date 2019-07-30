import React, { Component } from "react";
// import logo from './logo.svg';
import Matches from "./components/Matches";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
// import Container from "./components/Container";
// import Row from "./components/Row";
import cards from "./cards.json";
import './App.css';

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a pizza to gain a point! Click the same pizza twice and you'll lose!";


class App extends Component {
  //setting this.state.matches to the matches json array
  state = {
    cards,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {
    const cards = this.state.cards;
    //filter for each clicked match
    const clickedMatch = cards.filter(match => match.id === id);
    //if else statements when pics are clicked. 
    if (clickedMatch[0].clicked){
      console.log("correct guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Dude, you already clicked on that one."
      for (let i = 0; i < cards.length; i++){
        cards[i].clicked = false;
      }
      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ cards });
    } else if (correctGuesses < 11){
        clickedMatch[0].clicked = true;
        correctGuesses++;
        clickMessage = "GOOD JOB! You haven't clicked on that one yet! Keep up the good work!";
          if (correctGuesses > bestScore){
            bestScore = correctGuesses;
            this.setState({ bestScore });
          }
          //shuffles cards when clicked
          cards.sort(function(a, b){return 0.5 - Math.random()});
          this.setState ({ cards });
          this.setState ({ correctGuesses });
          this.setState ({ clickMessage });
    } else {
      clickedMatch[0].clicked = true;
      clickMessage = "WHOA you actually got them all. Let's see if you can do it again!";
      bestScore = 12;
      this.setState({ bestScore });
      for (let i=0; i < cards.length; i++){
        cards[i].clicked = false;
      }
      cards.sort(function(a, b){return 0.5 - Math.random()});
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    }
  };

  render(){
    return (
      <Wrapper>
        <Title>CLICKY PIES</Title>
        <h3 className="scoreSummary">
          {this.state.clickMessage}
        </h3>

        <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.bestScore}
          </h3>
          <div className="container">
            <div className="row">
              {this.state.cards.map(cards=> (
                <Matches
                  setClicked={this.setClicked}
                  id={cards.id}
                  key={cards.id}
                  image={cards.image}
                  />
              ))}
            </div>
          </div>
      </Wrapper>
    );
  }

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;


