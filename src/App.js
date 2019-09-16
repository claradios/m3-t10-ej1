import React from 'react';
import './App.css';
import {getApi} from './services/Service';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  fetchDirectory() {
    getApi()
    .then(data => {
      this.setState({
        data:data.results
      }) 
    });
  }
  componentDidMount () {
    this.fetchDirectory();
  }
  render() {
    return (
      <div className="App">
        <ul className="App__list">
          {this.state.data.map(
            user => <li className="App__user">
              <div className="User__container">
                <h2 className="User__name">{user.name.first} {user.name.last}</h2>
                <div className="Img__container">
                  <img src={user.picture.medium} className="img"/>
                </div>
                <p className="User__city"></p>
                <p className="User__age"></p>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
