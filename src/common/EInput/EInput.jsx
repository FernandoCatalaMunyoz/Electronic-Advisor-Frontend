import "./Einput.css";

export const EInput = ({
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
      className={"EInputDesign"}
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
