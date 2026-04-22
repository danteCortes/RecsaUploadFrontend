export const DecimalSeparators = {
  COMMA: ',',
  POINT: '.',
};

export type DecimalSeparator = (typeof DecimalSeparators)[keyof typeof DecimalSeparators];

export function decimalSeparatorFromString(value: string): DecimalSeparator {
  const modes = Object.values(DecimalSeparators);
  if (modes.includes(value as DecimalSeparator)) {
    return value as DecimalSeparator;
  }
  throw new Error(
    `El separador decimal es inválido: ${value}. Valores permitidos: ${modes.join(',')}`,
  );
}
