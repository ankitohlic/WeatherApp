
# Weather App 

This is a Web based Weather application which shows current weather includes time, date, day and minimum and maximum temperature.




## API Reference

#### Get all items

```http
  api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city name` | `string` | **Required**. City name |
| `API key` | `string` | **Required**. Your API key |


## Deployment

To change the city go to `index.js` file and in line number 28 change **Kolkata** to any city you want

```bash
  requests('https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=bba6a12f917d73df7094b3a4e05bbf2f')
```


## Features

- Responsive
- Live previews
- Fullscreen mode



## Screenshots

![App Screenshot](https://github.com/ankitohlic/WeatherApp/blob/main/Screenshot.png)

