import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import {
  contextMock,
  emailFailMock, emailMock,
  passwordFailMock, passwordMock, userStorageMock,
} from './mocks/user';

describe('Page login test', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should be redirected to "/login" when entering "/"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/login');
  });

  it('should be possible to find the login fields', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    const buttonRegister = screen.getByRole('button', { name: 'Ainda não tenho conta' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
  });

  it('should be possible to interact with the inputs', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(emailInput.value).toBe(emailMock);
    expect(passwordInput.value).toBe(passwordMock);
  });

  it('if the login button starts disabled', async () => {
    renderWithRouter(<App />);
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    expect(buttonSubmit).toBeDisabled();
  });

  it(
    'if the login button is disabled after filling in the fields with incorrect email',
    async () => {
      renderWithRouter(<App />);
      const emailInput = screen.getByLabelText('Login');
      const passwordInput = screen.getByLabelText('Senha');
      const buttonSubmit = screen.getByRole('button', { name: 'Login' });
      fireEvent.input(emailInput, { target: { value: emailFailMock } });
      fireEvent.input(passwordInput, { target: { value: passwordMock } });
      expect(buttonSubmit).toBeDisabled();
    },
  );

  it(
    'if the login button is disabled after filling in the fields with incorrect password',
    async () => {
      renderWithRouter(<App />);
      const emailInput = screen.getByLabelText('Login');
      const passwordInput = screen.getByLabelText('Senha');
      const buttonSubmit = screen.getByRole('button', { name: 'Login' });
      fireEvent.input(emailInput, { target: { value: emailMock } });
      fireEvent.input(passwordInput, { target: { value: passwordFailMock } });
      expect(buttonSubmit).toBeDisabled();
    },
  );

  it('if the login button is enabled after filling in the fields', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(buttonSubmit).toBeEnabled();
  });

  it('if after login and redirected to another page', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    fireEvent.click(buttonSubmit);
    waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
  });

  it(
    'if when clicking on I don\'t have an account yet and redirect /register',
    () => {
      const { history } = renderWithRouter(<App />);
      const buttonRegister = screen
        .getByRole('button', { name: 'Ainda não tenho conta' });
      fireEvent.click(buttonRegister);
      expect(history.location.pathname).toBe('/register');
    },
  );

  it('if you pass a wrong login, don\'t be redirect', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: 'passwordFail' } });
    fireEvent.click(buttonSubmit);
    waitFor(() => {
      expect(history.location.pathname).toBe('/login');
      expect(
        screen.getByTestId('common_login__element-invalid-email'),
      ).toBeInTheDocument();
    });
  });

  it(
    'if you have a user as admin in localStorage, should be redirected to /admin/manage',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'administrator' }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/admin/manage'));
    },
  );

  it(
    'if you have a user as seller in Storage, should be redirected to /seller/orders',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'seller' }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/seller/orders'));
    },
  );

  it(
    'if you have a user as client in Storage, should be redirected to /customer/orders',
    async () => {
      Storage.prototype.getItem = jest
        .fn(() => JSON.stringify({ role: 'customer' }));
      const { history } = renderWithRouter(<App />);
      waitFor(() => expect(history.location.pathname).toBe('/customer/orders'));
    },
  );

  it('it on successful login you should have "user" key in local storage', async () => {
    const spyAxios = jest.spyOn(axios, 'post')
      .mockImplementation(() => Promise.resolve({ data: userStorageMock }));
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(userStorageMock));
    renderWithRouter(<App />, contextMock);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    fireEvent.click(buttonSubmit);
    waitFor(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      expect(userData.email).toEqual(userStorageMock.email);
      expect(userData.role).toEqual(userStorageMock.role);
      expect(userData.name).toEqual(userStorageMock.name);
      expect(userData.token).toEqual(userStorageMock.token);
      expect(spyAxios).toHaveBeenCalled();
    });
  });

  it('if a seller login it should redirect to /seller/orders', async () => {
    const spyAxios = jest.spyOn(axios, 'post')
      .mockImplementation(() => Promise.resolve({
        data: { ...userStorageMock, role: 'seller' },
      }));
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [] }));
    Storage.prototype.getItem = jest.fn(() => JSON
      .stringify({ ...userStorageMock, role: 'seller' }));
    const { history } = renderWithRouter(<App />, contextMock);
    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const buttonSubmit = screen.getByRole('button', { name: 'Login' });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    fireEvent.click(buttonSubmit);
    waitFor(() => {
      expect(spyAxios).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/seller/orders');
    });
  });
});
