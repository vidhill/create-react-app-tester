import ky from "ky";

const baseUrl = "https://api.giphy.com/v1/gifs/random?";

const giphyService = (searchTerm) => {
  const queryParams = new URLSearchParams({
    api_key: "e26089724ab941889d776827bf7c0c32",
    tag: searchTerm,
  });
  return ky
    .get(baseUrl + queryParams.toString())
    .json()
    .then((res) => res.data);
};

const getGiphySearchDownsampled = (...args) => {
  return giphyService(...args).then(
    (response) => response.fixed_height_downsampled_url
  );
};

export { giphyService, getGiphySearchDownsampled };
