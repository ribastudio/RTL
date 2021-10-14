import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente <About.js />.', () => {
  it('A página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const textPokedex = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(textPokedex).toBeInTheDocument();
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const pokedexParagraph1 = screen.getByText((content) => content
      .startsWith('This application'));
    expect(pokedexParagraph1).toBeInTheDocument();
    const pokedexParagraph2 = screen.getByText((content) => content
      .startsWith('One can filter'));
    expect(pokedexParagraph2).toBeInTheDocument();
  });

  it('Se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});
