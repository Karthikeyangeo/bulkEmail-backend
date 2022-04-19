import express  from "express";
const router = express.Router();
import { getAllData, getDataByID, createData, deleteDataByID, updateDataByID} from '../helper.js'


router
    .route("/")
    .get(async(req,res)=>{
        console.log(req.query)
        const filter=req.query;
        const filtData = await getAllData(filter) ;
        res.send(filtData)
        
        
    })
    .post(async(req,res)=>{
    
    const data = req.body;
    console.log(`Incoming data ${data}`)
    const result = createData(data) ;
    res.send(result)
    
    
});
router
    .route("/:id")
    .get(async(req,res)=>{
        const {id} = req.params;
        const data = await getDataByID(id);
        console.log(data);
        data ? res.send(data): res.status(404).send({msg:`Data not found`});
    });

export const mailRouter = router;