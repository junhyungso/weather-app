import axios from "axios";
import { useState, useEffect } from "react";
import { convertDate } from "../utils/convertDate";

const WEATHER_API_BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const api_key = "8KRMPNQ39LDQDQMYB4YN2TPP3";
/*
I understand the danger of API KEYS in the frontend. I have located them in the .env file but had trouble
with the webpack of codesandbox for me to grab using process.env.REACT_APP_API_KEY
so I left them in here for now.
*/

const useGetWeather = (location: string, day: string) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState("");

  const getWeatherData = async (location: string, date: string) => {
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/${location}/${date}/?key=${api_key}`
    );
    return response;
  };

  useEffect(() => {
    const startDate = convertDate(day).toISOString().substring(0, 10);
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);
    const secondDate = convertDate(day, nextDate)
      .toISOString()
      .substring(0, 10);
    nextDate.setDate(nextDate.getDate() + 7);
    const thirdDate = convertDate(day, nextDate).toISOString().substring(0, 10);
    nextDate.setDate(nextDate.getDate() + 7);
    const fourthDate = convertDate(day, nextDate)
      .toISOString()
      .substring(0, 10);

    const fetchAPI = async () => {
      try {
        const result1 = await getWeatherData(location, startDate);
        const result2 = await getWeatherData(location, secondDate);
        const result3 = await getWeatherData(location, thirdDate);
        const result4 = await getWeatherData(location, fourthDate);

        const data1 = result1.data;
        const data2 = result2.data;
        const data3 = result3.data;
        const data4 = result4.data;
        setWeatherData([data1, data2, data3, data4]);
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
