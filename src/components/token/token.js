export const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }
  return { authorization: `Bearer ${token}` };
};
