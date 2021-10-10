export const regenerateAccessToken = async (): Promise<string> => {
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

type NewPostRequestBody = {
  title: string;
  content: string;
  price: number;
};

const createNewPost = async (
  body: NewPostRequestBody,
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
  body: NewPostRequestBody,
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
