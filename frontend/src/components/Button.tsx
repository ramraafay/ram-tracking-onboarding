import React from "react";
import { ButtonColour } from "../types/ButtonColor";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colour: ButtonColour;
}

const Button: React.FC<ButtonProps> = ({ colour, ...props }) => {
  return (
    <button
      className={`inline-block rounded-[5px] ${colour} px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus:ring-3 focus:outline-hidden text-nowrap w-min`}
      {...props}
    />
  );
};

export default Button;
