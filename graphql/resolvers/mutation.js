const Mutation = {
    createHotel: async(parent, { data }, context, info)=>{
        if(data){
            context.addHotelData(data, "hotels")
        }
        return data
    }
}

module.exports = Mutation