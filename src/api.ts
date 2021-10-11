import { Invoice } from "./Post";
import { Post } from "./PostCard";
import { LndNode, User } from "./store/zstore";
import { NodeInfo } from "./useNodeInfo";

// TODO: Fix up error messages and handling

const regenerateAccessToken = async (): Promise<string> => {
  const response = await fetch("/api/accessToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const accessToken = await response.json();
  return accessToken;
};

type PostRequestBody = {
  title: string;
  content: string;
  price: number;
};

const createNewPost = async (
  body: PostRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

// rta = refresh token and
export const rtaCreateNewPost = async (
  body: PostRequestBody,
  accessToken: string
): Promise<void> => {
  const response = await createNewPost(body, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await createNewPost(body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};

export const disconnectNode = (lndToken: string) => {
  fetch("/api/node", {
    method: "DELETE",
    headers: {
      Authorization: lndToken,
    },
  });
};

export const getPosts = async (): Promise<Array<Post>> => {
  const response = await fetch("/api/posts", {
    method: "GET",
  });
  return await response.json();
};

export const getUserPosts = async (userId: string): Promise<Array<Post>> => {
  const response = await fetch(`/api/users/${userId}/posts`, {
    method: "GET",
  });
  return await response.json();
};

export const getPost = async (
  id: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetPost = async (
  id: string,
  accessToken: string
): Promise<Post> => {
  const response = await getPost(id, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getPost(id, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
};

type ConnectToLndBody = {
  host: string;
  cert: string;
  macaroon: string;
};

const connectToLnd = async (
  body: ConnectToLndBody,
  accessToken: string
): Promise<Response> => {
  return await fetch("/api/connect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaConnectToLnd = async (
  body: ConnectToLndBody,
  accessToken: string
): Promise<LndNode> => {
  const response = await connectToLnd(body, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await connectToLnd(body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
};

export const getNodeInfo = async (lndToken: string): Promise<NodeInfo> => {
  const response = await fetch("/api/node/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: lndToken,
    },
  });
  return await response.json();
};

type UserRequestBody = {
  blog: string;
};

const updateUser = async (
  userId: string,
  body: UserRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaUpdateUser = async (
  userId: string,
  body: UserRequestBody,
  accessToken: string
): Promise<void> => {
  const response = await updateUser(userId, body, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await updateUser(userId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};

type AuthResponse = {
  user: User;
  accessToken: string;
};

type CreateUserRequestBody = {
  name: string;
  password: string;
  blog: string;
};

export const createUser = async (
  body: CreateUserRequestBody
): Promise<AuthResponse> => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

type AuthenticateUserRequestBody = {
  name: string;
  password: string;
};

export const loginUser = async (
  body: AuthenticateUserRequestBody
): Promise<AuthResponse> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

const createInvoice = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${postId}/invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaCreateInvoice = async (
  postId: string,
  accessToken: string
): Promise<Invoice> => {
  const response = await createInvoice(postId, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await createInvoice(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
};

const getPayment = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${postId}/payments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

type PaymentStatus = {
  paid: boolean;
};

export const rtaGetPayment = async (
  postId: string,
  accessToken: string
): Promise<PaymentStatus> => {
  const response = await getPayment(postId, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getPayment(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
};

type LogPaymentRequestBody = {
  hash: string;
};

const logPayment = async (
  postId: string,
  body: LogPaymentRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${postId}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaLogPayment = async (
  postId: string,
  body: LogPaymentRequestBody,
  accessToken: string
): Promise<void> => {
  const response = await logPayment(postId, body, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await logPayment(postId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};

const updatePost = async (
  postId: string,
  body: PostRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/post/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaUpdatePost = async (
  postId: string,
  body: PostRequestBody,
  accessToken: string
): Promise<void> => {
  const response = await updatePost(postId, body, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await updatePost(postId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};

const deletePost = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaDeletePost = async (
  postId: string,
  accessToken: string
): Promise<void> => {
  const response = await deletePost(postId, accessToken);

  if (response.status === 401) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await deletePost(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};
