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
import { isEqual } from "lodash";

type EditDepartmentProps = {
  isOpen: boolean;
  closeModal: (e: boolean) => void;
  selectedDepartment: { id: string; departmentName: string }[];
  onSubmit: (departmentid: string, departmentname: string) => void;
};

const EditDepartment: React.FC<EditDepartmentProps> = (
  props: EditDepartmentProps
) => {
  const { isOpen, closeModal, selectedDepartment, onSubmit } = props;
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [updatedDepartment, setUpdatedDepartmentDepartment] = useState(
    [] as any
  );
  console.log(selectedDepartment);
  const handleClose = () => {
    closeModal(false);
  };

  const validateForm = () => {
    if (
      updatedDepartment?.departmentname !== null &&
      updatedDepartment?.departmentname
    ) {
      onSubmit(
        updatedDepartment.departmentid,
        updatedDepartment?.departmentname
      );
      handleClose();
    }
  };
  const handleInputchange = (event: any) => {
    if (
      isEqual(
        event.target.value?.trim(),
        selectedDepartment?.[0]?.departmentName
      )
    ) {
      setDisabledButton(true);
    } else {
      const department = {
        departmentid: selectedDepartment?.[0]?.id,
        departmentname: event.target.value?.trim(),
      };
      setUpdatedDepartmentDepartment(department);
      setDisabledButton(false);
    }
    console.log(event.target.value);
  };
  const card = (
    <React.Fragment>
      <CardContent style={{ textAlign: "center" }}>
        <form name="addDepartment">
          <TextField
            label="Department Name"
            required
            name="departmentName"
            defaultValue={selectedDepartment?.[0]?.departmentName}
            onChange={(e) => {
              handleInputchange(e);
            }}
            //   onChange={handleInputChange} error={validationError}
          />
        </form>
      </CardContent>
      <CardActions style={{ float: "right" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={disabledButton}
          onClick={validateForm}
          //    onClick={validateForm}
        >
          Add
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      {" "}
      <Dialog open={isOpen} style={{ minWidth: "400px" }} maxWidth="lg">
        <DialogTitle>
          Edit Department{" "}
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
export default EditDepartment;
