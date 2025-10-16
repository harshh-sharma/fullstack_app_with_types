import express from "express";
const app = express();
import userRouter from "./routes/auth.route";
import categoryRouter from "./routes/category.route";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req, res) => {
    res.json({
        success:true,
        message:"server is live"
    })
})

app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);
export default app;