import React from 'react';
import LocationDetails from './location-details';
import ForecastSummaries from './forecast-summaries';
import ForecastDetails from './forecast-details';
import SearchForm from './search-form';
import '../styles/app.scss';
import axios from 'axios';

const url = 'https://mcr-codes-weather.herokuapp.com/forecast?city=';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: 0,
      forecasts: [],
      location: {
        city: '',
        country: '',
      },
    };
    this.handleForecastSelect = this.handleForecastSelect.bind(this);
  }

  getNewCity = city => {
    axios.get(`${url}${city}`)
      .then(response => {
        this.setState({
          forecasts: response.data.forecasts,
          location: response.data.location,
        });
      });
  };

  handleForecastSelect(date) {
    this.setState({
      selectedDate: date,
    });
  }

  componentDidMount() {
    this.getNewCity(this.state.location.city);
  }

  render() {
    const selectedForecast =
      this.state.forecasts.find(forecast => forecast.date === this.state.selectedDate);
    return (
      <div className="forecast">
        <LocationDetails
          city={this.state.location.city}
          country={this.state.location.country}
        />
        <SearchForm
          updateCity={this.getNewCity}
        />
        <br />
        <br />
        <ForecastSummaries
          forecasts={this.state.forecasts}
          onForecastSelect={this.handleForecastSelect}
        />
        {
        selectedForecast && <ForecastDetails forecast={selectedForecast} />
        }
      </div>
    );
  }
}

export default App;
