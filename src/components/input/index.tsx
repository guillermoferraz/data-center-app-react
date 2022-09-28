import './input.scss';

interface InputTypes {
  id?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string|number;
}

export const Input = ({
  id,
  placeholder,
  type,
  name,
  autoComplete,
  onChange,
  value
}:InputTypes) => {
  return (
    <input
      className="input"
      id={id} 
      placeholder={placeholder}
      type={type}
      name={name}
      autoComplete={autoComplete}
      onChange={onChange}
      value={value}
      />
  )
}