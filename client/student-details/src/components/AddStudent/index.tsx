import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type StudentDetailsProps = {
  isOpen: boolean;
  closeModal: (e: boolean) => void;
  departmentDetails: any;
  onSubmit:(e: any) => void;
};

const AddStudent: React.FC<StudentDetailsProps> = (
  props: StudentDetailsProps
) => {
  const [studentDetails, setStudentDetails] = useState({
    studentname: "",
    course: "",
    departmentid: "",
    specialization: "",
    percentage: 0,
  });

  const { isOpen, closeModal, departmentDetails,onSubmit } = props;
  const [validationErrorStudentName, setValidationErrorStudentName] = useState({
    isError: false,
    message: "",
  });
  const [validationErrorCourse, setValidationErrorCourse] = useState({
    isError: false,
    message: "",
  });
  const [validationErrorDepartment, setValidationErrorDepartment] = useState({
    isError: false,
    message: "",
  });
  const [validationErrorSpecialization, setValidationErrorSpecialization] =
    useState({ isError: false, message: "" });
  const [validationErrorPercentage, setValidationErrorPercentage] = useState({
    isError: false,
    message: "",
  });

  function validateForm() {
    if (studentDetails?.studentname === "") {
      setValidationErrorStudentName({
        isError: true,
        message: "Student Name is required",
      });
    }
    if (studentDetails?.course === "") {
      setValidationErrorCourse({
        isError: true,
        message: "Course is required",
      });
    }
    if (studentDetails?.departmentid === "") {
      setValidationErrorDepartment({
        isError: true,
        message: "Department is required",
      });
    }
    if (studentDetails?.specialization !== "") {
      setValidationErrorSpecialization({
        isError: true,
        message: "Specialization is required",
      });
    }
    
    if (
      studentDetails?.percentage === 0 ||
      studentDetails?.percentage === null
    ) {
      setValidationErrorPercentage({
        isError: true,
        message: "Percentage is required",
      });
    }
    if(studentDetails?.studentname!=='' && studentDetails?.course!=='' && studentDetails?.departmentid !=='' && studentDetails?.specialization!==''){
  onSubmit(studentDetails);
    }
  }
  const handleInputStudentName = (event: any) => {
    const studentname = event.target.value?.trim();
    if (event.target.value?.trim() && event.target.value) {
      setStudentDetails((prevState) => ({
        ...prevState,
        studentname: studentname,
      }));
      setValidationErrorStudentName({ isError: false, message: "" });
    } else {
      setValidationErrorStudentName({
        isError: true,
        message: "Student Name is required",
      });
    }
  };
  const handleInputCourse = (event: any) => {
    const course = event.target.value?.trim();
    if (event.target.value?.trim() && event.target.value) {
      setStudentDetails((prevState) => ({ ...prevState, course: course }));
      setValidationErrorCourse({ isError: false, message: "" });
    } else {
      setValidationErrorCourse({
        isError: true,
        message: "Course is required",
      });
    }
  };
  const handleInputDepartment = (event: any) => {
    console.log(event.target.value);
    const selectedDepartmentId = event.target.value?.trim();
    if (selectedDepartmentId) {
      setStudentDetails((prevState) => ({
        ...prevState,
        departmentid: selectedDepartmentId,
      }));
      setValidationErrorDepartment({ isError: false, message: "" });
    } else {
      setValidationErrorDepartment({
        isError: true,
        message: "Department is required",
      });
    }
  };

  const handleInputSpecialization = (event: any) => {
    const specialization = event.target.value?.trim();
    if (specialization) {
      setStudentDetails((prevState) => ({
        ...prevState,
        specialization: specialization,
      }));
      setValidationErrorSpecialization({ isError: false, message: "" });
    } else {
      setValidationErrorSpecialization({
        isError: true,
        message: "Specialization is required",
      });
    }
  };

  const handleInputPercentage = (event: any) => {
    const percentage = event.target.value?.trim();
    if (percentage) {
      setStudentDetails((prevState) => ({
        ...prevState,
        percentage: percentage,
      }));
      setValidationErrorPercentage({ isError: false, message: "" });
    } else {
      setValidationErrorPercentage({
        isError: true,
        message: "Percentage is required",
      });
    }
  };
  const card = (
    <React.Fragment>
      <CardContent style={{ textAlign: "center" }}>
        <form name="addStudent">
          <TextField
            label="Student Name"
            required
            error={validationErrorStudentName?.isError}
            helperText={
              validationErrorStudentName?.isError
                ? validationErrorStudentName?.message
                : ""
            }
            name="studentName"
            onChange={handleInputStudentName}
          />
          <br />
          <br />
          <TextField
            label="Course"
            required
            name="course"
            error={validationErrorCourse?.isError}
            helperText={
              validationErrorCourse?.isError
                ? validationErrorCourse?.message
                : ""
            }
            onChange={handleInputCourse}
          />
          <br />
          <br />
          <InputLabel id="selectDepartment">Department</InputLabel>
          <br />
          <Select
            style={{ width: "100%" }}
            onChange={handleInputDepartment}
            error={validationErrorDepartment?.isError}
          >
            {departmentDetails?.map(
              (departmentDetail: { id: string; departmentName: string }) => (
                <MenuItem value={departmentDetail?.id}>
                  {departmentDetail?.departmentName}
                </MenuItem>
              )
            )}
          </Select>
          <br />
          <br />
          <TextField
            label="Specialization"
            required
            error={validationErrorSpecialization?.isError}
            helperText={validationErrorSpecialization?.message}
            name="specialization"
            onChange={handleInputSpecialization}
          />
          <br />
          <br />
          <TextField
            label="Percentage"
            required
            error={validationErrorPercentage?.isError}
            helperText={
              validationErrorPercentage?.isError
                ? validationErrorPercentage?.message
                : ""
            }
            name="percentage"
            onChange={handleInputPercentage}
          />
          <br />
          <br />
        </form>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <Button type="submit" variant="contained" onClick={validateForm}>
          Add
        </Button>
      </CardActions>
    </React.Fragment>
  );
  const handleClose = () => {
    closeModal(false);
  };

  return (
    <>
      <Dialog open={isOpen} style={{ minWidth: "400px" }} maxWidth="lg">
        <DialogTitle>
          Add Student{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Card variant="outlined">{card}</Card>
      </Dialog>
    </>
  );
};
export default AddStudent;
