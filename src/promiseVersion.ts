import axios from 'axios';

// Interfaces for API responses
interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

interface Post {
  id: number;
  title: string;
}

interface NewsData {
  posts: Post[];
}

// Function to fetch weather data
function fetchWeather(): Promise<WeatherData> {
  return axios
    .get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current_weather=true')
    .then((response) => response.data);
}

// Function to fetch news data
function fetchNews(): Promise<NewsData> {
  return axios
    .get('https://dummyjson.com/posts?limit=5')
    .then((response) => response.data);
}

// Promise chaining example
function promiseChain() {
  console.log('Fetching with Promise chaining...');
  fetchWeather()
    .then((weatherData) => {
      console.log(`Weather in Berlin: ${weatherData.current_weather.temperature}°C`);
      return fetchNews();
    })
    .then((newsData) => {
      console.log('Latest News Headlines:');
      newsData.posts.forEach((post: Post) => {
        console.log(`- ${post.title}`);
      });
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

// Promise.all example (concurrent requests)
function promiseAll() {
  console.log('Fetching weather and news concurrently with Promise.all...');
  Promise.all([fetchWeather(), fetchNews()])
    .then(([weatherData, newsData]) => {
      console.log(`Weather in Berlin: ${weatherData.current_weather.temperature}°C`);
      console.log('Latest News Headlines:');
      newsData.posts.forEach((post: Post) => {
        console.log(`- ${post.title}`);
      });
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

// Promise.race example (fastest response)
function promiseRace() {
  console.log('Fetching fastest response with Promise.race...');
  Promise.race([fetchWeather(), fetchNews()])
    .then((data) => {
      if ('current_weather' in data) {
        console.log(`Fastest Response - Weather: ${data.current_weather.temperature}°C`);
      } else {
        console.log('Fastest Response - News Headlines:');
        data.posts.forEach((post: Post) => {
          console.log(`- ${post.title}`);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}

// Run all Promise examples
promiseChain();
promiseAll();
promiseRace();
