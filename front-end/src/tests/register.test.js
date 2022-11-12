import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mockProducts from './mocks/productsMocks';
import { sellers } from './mocks/sellers';
import {
  allUsers,
  emailMock,
  nameMock,
  passwordMock, responseApi, userAlreadyExists,
} from './mocks/user';

describe('Register page', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockProducts,
    }).mockResolvedValueOnce({
      data: sellers,
    }).mockResolvedValueOnce({
      data: allUsers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should render the register page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    expect(history.location.pathname).toBe('/register');
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('should be possible to interact with the inputs', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    fireEvent.input(nameInput, { target: { value: nameMock } });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(nameInput.value).toBe(nameMock);
    expect(emailInput.value).toBe(emailMock);
    expect(passwordInput.value).toBe(passwordMock);
  });

  it('if the login button is enabled after filling in the fields', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.input(nameInput, { target: { value: nameMock } });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    expect(registerButton).toBeEnabled();
  });

  it('if after successful registration you should redirect to customer page', () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: responseApi,
    });
    const userLocalStorage = { name: nameMock, email: emailMock, role: 'customer' };
    const { history } = renderWithRouter(<App />);
    history.push('/register');
    const nameInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });
    fireEvent.input(nameInput, { target: { value: nameMock } });
    fireEvent.input(emailInput, { target: { value: emailMock } });
    fireEvent.input(passwordInput, { target: { value: passwordMock } });
    fireEvent.click(registerButton);
    waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(userLocalStorage));
    });
  });

  it(
    'if there is already a user with the name, the message "Usuário ou email já existe!"',
    () => {
      axios.post.mockRejectedValueOnce(userAlreadyExists);
      const { history } = renderWithRouter(<App />);
      history.push('/register');
      const nameInput = screen.getByLabelText(/nome/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/senha/i);
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
      fireEvent.input(nameInput, { target: { value: nameMock } });
      fireEvent.input(emailInput, { target: { value: emailMock } });
      fireEvent.input(passwordInput, { target: { value: passwordMock } });
      fireEvent.click(registerButton);
      waitFor(() => {
        expect(screen.getByText(/usuário ou email já existe/i)).toBeInTheDocument();
      });
    },
  );
});
