export interface Device {
  id: number;
  attributes: {
    serialNumber: string;
  };
}

export interface Company {
  id: number;
  attributes: {
    name: string;
  }
}

export interface Report {
  id: number;
  attributes: {
    data: string;
  }
}

export interface Store {
  id: number;
  attributes: {
    name: string;
  }
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  type: string;
}

