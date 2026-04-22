export const FileDelimiters = {
  SEMICOLON: ';',
  COMMA: ',',
  VERTICAL_BAR: '|',
  TTAB: '\t',
};

export type FileDelimiter = (typeof FileDelimiters)[keyof typeof FileDelimiters];

export function fileDelimiterFromString(value: string): FileDelimiter {
  const modes = Object.values(FileDelimiters);
  if (modes.includes(value as FileDelimiter)) {
    return value as FileDelimiter;
  }
  throw new Error(
    `El delimitador del archivo es inválido: ${value}. Valores permitidos: ${modes.join(',')}`,
  );
}
