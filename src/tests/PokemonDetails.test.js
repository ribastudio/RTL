import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

const CHECKBOX_TEXT = 'Pokémon favoritado?';

describe(`Teste se as informações detalhadas do
  Pokémon selecionado são mostradas na tela.`, () => {

  const pokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  it(`A página deve conter um texto <name> Details,
      onde <name> é o nome do Pokémon.`, () => {
    renderWithRouter(<PokemonDetails />);
    const pokemonDetail = screen.getByRole('heading', { level: 2 });
    expect(pokemonDetail).toBeInTheDocument();
  });

  // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing. Esta dica mostra como verifricar se há algo sem dar erro do getBy.
  it(`Não deve existir o link de navegação para os
      detalhes do Pokémon selecionado.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const linkDetails = screen.queryByText('More details');
    expect(linkDetails).not.toBeInTheDocument();
    //
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const textSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(textSummary).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com
      o resumo do Pokémon específico sendo visualizado.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const resumePar = screen.getByRole('paragraph');
    expect(resumePar).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os
  mapas contendo as localizações do pokémon`, () => {
  const pokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };
  it(`Na seção de detalhes deverá existir um heading h2
      com o texto Game Locations of <name>; onde <name>
      é o nome do Pokémon exibido.`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    //
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const mapImage = screen.getAllByRole('img');
    expect(mapImage).toHaveAttribute('src', '');
  });
  it(`Devem ser exibidos, o nome da localização e uma
  imagem do mapa em cada localização.`, () => {
    //
  });

  it('A imagem da localização deve ter um atributo src com a URL da localização;', () => {
    const mapImage = screen.getAllByRole('img');
    expect(mapImage).toHaveAttribute('src', '');
  });

  it(`A imagem da localização deve ter um atributo 'alt'
  com o texto <name> location, onde <name> é o nome do Pokémon.`, () => {
    const mapImage = screen.getAllByRole('img');
    expect(mapImage).toHaveAttribute('src', '');
  });
});

describe(`Teste se o usuário pode favoritar um
  pokémon através da página de detalhes.`, () => {
  const pokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const checkFavorite = screen.getByRole('checkbox', { name: CHECKBOX_TEXT });
    expect(checkFavorite).toBeInTheDocument();
  });

  it(`Cliques alternados no checkbox devem adicionar e remover
      respectivamente o Pokémon da lista de favoritos`, () => {
    renderWithRouter(
      <PokemonDetails
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
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
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );
    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).toHaveTextContent(CHECKBOX_TEXT);
  });
});
