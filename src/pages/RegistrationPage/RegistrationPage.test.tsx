import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  it('Renders correct registration page', () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));

    render(<RegistrationPage onRegister={onSubmit} />);

    // All elements are on the page
    expect(screen.queryByLabelText('Name')).toBeInTheDocument();
    expect(screen.queryByLabelText('Email')).toBeInTheDocument();
    expect(screen.queryByLabelText('Address')).toBeInTheDocument();
    expect(screen.queryByLabelText('I agree to terms and conditions')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to our register page!')).toBeInTheDocument();

    expect(screen.queryByText('Clean code register!')).toBeInTheDocument();
    expect(screen.queryByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Other')).toBeInTheDocument();

    expect(screen.queryByText('Register!')).toBeInTheDocument();

    // Modal not visible by default
    expect(screen.queryByText('Registration successful!')).not.toBeInTheDocument();
    expect(screen.queryByText('Here are your details')).not.toBeInTheDocument();
    expect(screen.queryByText('Your registration request will be processed within 24 hours!')).not.toBeInTheDocument();
  });

  it('Sets text properly', async () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));

    render(<RegistrationPage onRegister={onSubmit} />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    expect(emailInput.nextSibling).not.toBeInTheDocument();

    await user.click(emailInput);
    await user.type(emailInput, 'test');

    expect(emailInput).toHaveValue('test');

    await user.clear(emailInput);

    expect(emailInput).toHaveValue('');
  });

  it('Renders errors on submit of empty form', async () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));

    render(<RegistrationPage onRegister={onSubmit} />);
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const addressInput = screen.getByLabelText('Address') as HTMLInputElement;
    const termsInput = screen.getByLabelText('I agree to terms and conditions') as HTMLInputElement;

    expect(nameInput.nextSibling).not.toBeInTheDocument();
    expect(emailInput.nextSibling).not.toBeInTheDocument();
    expect(addressInput.nextSibling).not.toBeInTheDocument();
    expect(termsInput.parentElement?.nextSibling).not.toBeInTheDocument();

    await user.click(screen.getByText('Register!'));

    expect(nameInput.nextSibling).not.toBeInTheDocument();
    expect(emailInput.nextSibling).toHaveTextContent('This field is required');
    expect(addressInput.nextSibling).toHaveTextContent('This field is required');
    expect(termsInput.parentElement?.nextSibling).toHaveTextContent('This field is required');
  });

  it('Renders api error on false response as terms error', async () => {
    const onSubmit = vi.fn(() => Promise.resolve(false));

    render(<RegistrationPage onRegister={onSubmit} />);
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const addressInput = screen.getByLabelText('Address') as HTMLInputElement;
    const termsInput = screen.getByLabelText('I agree to terms and conditions') as HTMLInputElement;

    await user.type(nameInput, 'Name');
    await user.type(emailInput, 'Email');
    await user.type(addressInput, 'Address');
    await user.click(termsInput);

    await user.click(screen.getByText('Register!'));

    expect(nameInput.nextSibling).not.toBeInTheDocument();
    expect(emailInput.nextSibling).not.toBeInTheDocument();
    expect(addressInput.nextSibling).not.toBeInTheDocument();
    expect(termsInput.parentElement?.nextSibling).toHaveTextContent('API Error - try again!');

    expect(screen.queryByText('Registration successful!')).not.toBeInTheDocument();
    expect(screen.queryByText('Here are your details')).not.toBeInTheDocument();
    expect(screen.queryByText('Your registration request will be processed within 24 hours!')).not.toBeInTheDocument();
  });

  it('Renders success modal and then hides it', async () => {
    const onSubmit = vi.fn(() => Promise.resolve(true));

    render(<RegistrationPage onRegister={onSubmit} />);
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const addressInput = screen.getByLabelText('Address') as HTMLInputElement;
    const termsInput = screen.getByLabelText('I agree to terms and conditions') as HTMLInputElement;

    await user.type(nameInput, 'Joe');
    await user.type(emailInput, 'joe@test.com');
    await user.type(addressInput, 'Kentucky Rd 12');
    await user.click(termsInput);

    await user.click(screen.getByText('Register!'));

    expect(nameInput.nextSibling).not.toBeInTheDocument();
    expect(emailInput.nextSibling).not.toBeInTheDocument();
    expect(addressInput.nextSibling).not.toBeInTheDocument();
    expect(termsInput.parentElement?.nextSibling).not.toBeInTheDocument();

    expect(screen.queryByText('Registration successful!')).toBeInTheDocument();
    expect(screen.queryByText('Here are your details')).toBeInTheDocument();
    expect(screen.queryByText('Your registration request will be processed within 24 hours!')).toBeInTheDocument();

    const details = screen.getByText('Here are your details').nextSibling;

    expect(details?.childNodes.item(0)).toHaveTextContent('Name');
    expect(details?.childNodes.item(1)).toHaveTextContent('Joe');
    expect(details?.childNodes.item(2)).toHaveTextContent('Email');
    expect(details?.childNodes.item(3)).toHaveTextContent('joe@test.com');
    expect(details?.childNodes.item(4)).toHaveTextContent('Address');
    expect(details?.childNodes.item(5)).toHaveTextContent('Kentucky Rd 12');

    await user.click(screen.getByText('Ok'));

    expect(screen.queryByText('Registration successful!')).not.toBeInTheDocument();
    expect(screen.queryByText('Here are your details')).not.toBeInTheDocument();
    expect(screen.queryByText('Your registration request will be processed within 24 hours!')).not.toBeInTheDocument();
  });
});
