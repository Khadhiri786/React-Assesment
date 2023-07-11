const express= require('express');
const app = express();
const cors= require("cors");
const pool = require('./db');
// middleware
app.use(cors());
app.use(express.json());
app.listen(5000,()=>{
    console.log("server has started on port 5000");
});

//ROUTES  //

// add department 

app.post("/addDepartment", async (req,res)=>{
    try {
        const {departmentname} = req.body;
        const addDepartment = await pool.query("INSERT INTO departmentdetails (departmentname) VALUES ($1) RETURNING *",[departmentname])
        console.log(req.body);
        res.json(addDepartment.rows?.[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// add student details
app.post("/addStudent", async (req,res)=>{
    try {
        const {studentname,course,specialization,percentage,departmentid} = req.body;
        const addStudent= await pool.query("INSERT INTO studentdetails (studentname,course,specialization,percentage,departmentid) VALUES ($1,$2,$3,$4,$5) RETURNING *",[studentname,course,specialization,percentage,departmentid]);
        res.json(addStudent?.rows?.[0]);

    }
    catch(err){
        console.log(err.message);
    }
})

// GET All Department details

app.get("/getAllDepartmentDetails", async (req,res)=>{
    try {
        const getDepartmentDetails=await pool.query("SELECT * from departmentdetails");
        res.json(getDepartmentDetails.rows);
    }
    catch(err) {
        console.log(err.message);
    }
})

// GET ALL Student Details

app.get('/getAllStudentDetails', async (req,res)=>{
    try {
        const getAllStudentDetails =  await pool.query("SELECT * from studentdetails");
        res.json(getAllStudentDetails.rows);
    }
    catch(err){
        console.log(err.message);
    }
})

// GET Particular department details

app.get("/selectedDepartmentDetails/:departmentid", async (req,res)=>{
    try {
        const {departmentid} = req.body;
        const getSelectedDepartmentDetails = await pool.query("SELECT * from departmentdetails WHERE departmentid=$1 RETURNING *",[departmentid]);
        res.json(getSelectedDepartmentDetails?.rows?.[0]);
    }
    catch(err) {
        console.log(err.message);
    }
})

// Get Particular student details

app.get('/selectedStudentDetails/:studentId', async (req,res)=>{
    try {
        const {studentid} = req.body;
        const getSelectedStudentDetails = await pool.query("SELECT * from studentdetails WHERE studentid=$1 RETURNING *",[studentid]);
        res.json(getSelectedStudentDetails?.rows?.[0])
    }
    catch (err){
        console.log(err.message);
    }
})
//UPDATE particular department details

app.put("/updateDepartmentDetail",async (req,res)=>{
    try {
        const {departmentid,departmentname} = req.body;
        const updateDepartmentDetails = await pool.query("UPDATE departmentdetails SET departmentname=$1 where departmentid=$2 RETURNING *",[departmentname,departmentid]);
        res.json(updateDepartmentDetails?.rows?.[0]);
    }
    catch (err) {
        console.log(err.message);
    }
})

//UPDATE particular student details

app.put("/updateStudentDetail",async (req,res)=>{
    try {
        const {studentname,course,specialization,percentage,departmentid} = req.body;
        const updateStudentDetail = await pool.query("UPDATE studentdetails SET studentname=$1,course=$2,specialization=$3,percentage=$4,departmentid=$5 RETURNING *",[studentname,course,specialization,percentage,departmentid]);
        res.json(updateStudentDetail?.rows?.[0]);

    }
    catch(err) {
        console.log(err.message);
    }
})


// DELETE Particular Department using deparmentid

  app.delete("/deleteSelectedDepartment", async (req,res)=>{
    try {
        const {departmentid} = req.body;
        const deleteSelectedDepartment = await pool.query("DELETE from  departmentdetails WHERE departmentid=$1 RETURNING *",[departmentid]);
        res.json(deleteSelectedDepartment?.rows[0]);
    }
    catch (err){
        console.log(err.message);
    }
  })

  //DELETE Particular Student using studentId

  app.delete("/deleteSelectedStudent", async (req,res)=>{
    try {
        const {studentid} = req.body;
        const deleteSelectedStudent = await pool.query("DELETE from studentdetails WHERE studentid=$1 RETURNING *",[studentid]);
        res.json(deleteSelectedStudent?.rows?.[0]);
    }
    catch(err){
        console.log(err.message);
    }
  })