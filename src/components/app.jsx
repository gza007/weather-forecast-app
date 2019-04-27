import React from 'react';
import LocationDetails from './location-details';
import ForecastSummaries from './forecast-summaries';
import ForecastDetails from './forecast-details';
import SearchForm from './search-form';
import '../styles/app.scss';
import axios from 'axios';

const url = 'https://mcr-codes-weather.herokuapp.com/forecast?city=Manchester ';

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

  componentDidMount() {
    axios.get(`${url}`)
      .then(response => {
        this.setState({
          forecasts: response.data.forecasts,
          location: response.data.location,
        });
      });
  }

  handleForecastSelect(date) {
    this.setState({
      selectedDate: date,
    });
  }

  render() {
    const selectedForecast =
      this.state.forecasts.find(forecast => forecast.date === this.state.selectedDate);
    return (
      <React.Fragment>
        <LocationDetails
          city={this.state.location.city}
          country={this.state.location.country}
        />
        <SearchForm />
        <ForecastSummaries
          forecasts={this.state.forecasts}
          onForecastSelect={this.handleForecastSelect}
        />
        {
        selectedForecast && <ForecastDetails forecast={selectedForecast} />
        }
      </React.Fragment>
    );
  }
}

export default App;
