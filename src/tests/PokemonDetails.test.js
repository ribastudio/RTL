import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const CHECKBOX_TEXT = 'Pokémon favoritado?';

const pokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: `This intelligent Pokémon roasts hard
  berries with electricity to make them tender enough to eat.`,
}];

const PIKACHU_LOCATION = 'Pikachu location';
const match = {
  params: {
    id: 25,
  },
};

describe(`Teste se as informações detalhadas do
  Pokémon selecionado são mostradas na tela.`, () => {
  it(`A página deve conter um texto <name> Details,
      onde <name> é o nome do Pokémon.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const pokemonDetail = screen
      .getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(pokemonDetail).toBeInTheDocument();
  });

  // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing. Esta dica mostra como verificar se há algo, sem dar erro do getBy.
  it(`Não deve existir o link de navegação para os
      detalhes do Pokémon selecionado.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const linkDetails = screen.queryByText('More details');
    expect(linkDetails).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const textSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(textSummary).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com
      o resumo do Pokémon específico sendo visualizado.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const resumePar = screen
      .getByText(/This intelligent Pokémon roasts hard/i);
    expect(resumePar).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os
  mapas contendo as localizações do pokémon`, () => {
  it(`Na seção de detalhes deverá existir um heading h2
      com o texto Game Locations of <name>; onde <name>
      é o nome do Pokémon exibido.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const gameLocationsText = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(gameLocationsText).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const mapImage = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(mapImage).toHaveLength(2);
  });
  it(`Devem ser exibidos, o nome da localização e uma
  imagem do mapa em cada localização.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const mapImgContainer = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    const textLocation = screen.getByText('Kanto Viridian Forest');
    const textLocation2 = screen.getByText('Kanto Power Plant');
    expect(mapImgContainer).toHaveLength(2);
    expect(mapImgContainer[0]).toBeInTheDocument();
    expect(mapImgContainer[1]).toBeInTheDocument();
    expect(textLocation).toBeInTheDocument();
    expect(textLocation2).toBeInTheDocument();
  });

  it('A imagem da localização deve ter um atributo src com a URL da localização;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const mapImgContainer = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(mapImgContainer).toHaveLength(2);
    expect(mapImgContainer[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImgContainer[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`A imagem da localização deve ter um atributo 'alt'
  com o texto <name> location, onde <name> é o nome do Pokémon.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const mapImgContainer = screen.getAllByRole('img', { name: PIKACHU_LOCATION });
    expect(mapImgContainer).toHaveLength(2);
  });
});

describe(`Teste se o usuário pode favoritar um
  pokémon através da página de detalhes.`, () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const checkFavorite = screen.getByRole('checkbox', { name: CHECKBOX_TEXT });
    expect(checkFavorite).toBeInTheDocument();
  });

  it(`Cliques alternados no checkbox devem adicionar e remover
      respectivamente o Pokémon da lista de favoritos`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);

    const checkFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();

    userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado?;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        onUpdateFavoritePokemons={ false }
        isPokemonFavoriteById={ false }
      />,
    );
    const checkFavorite = screen.getByLabelText(CHECKBOX_TEXT);
    expect(checkFavorite).toBeInTheDocument();
  });
});
