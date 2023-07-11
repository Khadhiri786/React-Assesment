import axios from "axios";

export function useApiRequest() {
  const deleteParticularDepartment = async (departmentid: any) => {
    try {
      //  const body={departmentid:departmentid};
      const url = `http://localhost:5000/deleteSelectedDepartment`;

      axios
        .delete(url, {
          data: { departmentid: departmentid },
        })
        .then((response) => {
          console.log(response);
          return response;
        });
    } catch (err) {
      return err;
    }
  };
  const deleteParticularStudent = async (studentid:string)=>{
    try {
        const url=`http://localhost:5000/deleteSelectedStudent`;

        axios.delete(url,{data:{studentid:studentid}}).then((response)=>{
            return response;
        })
    }
    catch (err){
        return err;
    }
  }
  const updateSelectedDepartment = async (
    departmentid: string,
    departmentname: string,
  ) => {
    try {
      const url = `http://localhost:5000/updateDepartmentDetail`;
      axios
        .put(url, {
          data: { departmentid: departmentid, departmentname: departmentname },
        })
        .then((response) => {
          return response;
        });
    } catch (err) {
      return err;
    }
  };

  const addDepartmentDetails = async (
   departmentname: string
  ) => {
    try {
      const url = `http://localhost:5000/addDepartment`;
      axios.post(url, { data: {departmentname:departmentname} }).then((response) => {
        return response;
      });
    } catch (err) {
      return err;
    }
  };

  const addStudentDetails = async(studentname:string,course:string,specialization:string,percentage:number,departmentid: string) =>{
    try 
    {
        const url=`http://addStudent`;
        axios.post(url,{data:{studentname:studentname,course:course,specialization:specialization,percentage:percentage,departmentid:departmentid}}).then((response)=>{
            return response;
        })
    }
    catch(err){
        return err;
    }
  }

  return {
    deleteParticularDepartment,
    updateSelectedDepartment,
    addDepartmentDetails,
    deleteParticularStudent,
    addStudentDetails
  };
}
