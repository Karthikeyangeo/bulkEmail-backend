import express  from "express";
const router = express.Router();



//get data by ID 
async function getDataByID(id){
    // ObjectID function is used to change the id to object ID 
    return await client.db('money-manager')
    .collection('track')
    .findOne({ _id: ObjectId(id)});
}

router
    .route("/:id")
    .get(async(req,res)=>{
        const {id} = req.params;

        const data = await getDataByID(id);
        console.log(data);
        data ? res.send(data): res.status(404).send({msg:`Data not found`});
    });

export const mailRouter = router;