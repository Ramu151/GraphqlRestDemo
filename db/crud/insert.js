//https://docs.mongodb.com/drivers/node/fundamentals/crud/write-operations/insert

const insertData = (data, collection) =>  new Promise((resolve, reject) => 
    {
        if(data.length && data.length >= 1){
            collection.insertMany(data, (err, res) => {
                if (err) {
                    console.log("error on document insertion", err);
                }
                resolve(res.ops[0]);
            })
        }
        else{
            collection.insertOne(data, (err,res) => {
                if(err){
                    console.log(err)
                }
                resolve(res.ops[0]);
            })
        }
    })


module.exports = insertData