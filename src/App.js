import React from 'react';
import './App.css';
import { getApi } from './services/Service';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      city: '',
      gender:''
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
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    console.log(name);
    this.setState({
      [name]: value,
    })
  }

  handleSelect(event) {
    const gender = event.currentTarget.value;
    this.setState({
      gender: gender,
    })
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="city">busca un profesional en tu ciudad</label>
        <input 
          id="city"
          name="city"
          placeholder="ciudad"
          value={this.state.citySearch}
          type="text"
          onChange={this.handleChange}></input>
        <label htmlFor="size">Filtra por género:</label>
        <select id="gender" name="gender" onChange={this.handleChange}>
          <option value="all-gender">all gender</option>
          <option value="femenino">female</option>
          <option value="masculino">male</option>
        </select>
        <ul className="App__list">
          {this.state.data
            .filter(user => user.location.city.includes(this.state.city))
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
