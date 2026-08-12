export interface Domain {
  id: string | number;

  domain: string;

  website: string;

  owner: string;

  registrar: string;

  expiryDate: string;

  ssl: "Active" | "Expired";
  sslError?: string;

  status:
    | "Connected"
    | "Pending"
    | "Expired";

  createdAt: string;
}