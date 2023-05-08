const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoURI = "mongodb://gofoodmerns:hello123@ac-togpsjr-shard-00-00.qziol56.mongodb.net:27017,ac-togpsjr-shard-00-01.qziol56.mongodb.net:27017,ac-togpsjr-shard-00-02.qziol56.mongodb.net:27017/food?ssl=true&replicaSet=atlas-rju4c0-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB = async()=>{
    await mongoose.connect(mongoURI, {useNewUrlParser: true}, async(err,result)=>{
        if(err) console.log("---",err)
        else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
    })
}

module.exports=mongoDB;



/*mongoose.connect(mongoURI)
.then(()=>{
    console.log("Connected");
        const fetched_data = mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(function(err, data){
        if(err) console.log(err);
        else{
            global.food_items = data;
            console.log(global.food_items);
        }
    })
}).catch((err)=>{
    console.log("Not Connected");
})*/