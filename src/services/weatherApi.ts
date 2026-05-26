const API_KEY = 'YOUR_API_KEY';
//Replace YOUR_API_KEY with your real key

export const fetchWeather =
  async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    return response.json();
  };