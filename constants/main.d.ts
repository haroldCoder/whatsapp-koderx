export interface User {
    name: string;
    image: string | any;
    number: string;
    id_user_main?: number;
    id_user_add?: number;
    id_em?: number;
    id_tr?: number;
  }
  
  export interface Message {
    name: string;
    image: string;
    message: any;
    number: string;
    id_em?: number;
    id_tr?: number;
  }