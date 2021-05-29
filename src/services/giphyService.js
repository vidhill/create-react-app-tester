import ky from "ky";

const baseUrl = "https://api.giphy.com/v1/gifs/random";
const apiKey = "e26089724ab941889d776827bf7c0c32";

const giphySearch = (searchTerm) => {
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    tag: searchTerm,
  });
  return ky
    .get(baseUrl + "?" + queryParams.toString())
    .json()
    .then((res) => res.data);
};

const giphySearchDownsampled = (...args) => {
  return giphySearch(...args).then(
    (response) => response.fixed_height_downsampled_url
  );
};

export { giphySearch, giphySearchDownsampled };
