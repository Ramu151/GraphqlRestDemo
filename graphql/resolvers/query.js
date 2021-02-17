const Query = {
    hotels: async (parent, args, context) => {
        let data = await context.getHotelData()
        return data
    },
    hotel: async (parent, args, context) => {
        console.log('parents', context)
        let data = await context.getHotelData()
        data = data.find(x => x.id == args.id)
        return data
    },
    review: async (parent, args, context) => {

        let data = await context.getHotelData('reviews')
        data = data.find(x => x.id == args.id)
        return data
    },
    tariff: async (parent, args, context) => {
        let data = await context.getHotelData('tariff')
        data = data.find(x => x.id == args.id)
        return data
    }
}
module.exports = Query