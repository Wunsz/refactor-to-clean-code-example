import { fireEvent, render } from '@testing-library/react';
import TextAreaInput from './TextAreaInput';

describe('components / forms / raw / <TextInput/>', () => {
  it('should render default component with label', () => {
    const { getByLabelText } = render(<TextAreaInput label="label" value="some text" onChange={vi.fn()} />);

    expect((getByLabelText('label') as HTMLInputElement).value).toEqual('some text');
  });

  it('firing text change on input should trigger onChange', () => {
    const changeHandler = vi.fn();

    const { getByLabelText } = render(
      <TextAreaInput label="label" value="some text" onChange={(event) => changeHandler(event.target.value)} />,
    );

    fireEvent.change(getByLabelText('label'), { target: { value: 'new text' } });

    expect(changeHandler).toHaveBeenCalledWith('new text');
  });
});
