import * as React from 'react';
import { render, screen, cleanup, getByTestId } from '@testing-library/react';
import App from './App';
import axios from 'axios';

const mockedAxios = axios

afterAll(() => {
  cleanup()
})


  const app = render(<App />);
  let emailField = app.getByTestId("email");
  let passwordField = app.getByTestId("password");

  it('form should be empty', () => {
  expect(emailField).toBeEmptyDOMElement();
  expect(passwordField).toBeEmptyDOMElement();
  })

  it('input should be required', () => {
  expect(emailField).toBeRequired();
  expect(passwordField).toBeRequired();
  })

  const data = {email: "test@zyax.se", password: "!zyaxSe981"};
  it("localstorage should store accesskey", () => {
    mockedAxios
      .post(`https://test.zyax.se/access/`, data)
      .then((Response) => {
        localStorage.setItem("token", Response.data.accessToken);

      expect(localStorage.getItem).toBeCalledWith("token");
  })
  localStorage.removeItem("token")
})

  
