# Create Rest and Graphql API Endpoints for Hotels

## REST API Creation: 

|Endpoint | Description |
|---------| :--------------------- | 
|GET: api/hotels | Provided the location (lat/lang), this endpoint should return all the hotels in that location. <br>The list should contain, the following information<br>id<br>name<br>address<br>rating<br>phone<br>email<br>latitude<br>longitude<br>country<br>pincode<br>checkIn<br>checkOu(info on what time people can checkout/check in) |
|GET: api/tariff/hotelId |   id<br>hotelId<br>roomType (Delux, Single, Executive, Premium Double) etc.<br>tariff (Number)|
|GET: api/reviews/hotelId | id<br>hotelId<br>reviewer<br>comments<br>rating (1-5)
|GET: api/amenities/ hotelId/ | id<br>hotelId<br><br>(boolean)<br>roomService<br>locker<br>swimmingPool<br>giftShops
|POST: api/hotels | <br>name<br>address<br>rating<br>phone<br>email<br>latitude<br>longitude<br>country<br>pincode<br>checkIn<br>checkOut (info on what time people can check out/check in)<br>wifi (boolean)<br>roomService<br>laundry<br>locker<br>swimmingPool<br>giftShops<br>GraphQL

## GraphQL Server 

* The following queries/mutations are to be exposed by the GraphQL API

| Endpoint  | Description
|------------|------------|
Query hotels | This should give the combined information about all the hotels, which includes the basic hotel info, tariff info, amenities and the reviews.
Query hotel | Input param : hotelId<br>This should give the combined information for the specified hotelId, which includes the basic hotel info, tariff info, amenities and the reviews
Query reviews | Input param: hotelId<br>This should give the review information alone, for the specified hotelId
Mutation createHotel | Input param: hotelInput<br>This should accept an input param which is of custom input type hotelInput which contains all the fields relevant to create a hotel by calling the api/hotels/create in the REST API


* create Rest API for endpoint (GET: api/hotels) :

 1. To get all hotels list.

    ```
    router.get('/hotels', function(req, res, next) {
        res.json({hotels});
    });
    ```
2. To get a hotel by ID.
    ```
        router.get('/hotels/:id', function(req, res, next) {
        const hotel = hotels.find(x => x.id == req.params.id)
        res.json({hotel});
        });
    ```

3. To get all hotels list based latitude & longitutde.

    ```
        router.get('/hotels/:lat/:lng', function(req, res, next) {
        console.log('/hotels/:lat/:lng')
        const filteredHotels = hotels.filter(x => x.latitude == req.params.lat && x.longitude == req.params.lng )
        console.log(filteredHotels)
        res.json({hotels: filteredHotels});
        });
    ```
4. To get all hotels list based on review | tariff | amendities.

    ```
        router.get('/tariff/:hotelId', function(req, res) {
        const tariff = tariffDetails.filter(x => x.hotelId == req.params.hotelId)
        res.json({tariff});
        });

        router.get('/reviews/:hotelId', function(req, res) {
        const reviews = reviewDetails.filter(x => x.hotelId == req.params.hotelId)
        res.json({reviews});
        });

        router.get('/amenities/:hotelId', function(req, res) {
        const amenities = amentiesDetails.find(x => x.hotelId == req.params.hotelId)
        res.json({amenities});
        });
    ```

Running concurrent commands with nodemon and concurrency

    "start": "concurrently --kill-others --handle-input \"nodemon -e js server.js\" \"nodemon -e graphql graphql/index.js\""
