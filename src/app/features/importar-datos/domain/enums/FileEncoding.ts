const FileEncodings = {
  UTF8: 'UTF-8',
  LATIN1: 'Latin1',
  WINDOWS1252: 'Windows-1252',
};

export type FileEncoding = (typeof FileEncodings)[keyof typeof FileEncodings];

export function fileEncodingFromString(value: string): FileEncoding {
  const modes = Object.values(FileEncodings);
  if (modes.includes(value as FileEncoding)) {
    return value as FileEncoding;
  }
  throw new Error(
    `La codificación del archivo es inválido: ${value}. Valores permitidos: ${modes.join(',')}`,
  );
}
