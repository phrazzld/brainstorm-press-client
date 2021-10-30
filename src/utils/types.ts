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

export type ApiError = {
  error: string;
};

export type CreateUserRequestBody = {
  username: string;
  email: string;
  password: string;
  blog: string;
};

export type AuthenticateUserRequestBody = {
  email: string;
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

type PostPayment = {
  postId: string;
  userId: string;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  price: number;
  published: boolean;
  user: User;
  payments: Array<PostPayment>;
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
  username: string;
  email: string;
  blog: string;
  btcAddress?: string;
  node: LndNode;
};

export type NodeInfo = {
  alias: string;
  balance: number;
  pubkey: string;
};

export type PaginatedResponse = {
  docs: Array<any>;
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type PaginatedPosts = {
  posts: Array<Post>;
  totalPages: number;
};

export type ResetPasswordBody = {
  password: string;
};
