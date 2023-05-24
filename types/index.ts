export type DepartmentListItem = {
    id: number;
    departmentName: string;
  };

export interface Employee {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    empNo: string;
    jobTitle: string;
    departmentId: string;
    departmentName?: string;
    telephone: string;
    email: string;
    profilePictureUrl: string | null;
  }

export type EmployeeCreateUpdate = Omit<Employee, 'profilePictureUrl' | 'id'> & {
    id?: number;
    profilePicture: File | Blob | null;
};


export type EmployeeOverview = Pick<Employee, 'firstName' | 'lastName' | 'jobTitle' | 'departmentName' | 'profilePictureUrl'> & { id: number };
