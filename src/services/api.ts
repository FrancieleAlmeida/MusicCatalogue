import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const api = axios.create({
  baseURL: `${CORS_PROXY}https://api.deezer.com`,
});

export const searchTracks = async (query: string) => {
  const response = await api.get(`/search?q=${query}`);
  return response.data.data;
};

export const getArtist = async (id: string) => {
  const response = await api.get(`/artist/${id}`);
  return response.data;
};

export const getAlbum = async (id: string) => {
  const response = await api.get(`/album/${id}`);
  return response.data;
};

export const getPlaylist = async (id: string) => {
  const response = await api.get(`/playlist/${id}`);
  return response.data;
};

export const getPlaylists = async () => {
  try {
    const response = await api.get("/chart/0/playlists");
    const playlists = response.data.data.filter((item: { id: any; title: any; type: string }) =>
      item.id && item.title && item.type === "playlist"
    );

    console.log("Playlists recebidas:", playlists);
    return playlists;
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    return null;
  }
};


export const getArtists = async () => {
  try {
    const response = await api.get("/chart/0/artists");
    console.log("Artistas populares:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    return null;
  }
};

export const getAlbums = async () => {
  try {
    const response = await api.get("/chart/0/albums");
    console.log("Albuns populares:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar album:", error);
    return null;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get("/genre");
    const genres = response.data.data.filter((genre: { id: number }) => genre.id !== 0);
    console.log("Gêneros filtrados:", genres);
    return genres;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return null;
  }
};



export const getTracks = async () => {
  try {
    const response = await api.get("/chart/0/tracks");
    console.log("Faixas populares:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar faixas:", error);
    return null;
  }
};

export default api;