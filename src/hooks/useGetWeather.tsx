import axios from 'axios';
import { useEffect, useState } from 'react';
import { convertDate } from '../utils/convertDate';

const WEATHER_API_BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const api_key = '8KRMPNQ39LDQDQMYB4YN2TPP3';
/*
I understand the danger of API KEYS in the frontend. I have located them in the .env file but had trouble
with the webpack of codesandbox for me to grab using process.env.REACT_APP_API_KEY
so I left them in here for now.
*/

const useGetWeather = (location: string, day: string) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState('');

  const getWeatherData = async (location: string, date: string) => {
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/${location}/${date}/?key=${api_key}`
    );
    return response;
  };

  useEffect(() => {
    const numberOfWeatherData = 4;
    const startDate = convertDate(day).substring(0, 10);
    const dates = [startDate];
    const nextDate = new Date();

    for (let i = 0; i < numberOfWeatherData; i++) {
      nextDate.setDate(nextDate.getDate() + 7);
      const nextConvertedDate = convertDate(day, nextDate).substring(0, 10);
      dates.push(nextConvertedDate);
    }

    const fetchAPI = async () => {
      try {
        const newData = [];
        for (let i = 0; i < numberOfWeatherData; i++) {
          const result = await getWeatherData(location, dates[i]);
          const data = result.data;
          newData.push(data);
        }
        setWeatherData(newData);
      } catch (error) {
        setErrorData(error);
      }
    };
    setWeatherData([]);
    setLoadingData(true);
    fetchAPI();
    setLoadingData(false);
  }, [location, day]);

  return { weatherData, loadingData, errorData };
};

export default useGetWeather;
