export interface Attribute {
  id: number;
  attributes: {
    type: string;
    name: string;
    value: string;
  };
}

export interface Device {
  id: number;
  attributes: {
    serialNumber: string;
    type: string;
    properties: {
      data: Attribute[];
    };
  }
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

export interface Content {
  id: number;
  attributes: {
    metadata: string;
    fileUri: string | null;
    type: string;
  }
}

export interface Comment {
  id: number;
  attributes: {
    title: string;
    body: string;
    device: Device;
  }
}
