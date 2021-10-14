import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
// Peguei esta dica com a Ariane Ueti, da 14B. Serve para renderizar com as rotas, para verificar e testar os links
import '@testing-library/jest-dom';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: 'Home' });
      expect(linkHome).toBeInTheDocument();

      const linkAbout = screen.getByRole('link', { name: 'About' });
      expect(linkAbout).toBeInTheDocument();

      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkFavorite).toBeInTheDocument();
    });

  test('É redirecionada para a página inicial, ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: 'Home' });
      userEvent.click(linkHome);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  test('É redirecionada para a página de About, em /about, ao clicar no link About.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: 'About' });
      userEvent.click(linkAbout);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  test('Redirecionada para a Favoritados, na /favorites, ao clicar em Favorite Pokémons.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(linkFav);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  test('É redirecionada para a Not Found ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notFoundRoute');
      const error404 = screen
        .getByRole('heading', { level: 2, name: /Page requested not found/ });
      expect(error404).toBeInTheDocument();
    });
});
