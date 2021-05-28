import ky from "ky";

const baseUrl = "https://api.giphy.com/v1/gifs/random?api_key=e26089724ab941889d776827bf7c0c32&tag=";

const giphyService = async (searchTerm) => {
  const resp = await ky.get(baseUrl + searchTerm);
  const json = await resp.json();
  return json.data;
};

export { giphyService };