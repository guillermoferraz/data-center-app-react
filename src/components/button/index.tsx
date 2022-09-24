import './button.scss';

interface ButtonTypes {
  onClick?: () => void;
  label?: string;
}

export const Button = ({ onClick, label }: ButtonTypes) => {
  return (
    <button className="btn-submit" onClick={onClick}>
      { label || "Button"}
    </button>
  )
}