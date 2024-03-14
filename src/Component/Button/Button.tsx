import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './type';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...rest // This will capture any additional props passed to the component
}) => {
  return (
    <MuiButton {...rest} onClick={onClick}>
      {children}
    </MuiButton>
  );
};
