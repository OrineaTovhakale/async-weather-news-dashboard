import https from 'https';

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

// Function to make HTTPS GET request with callbacks
function fetchData(url: string, callback: (error: Error | null, data: any) => void) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
      } catch (error) {
        callback(error instanceof Error ? error : new Error('Failed to parse response'), null);
      }
    });
  }).on('error', (error) => {
    callback(error, null);
  });
}

// Consistent error formatter
function formatError(type: string, error: Error): void {
  console.error(`Error fetching ${type}: ${error.message}`);
}

// Callback-based implementation
function getWeatherAndNews() {
  console.log('Fetching weather and news with callbacks...');

  // Fetch weather data
  fetchData('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current_weather=true', (weatherError, weatherData: WeatherData) => {
    if (weatherError) {
      formatError('weather', weatherError);
      return;
    }

    const temperature = weatherData.current_weather.temperature;
    console.log(`Weather in Berlin: ${temperature}°C`);

    // Nested callback: Fetch news after weather
    fetchData('https://dummyjson.com/posts?limit=5', (newsError, newsData: NewsData) => {
      if (newsError) {
        formatError('news', newsError);
        return;
      }

      console.log('Latest News Headlines:');
      newsData.posts.forEach((post) => {
        console.log(`- ${post.title}`);
      });

      // Nested callback: Simulate another dependent call (e.g., more news)
      fetchData('https://dummyjson.com/posts?limit=5&skip=5', (moreNewsError, moreNewsData: NewsData) => {
        if (moreNewsError) {
          formatError('more news', moreNewsError);
          return;
        }

        console.log('More News Headlines:');
        moreNewsData.posts.forEach((post) => {
          console.log(`- ${post.title}`);
        });
      });
    });
  });
}

// Run the callback version
getWeatherAndNews();