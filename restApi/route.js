
const router = require('express').Router()
const controller = require('./controller')

router.get('/hotels', controller.getHotels);

router.get('/', function(req, res, next) {
    controller.getHotels
    res.send('This is a REST API');
  });

router.get('/hotels/:id', controller.getHotelById);

router.delete('/hotel/:id', controller.deleteHotelById);

router.get('/hotels/:lat/:lng', controller.getHotelByLocation);

router.get('/tariff/:hotelId', controller.getHotelByTariff);

router.get('/reviews/:hotelId', controller.getHotelByReviews);

router.get('/amenities/:hotelId', controller.getHotelByAmendities);

router.post('/hotels', controller.addHotel);

router.post('/amenities', controller.addAmenities);

router.post('/reviews', controller.addReviews);

router.post('/tariff', controller.addTariff);

module.exports = router;