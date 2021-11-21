export type NodeStatus = "Not found." | "Connected." | "Looking.";

export type PostRequestBody = {
  title: string;
  content: string;
  premium: boolean;
  published: boolean;
};

export type ConnectToLnBody = {
  host: string;
  cert: string;
  macaroon: string;
};

export type UserRequestBody = {
  email: string;
  blog: string;
  subscriptionPrice: number;
  btcAddress?: string;
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

export type Post = {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  user: User;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type LnNode = {
  _id: string;
  token: string;
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  blog: string;
  btcAddress?: string;
  node?: LnNode;
  subs: Array<Subscription>;
  subscriptionPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Subscription = {
  _id: string;
  reader: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
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
