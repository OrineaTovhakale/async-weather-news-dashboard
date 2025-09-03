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
async function fetchWeather(): Promise<WeatherData> {
  const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current_weather=true');
  return response.data;
}

// Function to fetch news data
async function fetchNews(): Promise<NewsData> {
  const response = await axios.get('https://dummyjson.com/posts?limit=5');
  return response.data;
}

// Async/Await sequential fetching
async function asyncSequential() {
  console.log('Fetching with async/await sequentially...');
  try {
    const weatherData = await fetchWeather();
    console.log(`Weather in Berlin: ${weatherData.current_weather.temperature}°C`);

    const newsData = await fetchNews();
    console.log('Latest News Headlines:');
    newsData.posts.forEach((post: Post) => {
      console.log(`- ${post.title}`);
    });
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Async/Await with Promise.all (concurrent requests)
async function asyncConcurrent() {
  console.log('Fetching weather and news concurrently with async/await and Promise.all...');
  try {
    const [weatherData, newsData] = await Promise.all([fetchWeather(), fetchNews()]);
    console.log(`Weather in Berlin: ${weatherData.current_weather.temperature}°C`);
    console.log('Latest News Headlines:');
    newsData.posts.forEach((post: Post) => {
      console.log(`- ${post.title}`);
    });
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Async/Await with Promise.race (fastest response)
async function asyncRace() {
  console.log('Fetching fastest response with async/await and Promise.race...');
  try {
    const data = await Promise.race([fetchWeather(), fetchNews()]);
    if ('current_weather' in data) {
      console.log(`Fastest Response - Weather: ${data.current_weather.temperature}°C`);
    } else {
      console.log('Fastest Response - News Headlines:');
      (data as NewsData).posts.forEach((post: Post) => {
        console.log(`- ${post.title}`);
      });
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Run all async/await examples
async function runAll() {
  await asyncSequential();
  await asyncConcurrent();
  await asyncRace();
}

runAll();