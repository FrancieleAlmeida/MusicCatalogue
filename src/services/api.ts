import axios from "axios";

const api = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "6bcdf6606bmshd11d9521448bceap1d5b11jsn5a6ca7186c9e",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
});

export const searchTracks = async (query: string) => {
  const response = await api.get(`/search?q=${query}`);
  return response.data.data;
};

export const getArtist = async (id: string) => {
  const response = await api.get(`/artist/${id}`);
  return response.data;
};

export const getPlaylist = async (id: string) => {
  const response = await api.get(`/playlist/${id}`);
  return response.data;
};

export const getAlbum = async (id: string) => {
  const response = await api.get(`/album/${id}`);
  return response.data;
};



export default api;
