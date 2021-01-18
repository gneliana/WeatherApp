import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';

class WeekContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fullData: [],
      dailyData: [],
      city: 'Chicago'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=imperial&APPID=${apiConfig.owmKey}`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  handleChange(event){
    this.setState({city: event.target.value});
    console.log(this.state)
  }

  handleSubmit(event){

    event.preventDefault();
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=imperial&APPID=${apiConfig.owmKey}`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  render() {
    return (
      <div className="container">
      <h1 className="display-1 jumbotron"> Forecast.</h1>
      <div>
        <form>
          <label>
            <p>Enter a City: <input type="text" value={this.state.city} onChange={this.handleChange} />
              <button onClick={this.handleSubmit}>
                Submit
              </button>
            </p>

          </label>

        </form>
          <h5 className="display-5 text-muted">{this.state.city}, US</h5>

      </div>

        <div className="row justify-content-center">

          {this.formatDayCards()}

        </div>
      </div>
    )
  }
}

export default WeekContainer;
