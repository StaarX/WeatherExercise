const Router= require('express');
const router = new Router();
const wth= require('../api/models/weather');

//Forecast
router.get('/get16DayForecast/:lat&:lon', wth.get16DayForecast);
router.get('/getCurrentWeather/:lat&:lon', wth.getCurrentWeather);
router.get('/getLast15Days/:lat&:lon',wth.getLast15Days)

module.exports = router;