# MusicApp

Este é um projeto de catálogo de músicas desenvolvido com React, utilizando Vite e TypeScript. A aplicação interage com a API oficial da Deezer para exibir informações sobre artistas, álbuns, gêneros musicais e playlists populares. O usuário pode explorar e ouvir músicas diretamente na Deezer.

## Tecnologias Utilizadas

- **React** com **Vite** e **TypeScript**
- **React Router** para navegação entre páginas
- **Tailwind CSS** para estilização
- **API Oficial da Deezer** para obtenção de dados musicais
- **ShadCN/UI** para componentes visuais modernos

## Funcionalidades

- Navegação entre diferentes seções: artistas, álbuns, playlists e gêneros musicais
- Busca de músicas diretamente na API da Deezer
- Exibição de detalhes de músicas, álbuns e artistas
- Direcionamento para o site da Deezer ao clicar nas músicas para reprodução
- Design responsivo e moderno utilizando Tailwind CSS e ShadCN/UI

## Instalação

Para rodar o projeto localmente:

1. Clone o repositório:
   ```sh
   git clone https://github.com/FrancieleAlmeida/MusicCatalogue.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd MusicCatalogue
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o projeto:
   ```sh
   npm run dev
   ```

## Implantação

O projeto foi implantado no Vercel e pode ser acessado através do seguinte link: https://music-catalogue.vercel.app/

## Estrutura do Projeto

```sh
   MusicCatalogue/
   │
   ├── public/                    # Arquivos públicos
   │
   ├── src/                       # Código-fonte da aplicação
   │   ├── assets/                 # Arquivos estáticos, como imagens
   │   ├── components/             # Componentes reutilizáveis
   │   ├── pages/                  # Páginas da aplicação
   │   ├── services/               # Arquivos para realizar requisições à API
   │   ├── routes/                 # Arquivo para configuração de rotas (React Router)
   │   ├── App.tsx                 # Componente raiz do aplicativo
   │   ├── main.tsx                # Ponto de entrada (renderiza o App)
   │   └── index.html              
   │
   ├── .gitignore                  # Arquivo para ignorar arquivos no Git
   ├── package.json                # Arquivo de dependências e scripts
   ├── README.md                   # Documentação do projeto
   └── tsconfig.json               # Arquivo de configuração do TypeScript
```

