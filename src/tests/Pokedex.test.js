import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const LABEL_NEXT_BUTTON = 'next-pokemon';
const POKEMON_NAME = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const h2Encountered = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2Encountered).toBeInTheDocument();
  });
});

describe('É exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
  it('O botão deve conter o texto Próximo pokémon;', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByTestId(LABEL_NEXT_BUTTON);
    expect(btnNextPokemon).toBeInTheDocument();
  });
  it('Deve exibir os próximos Pokémons. Ao clicar sucessivamente, volta ao 1o', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByTestId(LABEL_NEXT_BUTTON);
    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Charmander');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Caterpie');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Ekans');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Alakazam');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Mew');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Rapidash');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Snorlax');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Dragonair');

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});

describe('É mostrado apenas um Pokémon por vez.', () => {
  it('Verifica dse há só um Pokemon na tela', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByTestId(LABEL_NEXT_BUTTON);
    const pokemonName = screen.getAllByTestId(POKEMON_NAME);

    userEvent.click(btnNextPokemon); // executa um clique
    expect(pokemonName.length).toBe(1);
  });
  describe('Se a Pokédex tem os botões de filtro', () => {
    it(`Deve existir um botão de filtragem
    para cada tipo de Pokémon, sem repetição.`, () => {
      const numberPokemonCategories = 7;
      renderWithRouter(<App />);
      const btnPokemonClasses = screen.getAllByTestId('pokemon-type-button');
      expect(btnPokemonClasses.length).toBe(numberPokemonCategories);
      expect(btnPokemonClasses[0]).toHaveTextContent('Electric');
      expect(btnPokemonClasses[1]).toHaveTextContent('Fire');
      expect(btnPokemonClasses[2]).toHaveTextContent('Bug');
      expect(btnPokemonClasses[3]).toHaveTextContent('Poison');
      expect(btnPokemonClasses[4]).toHaveTextContent('Psychic');
      expect(btnPokemonClasses[5]).toHaveTextContent('Normal');
      expect(btnPokemonClasses[6]).toHaveTextContent('Dragon');
    });
    it(`A partir da seleção de um botão de tipo,
    a Pokédex deve circular somente pelos pokémons daquele tipo;`, () => {
      renderWithRouter(<App />);
      const pokemonType = screen.getByTestId('pokemon-type');
      const btnCategories = screen.getByRole('button', { name: 'Fire' });

      expect(btnCategories).toBeInTheDocument();
      userEvent.click(btnCategories);
      expect(pokemonType).toHaveTextContent('Fire');
      expect(pokemonType).not.toHaveTextContent('Poison');
    });
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    it('O texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByRole('button', { name: 'All' });
      expect(btnAll).toBeInTheDocument();
    });

    it(`A Pokedéx deverá mostrar os Pokémons normalmente
    (sem filtros) quando o botão All for clicado;`, () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByRole('button', { name: 'All' });
      const pokemonName = screen.getByTestId(POKEMON_NAME);

      userEvent.click(btnAll);
      expect(pokemonName).toHaveTextContent('Pikachu');
    });
    it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
      renderWithRouter(<App />);
      const btnAll = screen.queryByRole('button', { name: 'All' });
      expect(btnAll).toBeInTheDocument();
    });
  });
});
