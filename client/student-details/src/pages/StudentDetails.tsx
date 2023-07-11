import React, { useState, useEffect } from "react";
import HeaderComponent from "../components/Header";
import { Box, Button,Snackbar } from "@mui/material";
import axios from "axios";
import { useApiRequest } from "../hooks/useApiRequest";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "../components/Table";
import AddStudent from "../components/AddStudent";
import EditStudent from "../components/EditStudent";

const StudentDetails: React.FC = () => {
  const [studentDetails, setStudentDetails] = useState([] as any);
  const [departmentDetails, setDepartmentDetails] = useState([] as any);
  const [particularStudentDetails,setParticularStudentDetails]=useState([] as any);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenEditModal,setIsOpenEditModal]=useState<boolean>(false);
  const {deleteParticularStudent,addStudentDetails,updateSelectedStudentDetails} = useApiRequest();
  const [isOpenError,setIsOpenError]=useState<{type:string,message:string,isOpen:boolean}>({type:"success",message:"",isOpen:false})

  useEffect(() => {
    axios.get("http://localhost:5000/getAllStudentDetails").then((response) => {
      console.log(response?.data);
      const rows = response?.data?.map((responseData: any) => ({
        id: responseData?.studentid,
        studentname: responseData?.studentname,
        course: responseData?.course,
        specialization: responseData?.specialization,
        percentage: responseData?.percentage,
        departmentid: responseData?.departmentid,
      }));
      console.log(rows);
      setStudentDetails(rows);
    });
    axios
      .get("http://localhost:5000/getAllDepartmentDetails")
      .then((response) => {
        console.log(response?.data);
        const rows = response?.data?.map((i: any) => ({
          id: i?.departmentid,
          departmentName: i?.departmentname,
        }));
        console.log(rows);
        setDepartmentDetails(rows);
      });
  }, [setIsOpenError]);

  const handleEdit = (event: any, cellValues: any) => {
    console.log(event, cellValues);
    setIsOpenEditModal(true);
    setParticularStudentDetails(cellValues?.row);
  };
  const handleDelete = (event: any, cellValues: any) => {
    console.log(event, cellValues);
    const checkIfStudentDepartmentExist= departmentDetails?.filter((i:any)=>i?.id===cellValues?.row?.departmentid);
    if(checkIfStudentDepartmentExist?.length){
        setIsOpenError({type:"error",message:"Cannot Delete Student Department is Exist",isOpen:true});
    }
    else
    {
        deleteParticularStudent(cellValues?.id);
        setIsOpenError({type:"success",message:`${cellValues?.row?.studentname} is Deleted`,isOpen:true});

    }

  };
  const columns: GridColDef[] = [
    { field: "studentname", headerName: "Student Name", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
    { field: "specialization", headerName: "Specialization", width: 150 },
    { field: "percentage", headerName: "Percentage", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <EditIcon
            style={{ color: "blue", marginLeft: "25px" }}
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
          />
        );
      },
      sortable: false,
    },
    {
      field: "delete",
      headerAlign: "center",
      headerName: "Delete",
      renderCell: (cellValues) => {
        return (
          <DeleteIcon
            style={{ color: "red", marginLeft: "25px" }}
            onClick={(event) => {
              handleDelete(event, cellValues);
            }}
          />
        );
      },
      sortable: false,
      filterable: false,
    },
  ];

  const addStudent = (studentDetails:{studentname:string,
  course: string,
  departmentid: string,
  specialization:string,
  percentage: number})=>{

    addStudentDetails(studentDetails?.studentname,studentDetails?.course,studentDetails.specialization,studentDetails?.percentage,studentDetails?.departmentid);
  }

  const editStudent = (studentDetails:{studentname:string,
    course: string,
    departmentid: string,
    specialization:string,
    percentage: number})=>{
        updateSelectedStudentDetails(studentDetails.studentname,studentDetails.course,studentDetails.specialization,studentDetails.percentage,studentDetails.departmentid);
    }
  return (
    <>
      <HeaderComponent />
      <Box style={{ margin: "2% 15%", textAlign: "center" }}>
        <AddStudent
          isOpen={isOpenModal}
          closeModal={(event: boolean) => {
            setIsOpenModal(event);
          }}
          onSubmit={(e:any)=>addStudent(e)}
          
          departmentDetails={departmentDetails}

        />
        <EditStudent isOpen={isOpenEditModal} closeModal={(event: boolean)=>{setIsOpenEditModal(event)}} particularStudentDetails={particularStudentDetails} onSubmit={(e: any)=>editStudent(e)}           departmentDetails={departmentDetails}
/>
        <div style={{ display: "flow-root" }}>
          <Button
            onClick={() => {
              setIsOpenModal(true);
            }}
            style={{ float: "right" }}
          >
            Add Student
          </Button>
        </div>
        <TableComponent columns={columns} rows={studentDetails} />
      </Box>
    </>
  );
};
export default StudentDetails;
