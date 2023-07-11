
-- CREATE DATABASE
CREATE DATABASE studentDetails;

-- CREATE DepartmentTable

CREATE TABLE departmentdetails (departmentid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,departmentname VARCHAR (100) NOT NULL);

-- CREATE StudentTable
CREATE TABLE studentdetails (studentid uuid DEFAULT uuid_generate_v4() PRIMARY KEY,studentname VARCHAR(100) NOT NULL,course VARCHAR(100) NOT NULL,
specialization VARCHAR(100) NOT NULL,percentage DECIMAL,departmentiD uuid,
CONSTRAINT fk_department FOREIGN KEY (departmentid) REFERENCES departmentdetails(departmentid)  )