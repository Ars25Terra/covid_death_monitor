import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {RootStoreProvider} from "./app/stores/StoreProvider";

test('Test1: Authorize Button in Login Form', () => {
  render(<RootStoreProvider>
    <App/>
  </RootStoreProvider>);
  const buttonElement = screen.getByText(/AUTHORIZE/i);
  expect(buttonElement).toBeInTheDocument();
});

test('Test2: User Name Input in Login Form', () => {
  render(<RootStoreProvider>
    <App/>
  </RootStoreProvider>);
  const userNameInput = screen.getByTestId('userNameInput');
  expect(userNameInput).toBeInTheDocument();
});

