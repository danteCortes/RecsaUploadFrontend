export const FirstRowHeadersValues = {
  YES: 'SI',
  NO: 'NO',
};

export type FirstRowHeaders = (typeof FirstRowHeadersValues)[keyof typeof FirstRowHeadersValues];

export function firstRowHeadersFromString(value: string): FirstRowHeaders {
  const modes = Object.values(FirstRowHeadersValues);
  if (modes.includes(value as FirstRowHeaders)) {
    return value as FirstRowHeaders;
  }
  throw new Error(
    `Encabezados en la primera fila es inválido: ${value}. Valores permitidos: ${modes.join(',')}`,
  );
}
