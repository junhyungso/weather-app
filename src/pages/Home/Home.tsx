import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import useGetWeather from '../../hooks/useGetWeather';

import {
  Air,
  ArrowBackIosNew,
  ArrowForwardIos,
  Cloud,
  CloudQueue,
  LocationOnOutlined,
  Schedule,
  Thunderstorm,
  WaterDrop,
  WbSunny,
} from '@mui/icons-material';
import 'material-icons/iconfont/material-icons.css';
import LineChart from '../../components/NavBar/LineChart/LineChart';
import { dateFormatter } from '../../utils/dateFormatter';
import './Home.css';

const Home = () => {
  const [location, setLocation] = useState('New York, NY');
  const [day, setDay] = useState('Every Monday');
  const [time, setTime] = useState('Morning');
  const [dayIndex, setDayIndex] = useState(0);

  const dayOftheWeek = day.split(' ')[1];
  const locationConcat = location?.split(' ').join('');

  const { weatherData, loadingData, errorData } = useGetWeather(
    locationConcat,
    dayOftheWeek
  );

  const weatherData1 = weatherData[dayIndex];
  const weatherData2 = weatherData[dayIndex + 1];

  const weatherCondition1 = weatherData1?.days[0].conditions ?? 'null';
  const weatherTemperature1 = weatherData1?.days[0].temp ?? 0;
  const weatherHumidity1 = weatherData1?.days[0].humidity ?? 0;
  const windSpeed1 = weatherData1?.days[0].windspeed ?? 0;
  const precipChance1 = weatherData1?.days[0].precipprob ?? 0;

  const weatherHours1 =
    time === 'Morning' && dayIndex < 2
      ? weatherData1?.days[0]?.hours.slice(6, 15)
      : time === 'Afternoon' && dayIndex < 2
      ? weatherData1?.days[0]?.hours.slice(10, 20)
      : time === 'Evening' && dayIndex < 2
      ? weatherData1?.days[0]?.hours.slice(15, 24)
      : null;

  const dailyTemp1 = weatherHours1?.map((hour) => hour.temp) ?? 0;
  const dailyHumidity1 = weatherHours1?.map((hour) => hour.humidity) ?? 0;
  const dailyWindSpeed1 = weatherHours1?.map((hour) => hour.windspeed) ?? 0;

  const weatherCondition2 = weatherData2?.days[0].conditions ?? 'null';
  const weatherTemperature2 = weatherData2?.days[0].temp ?? 0;
  const weatherHumidity2 = weatherData2?.days[0].humidity ?? 0;
  const windSpeed2 = weatherData2?.days[0].windspeed ?? 0;
  const precipChance2 = weatherData2?.days[0].precipprob ?? 0;
  const weatherHours2 =
    time === 'Morning' && dayIndex < 1
      ? weatherData2?.days[0].hours.slice(6, 15)
      : time === 'Afternoon' && dayIndex < 1
      ? weatherData2?.days[0].hours.slice(10, 20)
      : time === 'Evening' && dayIndex < 1
      ? weatherData2?.days[0].hours.slice(15, 24)
      : null;

  const dailyTemp2 = weatherHours2?.map((hour) => hour.temp) ?? 0;
  const dailyHumidity2 = weatherHours2?.map((hour) => hour.humidity) ?? 0;
  const dailyWindSpeed2 = weatherHours2?.map((hour) => hour.windspeed) ?? 0;
  const dateOfWeek = weatherData1?.days[0].datetime.substring(8, 10) ?? '';
  const dateOfNextWeek = weatherData2?.days[0].datetime.substring(8, 10) ?? '';

  const graphLabel = () => {
    if (time === 'Morning') {
      return ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'];
    } else if (time === 'Afternoon') {
      return [
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
        '7pm',
      ];
    } else {
      return ['3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
    }
  };

  const chartData1 = {
    labels: graphLabel(),
    datasets: [
      {
        label: 'Temperature',
        data: dailyTemp1,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Humidity',
        data: dailyHumidity1,
        fill: false,
        borderColor: '#742774',
      },
      {
        label: 'Wind Speed',
        data: dailyWindSpeed1,
        fill: false,
        borderColor: '#FF5733',
      },
    ],
  };

  const chartData2 = {
    labels: graphLabel(),
    datasets: [
      {
        label: 'Temperature',
        data: dailyTemp2,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Humidity',
        data: dailyHumidity2,
        fill: false,
        borderColor: '#742774',
      },
      {
        label: 'Wind Speed',
        data: dailyWindSpeed2,
        fill: false,
        borderColor: '#FF5733',
      },
    ],
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleSelectDay = (event: any) => {
    setDay(event.target.value);
  };

  const handleSelectTime = (event: any) => {
    setTime(event.target.value);
  };

  const handleBackwardClick = () => {
    if (dayIndex === 0) {
      return;
    } else {
      setDayIndex(dayIndex - 1);
    }
  };
  const handleForwardClick = () => {
    if (dayIndex === weatherData.length - 2) {
      return;
    } else {
      setDayIndex(dayIndex + 1);
    }
  };

  const conditionIcon = (weatherCondition: string) => {
    if (weatherCondition.includes('Clear')) {
      return <WbSunny />;
    } else if (weatherCondition.includes('Cloudy')) {
      return <Cloud />;
    } else if (weatherCondition.includes('Partially cloudy')) {
      return <CloudQueue />;
    } else if (weatherCondition.includes('Rain')) {
      return <Thunderstorm />;
    } else {
      return null;
    }
  };

  const conditionText = (temp: number, humidity: number) => {
    if (humidity >= 25 && humidity <= 75) {
      return 'Rain possible';
    } else if (temp >= 60 && temp <= 75) {
      return 'Nice Day!';
    }
  };

  if (errorData) {
    return <div>Error while fetching weather data</div>;
  }

  return (
    <>
      <NavBar />
      {!loadingData && (
        <div className="home">
          <div className="location-header">
            <LocationOnOutlined className="icon" />
            <input
              className="input-location"
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter City, State"
            />
            <Schedule className="icon" />
            <select
              className="input-day-time-picker"
              value={day}
              onChange={handleSelectDay}
            >
              <option value="Every Sunday">Every Sunday</option>
              <option value="Every Monday">Every Monday</option>
              <option value="Every Tuesday">Every Tuesday</option>
              <option value="Every Wednesday">Every Wednesday</option>
              <option value="Every Thursday">Every Thursday</option>
              <option value="Every Friday">Every Friday</option>
              <option value="Every Saturday">Every Saturday</option>
            </select>
            <select
              className="input-day-time-picker"
              value={time}
              onChange={handleSelectTime}
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div className="divider"></div>
          <div className="content">
            <div className="button-sliders">
              <button className="button" onClick={handleBackwardClick}>
                <ArrowBackIosNew />
              </button>
            </div>
            <div className="weather">
              <div className="weather-info">
                <div>
                  <div className="header-text">
                    <h1>
                      {dayOftheWeek} the {dateFormatter(dateOfWeek)}
                    </h1>
                  </div>
                  <div className="weather-details">
                    <div className="weather-icon">
                      {conditionIcon(weatherCondition1)}
                    </div>
                    <div>
                      <div>
                        {weatherCondition1} {weatherTemperature1} °F
                      </div>
                      <div>
                        <Air /> winds {windSpeed1}mph
                      </div>

                      <div>
                        <WaterDrop />
                        {precipChance1}% chance of precipitation
                      </div>
                    </div>
                  </div>
                  <div>
                    <LineChart chartData={chartData1} />
                    <div className="time-text">{time}</div>
                    <div className="condition-text">
                      {conditionText(weatherTemperature1, weatherHumidity1)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="weather-info">
                <div>
                  <div className="header-text">
                    <h1>
                      {dayOftheWeek} the {dateFormatter(dateOfNextWeek)}
                    </h1>
                  </div>
                  <div className="weather-details">
                    <div className="weather-icon">
                      {conditionIcon(weatherCondition2)}
                    </div>
                    <div>
                      <div>
                        {weatherCondition2} {weatherTemperature2} °F
                      </div>
                      <div>
                        <Air />
                        winds {windSpeed2}mph
                      </div>
                      <div>
                        <WaterDrop />
                        {precipChance2}% chance of precipitation
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <LineChart chartData={chartData2} />
                  <div className="time-text">{time}</div>
                  <div className="condition-text">
                    {conditionText(weatherTemperature2, weatherHumidity2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="button-sliders">
              <button className="button" onClick={handleForwardClick}>
                <ArrowForwardIos />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
