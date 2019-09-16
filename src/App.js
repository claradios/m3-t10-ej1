import React from 'react';
import './App.css';
import { getApi } from './services/Service';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      citySearch: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  fetchDirectory() {
    getApi()
      .then(data => {
        this.setState({
          data: data.results
        })
      });
  }
  componentDidMount() {
    this.fetchDirectory();
  }

  handleChange(event) {
    const citySearch = event.currentTarget.value;
    console.log(citySearch);
    this.setState({
      citySearch: citySearch,
    })
  }


  render() {
    return (
      <div className="App">
        <label htmlFor="city">busca un profesional en tu ciudad</label>
        <input id="city"
          placeholder="ciudad"
          value={this.state.citySearch}
          type="text"
          onChange={this.handleChange}></input>
        <label htmlFor="size">Filtra por género:</label>
        <select id="gender" name="gender">
          <option value="femenino">femenino</option>
          <option value="masculino">masculino</option>
        </select>
        <ul className="App__list">
          {this.state.data
            .filter(user => user.location.city.includes(this.state.citySearch))
            .map(
              (user, index) => <li className="App__user" key={index}>
                <div className="User__container">
                  <h2 className="User__name">{user.name.title} {user.name.first} {user.name.last}</h2>
                  <div className="Img__container">
                    <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} className="img" />
                  </div>
                  <p className="User__city">{user.location.city}</p>
                  <p className="User__age">{user.dob.age}</p>
                </div>
              </li>
            )}
        </ul>
      </div>
    );
  }
}

export default App;
