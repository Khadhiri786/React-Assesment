import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, DialogTitle, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type AddDepartmentProps = {
  isOpen: boolean;
  closeModal: (e: boolean) => void;
  onSubmit: (departmentName: string) => void;
};
const AddDepartment: React.FC<AddDepartmentProps> = (
  props: AddDepartmentProps
) => {
  const { isOpen, closeModal, onSubmit } = props;
  const [departmentName, setDepartmentName] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);
  function validateForm() {
    //   alert("Test");
    if (departmentName !== null && departmentName) {
      setValidationError(false);
      onSubmit(departmentName);
      closeModal(false);

    } else {
      setValidationError(true);
    }
  }

  const handleInputChange = (event: any) => {
    if (event && event.target.value?.trim()) {
      const name = event.target.value?.trim();
      setDepartmentName(name);
      setValidationError(false);
    } else {
      setDepartmentName("");
      setValidationError(true);
    }
  };
  const card = (
    <React.Fragment>
      <CardContent style={{ textAlign: "center" }}>
        <form name="addDepartment">
          <TextField
            label="Department Name"
            required
            name="departmentName"
            onChange={handleInputChange}
            helperText={validationError ? "Please enter Department name" : ""}
            error={validationError}
          />
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
          Add Department{" "}
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

export default AddDepartment;
