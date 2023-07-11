import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useApiRequest } from "../hooks/useApiRequest";
import { Button } from "@mui/material";
import AddDepartment from "../components/AddDepartment";
import HeaderComponent from "../components/Header";
import TableComponent from "../components/Table";
import EditDepartment from "../components/EditDepartment";
import { string } from "yup";

const DepartmentDetails: React.FC = () => {
  const [departmentDetails, setDepartmentDetails] = useState([] as any);
  const [selectedDepartment,setSelectedDepartment]=useState<{id:string,departmentName:string}[]>([] as any);
  const [isOpenAddDepartmentModal, setIsOpenAddDepartmentModal] =
    useState<boolean>(false);
  const [isOpenEditDepartmentModal, setIsOpenEditDepartmentModal] =
    useState<boolean>(false);
  const { deleteParticularDepartment,updateSelectedDepartment,addDepartmentDetails } = useApiRequest();

  useEffect(() => {
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
  }, []);

  const handleEdit = (event: any, cellValues: any) => {
    console.log(event, cellValues);
    const selectedValue: {
        id: string;
        departmentName: string;
    }[]=[{id:cellValues?.row?.id,departmentName:cellValues?.row?.departmentName}];
    console.log(selectedValue);
    setSelectedDepartment(selectedValue);
    setIsOpenEditDepartmentModal(true);
  };
  const handleDelete = (event: any, cellValues: any) => {
    deleteParticularDepartment(cellValues?.id);
    axios
      .get("http://localhost:5000/getAllDepartmentDetails")
      .then((response) => {
        console.log(response?.data);
        const rows = response?.data?.map((i: any) => ({
          id: i?.departmentid,
          departmentName: i?.departmentname,
        }));
        setDepartmentDetails(rows);
      });

  };
  const columns: GridColDef[] = [
    { field: "departmentName", headerName: "Department Name", width: 300 },
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

  const updateDepartmentDetails = (departmentid:string,departmentname:string)=>{
    updateSelectedDepartment(departmentid,departmentname);
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


  }

  const addDepartment = (departmentName:string)=>{
    addDepartmentDetails(departmentName);
  }
  return (
    <>
      <HeaderComponent />
      <Box style={{ margin: "2% 15%", textAlign: "center" }}>
        <AddDepartment
          isOpen={isOpenAddDepartmentModal}
          closeModal={(event: boolean) => {
            setIsOpenAddDepartmentModal(event);
          }}
          onSubmit={(departmentName:string)=>addDepartment(departmentName)}
        />
        <EditDepartment
          isOpen={isOpenEditDepartmentModal}
          onSubmit={(departmentid:string,departmentname:string)=>updateDepartmentDetails(departmentid,departmentname)}
          closeModal={(event: boolean) => {
            setIsOpenEditDepartmentModal(event);
          }}
          selectedDepartment={selectedDepartment}
        />
        <div style={{ display: "flow-root" }}>
          <Button
            onClick={() => {
              setIsOpenAddDepartmentModal(true);
            }}
            style={{ float: "right" }}
          >
            Add Department
          </Button>
        </div>
        <TableComponent rows={departmentDetails} columns={columns} />
      </Box>
    </>
  );
};
export default DepartmentDetails;
