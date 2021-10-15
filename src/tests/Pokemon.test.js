import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';

const LINK_MORE_DETAILS = 'More details';
// const pokemon = {
//   id: 25,
//   name: 'Pikachu',
//   type: 'Electric',
//   averageWeight: {
//     value: '6.0',
//     measurementUnit: 'kg',
//   },
//   image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
// };

describe('Teste o componente <Pokemon.js />', () => {
  describe('É renderizado um card com as informações de determinado pokémon.', () => {
    const pokemon = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    };

    it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const pokemonTitle = screen.getByTestId('pokemon-name');

      expect(pokemonTitle).toHaveTextContent('Pikachu');
    });

    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const pokemonTitle = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');

      expect(pokemonTitle).toHaveTextContent('Pikachu');
      expect(pokemonType).toHaveTextContent('Electric');
    });

    it(`O peso médio do pokémon deve ser exibido com um texto no formato
    Average weight: <value> <measurementUnit>;
    onde <value> e <measurementUnit> são, respectivamente,
    o peso médio do pokémon e sua unidade de medida.`, () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    });

    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src
    com a URL da imagem e um atributo alt com o texto <name> sprite,
    onde <name> é o nome do pokémon`, () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const pokemonImg = screen.getByRole('img');

      expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    });
    it(`Teste se o card do Pokémon indicado na Pokédex contém
    um link de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>, onde <id> é o
    id do Pokémon exibido.`, () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const detailsLink = screen.getByRole('link', { name: LINK_MORE_DETAILS });
      expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
    });
    it(`Teste se ao clicar no link de navegação do Pokémon,
    é feito o redirecionamento da aplicação para
    a página de detalhes de Pokémon.`, () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ false } />,
      );
      const detailsLink = screen.getByRole('link', { name: LINK_MORE_DETAILS });
      userEvent.click(detailsLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
    });
    it(`Teste também se a URL exibida
    no navegador muda para /pokemon/<id>,
    onde <id> é o id do Pokémon cujos
    detalhes se deseja ver`, () => {
      renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ false } />,
      );
      const detailsLink = screen.getByRole('link', { name: LINK_MORE_DETAILS });
      userEvent.click(detailsLink);
    });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const favIcon = screen.getByRole('img',
        { name: 'Pikachu is marked as favorite' });
      expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
      expect(favIcon).toBeInTheDocument();
    });
  });
});
