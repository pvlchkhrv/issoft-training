export const fetchPicture = async () => {
  try {
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: new FormData(),
    });
  } catch (e) {}
};
