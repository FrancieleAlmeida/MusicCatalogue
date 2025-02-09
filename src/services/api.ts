import axios from "axios";

// Proxy para contornar CORS
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Criando instância do Axios com a API do Deezer
const api = axios.create({
  baseURL: `${CORS_PROXY}https://api.deezer.com`,
});

// 🔍 Buscar faixas (músicas) por nome
export const searchTracks = async (query: string) => {
  const response = await api.get(`/search?q=${query}`);
  return response.data.data;
};

// 🎤 Buscar informações de um artista pelo ID
export const getArtist = async (id: string) => {
  const response = await api.get(`/artist/${id}`);
  return response.data;
};

// 🎶 Buscar informações de um álbum pelo ID
export const getAlbum = async (id: string) => {
  const response = await api.get(`/album/${id}`);
  return response.data;
};

// 📀 Buscar informações de uma playlist pelo ID
export const getPlaylist = async (id: string) => {
  const response = await api.get(`/playlist/${id}`);
  return response.data;
};

// 🔥 Buscar playlists populares
export const getPlaylists = async () => {
  try {
    const response = await api.get("/chart/0/playlists");

    // Garantir que só retornamos playlists válidas
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

// 🔥 Buscar artistas populares
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

export default api;