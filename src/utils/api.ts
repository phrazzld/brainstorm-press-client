import {
  ApiError,
  AuthenticateUserRequestBody,
  AuthResponse,
  ConnectToLnBody,
  CreateUserRequestBody,
  Invoice,
  LnNode,
  LogPaymentRequestBody,
  NodeInfo,
  NodeStatus,
  PaginatedResponse,
  PaymentStatus,
  Post,
  PostRequestBody,
  ResetPasswordBody,
  Subscription,
  User,
  UserRequestBody,
} from "./types";

const UNAUTHORIZED = [401, 403];

const BASE_URL = process.env.BASE_URL || "";

// rta = regenerate token and
// Assumes accessToken is the last arg
const rta = async (fn: any, ...args: any): Promise<any> => {
  const response = await fn.apply(null, args);

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();

    return await fn.apply(null, args.slice(0, -1).concat(newAccessToken));
  }

  return response;
};

export const regenerateAccessToken = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/api/tokens/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const accessToken = await response.json();
  return accessToken;
};

const createPost = async (
  body: PostRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaCreatePost = async (
  body: PostRequestBody,
  accessToken: string
): Promise<Post> => {
  const res = await rta(createPost, body, accessToken);

  if (!res.ok) {
    throw new Error("Failed to create new post.");
  }

  return await res.json();
};

export const disconnectNode = async (lnToken: string): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/nodes`, {
    method: "DELETE",
    headers: {
      Authorization: lnToken,
    },
  });
};

export const getPosts = async (
  page: number,
  free?: boolean,
  search?: string
): Promise<PaginatedResponse> => {
  let endpoint = `${BASE_URL}/api/posts?page=${page}`;
  if (free) {
    endpoint += `&free=true`;
  }
  if (search) {
    endpoint += `&search=${search}`;
  }
  const response = await fetch(endpoint, {
    method: "GET",
  });
  return await response.json();
};

export const getUserPosts = async (
  username: string,
  page: number,
  free?: boolean,
  search?: string
): Promise<PaginatedResponse> => {
  let endpoint = `${BASE_URL}/api/posts/users/${username}?page=${page}`;
  if (free) {
    endpoint += `&free=true`;
  }
  if (search) {
    endpoint += `&search=${search}`;
  }
  const response = await fetch(endpoint, {
    method: "GET",
  });
  return await response.json();
};

const getDrafts = async (
  username: string,
  page: number,
  accessToken: string
): Promise<Response> => {
  return await fetch(
    `${BASE_URL}/api/posts/users/${username}/drafts?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const rtaGetDrafts = async (
  username: string,
  page: number,
  accessToken: string
): Promise<PaginatedResponse> => {
  const res = await rta(getDrafts, username, page, accessToken);

  if (!res.ok) {
    throw new Error("Failed to get drafts.");
  }

  return await res.json();
};

const getPostsFromSubs = async (
  page: number,
  accessToken: string
): Promise<Response> => {
  return fetch(`${BASE_URL}/api/posts/subscriptions?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetPostsFromSubs = async (
  page: number,
  accessToken: string
): Promise<PaginatedResponse> => {
  const res = await rta(getPostsFromSubs, page, accessToken);

  if (!res.ok) {
    throw new Error("Failed to get posts from subs.");
  }

  return await res.json();
};

export const getPost = async (
  id: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts/${id}`, {
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
  const res = await rta(getPost, id, accessToken);

  if (!res.ok) {
    throw new Error("Failed to get post.");
  }

  return await res.json();
};

const connectToLn = async (
  body: ConnectToLnBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/nodes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaConnectToLn = async (
  body: ConnectToLnBody,
  accessToken: string
): Promise<LnNode> => {
  const res = await rta(connectToLn, body, accessToken);

  if (!res.ok) {
    throw new Error("Failed to connect to LN.");
  }

  return await res.json();
};

export const getNodeInfo = async (lnToken: string): Promise<NodeInfo> => {
  const response = await fetch(`${BASE_URL}/api/nodes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: lnToken,
    },
  });
  return await response.json();
};

const getNodeStatus = async (
  id: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/nodes/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetNodeStatus = async (
  id: string,
  accessToken: string
): Promise<NodeStatus> => {
  const res = await rta(getNodeStatus, id, accessToken);

  if (!res.ok) {
    throw new Error("Failed to get node status.");
  }

  const resJSON = await res.json();
  return resJSON.status;
};

const updateUser = async (
  userId: string,
  body: UserRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users/${userId}`, {
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
  const res = await rta(updateUser, userId, body, accessToken);

  if (!res.ok) {
    throw new Error("Failed to update user.");
  }
};

export const createUser = async (
  body: CreateUserRequestBody
): Promise<AuthResponse | ApiError> => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const loginUser = async (
  body: AuthenticateUserRequestBody
): Promise<AuthResponse | ApiError> => {
  const response = await fetch(`${BASE_URL}/api/users/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

const getUser = async (
  username: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users/${username}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetUser = async (
  username: string,
  accessToken: string
): Promise<User> => {
  const res = await rta(getUser, username, accessToken);

  if (!res.ok) {
    throw new Error("Failed to get user.");
  }

  return await res.json();
};

const getCurrentUser = async (accessToken: string): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetCurrentUser = async (
  accessToken: string
): Promise<User | null> => {
  const res = await rta(getCurrentUser, accessToken);

  if (!res.ok) {
    // User is not logged in, return null
    return null;
  }

  return await res.json();
};

const createInvoice = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts/${postId}/invoice`, {
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
  const res = await rta(createInvoice, postId, accessToken);

  if (!res.ok) {
    throw new Error("Failed to create invoice.");
  }

  return await res.json();
};

const getPayment = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts/${postId}/payments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetPayment = async (
  postId: string,
  accessToken: string
): Promise<PaymentStatus> => {
  const res = await rta(getPayment, postId, accessToken);

  if (res.status === 401) {
    return { paid: false };
  }

  if (!res.ok) {
    throw new Error("Failed to get payment.");
  }

  return await res.json();
};

// Check if current user has paid for access to premium content
const checkPremiumAccess = async (
  authorId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users/${authorId}/access`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaCheckPremiumAccess = async (
  authorId: string,
  accessToken: string
): Promise<PaymentStatus> => {
  const res = await rta(checkPremiumAccess, authorId, accessToken);

  if (UNAUTHORIZED.includes(res.status)) {
    return { paid: false };
  }

  if (!res.ok) {
    throw new Error("Failed to check premium access.");
  }

  return await res.json();
};

const logPayment = async (
  userId: string,
  body: LogPaymentRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users/${userId}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};

export const rtaLogPayment = async (
  userId: string,
  body: LogPaymentRequestBody,
  accessToken: string
): Promise<void> => {
  const res = await rta(logPayment, userId, body, accessToken);

  if (!res.ok) {
    console.warn("Failed to log payment.");
  }
};

const updatePost = async (
  postId: string,
  body: PostRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts/${postId}`, {
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
  const res = await rta(updatePost, postId, body, accessToken);

  if (!res.ok) {
    throw new Error("Failed to update post.");
  }
};

const deletePost = async (
  postId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/posts/${postId}`, {
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
  const res = await rta(deletePost, postId, accessToken);

  if (!res.ok) {
    throw new Error("Failed to delete post.");
  }
};

export const deleteRefreshToken = async (): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/tokens/refresh`, {
    method: "DELETE",
  });
};

export const sendResetPasswordEmail = async (
  email: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/reset-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (
  body: ResetPasswordBody,
  userId: string,
  token: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/reset-password/${userId}/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const deleteUser = async (
  userId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaDeleteUser = async (
  userId: string,
  accessToken: string
): Promise<void> => {
  const res = await rta(deleteUser, userId, accessToken);

  if (!res.ok) {
    throw new Error("Failed to delete user.");
  }
};

const getSubs = async (accessToken: string): Promise<Response> => {
  return fetch(`${BASE_URL}/api/subscriptions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetSubs = async (
  accessToken: string
): Promise<Array<Subscription>> => {
  const res = await rta(getSubs, accessToken);

  if (UNAUTHORIZED.includes(res.status)) {
    return [];
  }

  if (!res.ok) {
    throw new Error("Could not get subs.");
  }

  return await res.json();
};

const subscribe = async (
  authorId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authorId }),
  });
};

export const rtaSubscribe = async (
  authorId: string,
  accessToken: string
): Promise<Subscription> => {
  const res = await rta(subscribe, authorId, accessToken);

  if (!res.ok) {
    throw new Error("Failed to subscribe.");
  }

  return await res.json();
};

const unsubscribe = async (
  subId: string,
  accessToken: string
): Promise<Response> => {
  return await fetch(`${BASE_URL}/api/subscriptions/${subId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const rtaUnsubscribe = async (
  subId: string,
  accessToken: string
): Promise<void> => {
  const res = await rta(unsubscribe, subId, accessToken);

  if (!res.ok) {
    throw new Error("Failed to unsubscribe.");
  }
};
