export default interface UserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
  }
  export default interface VerifyToken {
    id: number;
    email: string;
  }