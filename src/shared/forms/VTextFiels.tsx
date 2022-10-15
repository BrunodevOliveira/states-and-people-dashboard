import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
  //Dessa forma o type tem todas as props do TextField
  name: string;
};

//V-> é a letra qeu diferencia o que é componente personalizado do Unform dos demais componentes
//Como esse componente é filho do Form, podemos acessar alguns hooks do Unform
export const VtextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  //permite transformar o componente TextField em um componente unform:
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  //fieldName-> identifica o componente VtextField de forma única dentro do contexto do Unform
  //DefaultValue-> valor padrão do compoinformado no componente Form
  //error-> quando houver algum erro de validação esse erro será recebido por essa var
  //clearError-> limpa o erro

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value, //o Unform pega o valor que estiver no Value e entrega no onSubmit do Form
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={!!error} //primeiro exclamação transforma o valor para booleano, o segundo deixa esse valor como true
      helperText={error}
      defaultValue={defaultValue}
      value={value}
      onKeyDown={() => (error ? clearError() : undefined)} //limpa o erro do campo preenchido
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
