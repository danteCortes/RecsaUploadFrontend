const FileFormats = {
  CSV: 'CSV',
  XLSX: 'XLSX',
  TXT: 'TXT',
  JSON: 'JSON',
  XML: 'XML',
};

export type FileFormat = (typeof FileFormats)[keyof typeof FileFormats];

export function fileFormatFromString(value: string): FileFormat {
  const modes = Object.values(FileFormats);
  if (modes.includes(value as FileFormat)) {
    return value as FileFormat;
  }
  throw new Error(
    `El formato del archivo es inválido: ${value}. Valores permitidos: ${modes.join(',')}`,
  );
}
