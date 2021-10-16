import {
  AuthenticateUserRequestBody,
  AuthResponse,
  ConnectToLndBody,
  CreateUserRequestBody,
  Invoice,
  LndNode,
  LogPaymentRequestBody,
  NodeInfo,
  PaymentStatus,
  Post,
  PostRequestBody,
  User,
  UserRequestBody,
} from "./types";

const UNAUTHORIZED = [401, 403];

// TODO: Refactor retry logic to something reusable

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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await createNewPost(body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create new post, even after retrying with a fresh access token."
      );
    }
  }
};

export const disconnectNode = async (lndToken: string): Promise<Response> => {
  return await fetch("/api/node", {
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

const getDrafts = async (accessToken: string): Promise<Response> => {
  return await fetch("/api/drafts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetDrafts = async (
  accessToken: string
): Promise<Array<Post>> => {
  const response = await getDrafts(accessToken);

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getDrafts(newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to get drafts, even after trying to get a new access token."
      );
    }

    return await retryResponse.json();
  }

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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getPost(id, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to get post, even after trying to get a new access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await connectToLnd(body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to connect to LND, even after trying to get a new access token."
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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await updateUser(userId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to update user, even after trying to get a new access token."
      );
    }
  }
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

const getCurrentUser = async (accessToken: string): Promise<Response> => {
  return await fetch("/api/users/current", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const rtaGetCurrentUser = async (
  accessToken: string
): Promise<User | null> => {
  const response = await getCurrentUser(accessToken);

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getCurrentUser(newAccessToken);

    if (!retryResponse.ok) {
      // User is not logged in, return null
      return null;
    }

    return await retryResponse.json();
  }

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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await createInvoice(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to create invoice, even after trying to get a new access token."
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

export const rtaGetPayment = async (
  postId: string,
  accessToken: string
): Promise<PaymentStatus> => {
  const response = await getPayment(postId, accessToken);

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await getPayment(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to get payment, even after trying to get a new access token."
      );
    }

    return await retryResponse.json();
  }

  return await response.json();
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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await logPayment(postId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to log payment, even after trying to get a new access token."
      );
    }
  }
};

const updatePost = async (
  postId: string,
  body: PostRequestBody,
  accessToken: string
): Promise<Response> => {
  return await fetch(`/api/posts/${postId}`, {
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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await updatePost(postId, body, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to update post, even after trying to get a new access token."
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

  if (UNAUTHORIZED.includes(response.status)) {
    const newAccessToken = await regenerateAccessToken();
    const retryResponse = await deletePost(postId, newAccessToken);

    if (!retryResponse.ok) {
      throw new Error(
        "Failed to delete post, even after trying to get a new access token."
      );
    }
  }
};

export const deleteRefreshToken = async (): Promise<Response> => {
  return await fetch("/api/refreshToken", {
    method: "DELETE",
  });
};
