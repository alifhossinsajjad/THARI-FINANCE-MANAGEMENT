export interface ContactResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
    updated_at: string;
  };
}


export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
