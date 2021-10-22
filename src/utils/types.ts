export type NodeStatus = "Not found." | "Connected." | "Looking.";

export type PostRequestBody = {
  title: string;
  content: string;
  price: number;
  published: boolean;
};

export type ConnectToLndBody = {
  host: string;
  cert: string;
  macaroon: string;
};

export type UserRequestBody = {
  blog: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type CreateUserRequestBody = {
  name: string;
  password: string;
  blog: string;
};

export type AuthenticateUserRequestBody = {
  name: string;
  password: string;
};

export type PaymentStatus = {
  paid: boolean;
};

export type LogPaymentRequestBody = {
  hash: string;
};

export type Invoice = {
  payreq: string;
  hash: string;
  amount: number;
};

export type PostParams = {
  postId: string;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  price: number;
  published: boolean;
  user: User;
};

export type LndNode = {
  _id: string;
  token: string;
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
};

export type User = {
  _id: string;
  name: string;
  blog: string;
  node: LndNode;
};

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};