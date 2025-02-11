
import axios from "axios";

const PROXY_URL = "https://thingproxy.freeboard.io/fetch/";
const API_BASE_URL = "https://api.deezer.com";
const api = axios.create({
  baseURL: `${PROXY_URL}${API_BASE_URL}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
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

    return playlists;
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    return null;
  }
};


export const getArtists = async () => {
  try {
    const response = await api.get("/chart/0/artists");
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    return null;
  }
};

export const getAlbums = async () => {
  try {
    const response = await api.get("/chart/0/albums");
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
    return genres;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return null;
  }
};

export const getGenreById = async (id: string | number) => {
  try {
    const response = await api.get(`/genre/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o gênero:", error);
    return null;
  }
};

export const getArtistsByGenre = async (genreId: string) => {
  try {
    const url = `/genre/${genreId}/artists`;
    const response = await api.get(url);
    return response.data.data || [];
  } catch (error: any) {
    console.error("Erro ao buscar artistas do gênero:", error.message);
    if (error.response) {
      console.error("Status HTTP:", error.response.status);
      console.error("Resposta do servidor:", error.response.data);
    }

    return [];
  }
};

export const getTracks = async () => {
  try {
    const response = await api.get("/chart/0/tracks");
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar faixas:", error);
    return null;
  }
};

export const getTrack = async (id: any) => {
  try {
    const response = await api.get(`/track/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a faixa:", error);
    return null;
  }
};


export default api;
