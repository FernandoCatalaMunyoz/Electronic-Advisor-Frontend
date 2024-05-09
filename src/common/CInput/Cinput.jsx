import "./Cinput.css";

export const CInput = ({
  className,
  type,
  placeHolder,
  name,
  disabled,
  value,
  onChangeFunction,
  onBlurFunction,
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeHolder}
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChangeFunction}
      onBlur={onBlurFunction}
    />
  );
};
