const Crud = require('../db')
const collectionType = ["hotels", 'amentities', 'tariff', 'reviews']

let hotelArray = null

exports.getHotels = async (req, res, next) => {
    hotelArray = await Crud.getHotelData(collectionType[0])
    res.json({hotelArray});
}

exports.getHotelByLocation = async(req, res, next) => {
    hotelArray = await Crud.getHotelData(collectionType[0])
    const filteredHotels = hotelArray.filter(x => x.latitude == req.params.lat && x.longitude == req.params.lng )
    res.json({hotels: filteredHotels});
}

exports.getHotelById = async(req, res, next) => {
    hotelArray = await Crud.getHotelData(collectionType[0], req.params.id)
    const hotel = hotelArray.find(x => x.id == req.params.id)
    res.json({hotel});
}

exports.getHotelByAmendities = async(req, res, next) => {
    let amenities = await Crud.getHotelData(collectionType[1])
    amenities = amenities.filter(x => x.hotelId == req.params.hotelId)
    res.json({amenities});
}

exports.getHotelByTariff = async(req, res, next) => {
    let tariff = await Crud.getHotelData(collectionType[2])
    tariff = tariff.filter(x => x.hotelId == req.params.hotelId)
    res.json({tariff});
}

exports.getHotelByReviews = async(req, res, next) => {
    let reviews = await Crud.getHotelData(collectionType[3])
    reviews = reviews.filter(x => x.hotelId == req.params.hotelId)
    res.json({reviews});
}

exports.addAmenities = async (req, res, next) => {
    const amenitiesJson = (req.body && req.body.amenities) ? req.body.amenities : req.body
    let amenities = null
    if(amenitiesJson.length && amenitiesJson.length >= 1){
        amenities = amenitiesJson
    }
    else {
         amenities = {
            id: amenitiesJson.id,
            hotelId: amenitiesJson.hotelId,
            wifi: amenitiesJson.wifi || false,
            roomService: amenitiesJson.roomService || false,
            laundry: amenitiesJson.laundry || false,
            locker: amenitiesJson.locker || false,
            swimmingPool: amenitiesJson.swimmingPool || false,
            giftShops: amenitiesJson.giftShops || false
        }
    }
    const amenitiesResponse = await Crud.addHotelData(amenities, collectionType[1]) 
    res.json({amenitiesResponse})
}
exports.addReviews = async(req, res, next) => {
    const reviewsJson = (req.body && req.body.reviews) ? req.body.reviews : req.body
    let reviews = null
    if(reviewsJson.length && reviewsJson.length >= 1){
        reviews = reviewsJson
    }

    else {
         reviews = {
            id: reviewsJson.id,
            hotelId: reviewsJson.hotelId,
            reviewer: reviewsJson.reviewer || '',
            rating: reviewsJson.rating || 0,
            comments: reviewsJson.comments || 'welcome',
        }
    }
    const reviewResponse = await Crud.addHotelData(reviews, collectionType[3]) 
    res.json({reviewResponse}) 
}
exports.addTariff = async(req, res, next) => {
    const tariffJson = (req.body && req.body.tariff) ? req.body.tariff : req.body
    let tariff = null
    if(tariffJson.length && tariffJson.length >= 1){
        tariff = tariffJson
    }

    else {
         tariff = {
            id: tariffJson.id,
            hotelId: tariffJson.hotelId,
            reviewer: tariffJson.reviewer || '',
            rating: tariffJson.rating || 0,
            comments: tariffJson.comments || 'welcome',
        }
    }
    let tariffData = await Crud.addHotelData(tariff, collectionType[2]) 
    res.send(tariffData)
}
exports.addHotel = async (req, res, next) => {
    const hotelJson = (req.body && req.body.hotels) ? req.body.hotels : req.body
    let hotel = null

    if(hotelJson.length && hotelJson.length >= 1){
        hotel = hotelJson
    }

    else {
        hotel = {
            id: hotelJson.id,
            name: hotelJson.name,
            address: hotelJson.address,
            rating: hotelJson.rating,
            phone: hotelJson.phone,
            email: hotelJson.email,
            country: hotelJson.country,
            pincode: hotelJson.pincode,
            latitude: hotelJson.latitude,
            longitude: hotelJson.longitude,
            checkIn: hotelJson.checkIn,
            checkOut: hotelJson.checkOut
        }
    }
    let hotelData = await Crud.addHotelData(hotel, collectionType[0]) 
    res.send(hotelData);
}

exports.deleteHotelById = async (req, res, next) => {
    let id = parseInt(req.params.id);
    let deletedData = await Crud.removeHotelData(id, collectionType[0])
    res.json({deletedData});
}
