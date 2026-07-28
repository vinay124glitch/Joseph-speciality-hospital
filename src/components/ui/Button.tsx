import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type IconPos = 'left' | 'right';

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  icon?: ReactNode;
  iconPos?: IconPos;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  icon,
  iconPos = 'right',
  className = '',
  type = 'button',
  disabled,
}: Props) {
  const content = (
    <>
      {icon && iconPos === 'left' && icon}
      {children}
      {icon && iconPos === 'right' && (icon ?? <ArrowRight className="w-4 h-4" />)}
    </>
  );

  const classes = `${variantClass[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
