import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('É exibido No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
    // const img = screen.getByRole('img');
    // expect(img).not.toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const Pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ Pokemons }/>);
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByText('Electric'); 
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
  });
});
