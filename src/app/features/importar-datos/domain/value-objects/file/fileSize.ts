export class FileSize
{
    private constructor(private _value: string) {}

    public static create(value: string): FileSize {
        if(value.trim() === '')
            throw new Error("El nombre del archivo no debe estar vacío");

        return new FileSize(value);
    }

    value(): string {
        return this._value;
    }
}