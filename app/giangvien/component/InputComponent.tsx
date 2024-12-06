import React from "react";

interface Props {
  value: string,
  onChange: (val: any) => void,
  type: string,
  placeholder: string,
  name: string
}

const InputComponents: React.FC<Props> = ({
  value,
  onChange,
  type,
  placeholder,
  name
}) => {
  return (
    <input
      type={type}
      className="form-control"
      id={name}
      style={{ height: 50, backgroundColor: '#f5f6fa', borderColor: '#f5f6fa', borderRadius: 10 }}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default InputComponents 