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
    .route("/successfull")
    .get(async(req,res)=>{
        console.log(req.query)
        const filter=req.query;
        const filtData = await getAllData(filter) ;
        console.log(filtData)
        res.send(filtData)
    });

export const mailRouter = router;