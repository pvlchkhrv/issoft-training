export const handleResponse = async (response) => {
  if (!response) {
    throw new Error({message: 'Something wrong!'});
  }
  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data.message);
  }
}
