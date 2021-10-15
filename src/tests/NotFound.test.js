import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const h2Heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(h2Heading).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgPokeNotFound = screen
      .getByRole('img', { name: /Pikachu crying because/ });
    expect(imgPokeNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgPokeNotFound).toBeInTheDocument();
  });
});
