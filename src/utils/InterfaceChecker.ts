export class InterfaceChecker<T extends object> {
  private interfaceProperties: string[];

  constructor (private interfaceObj: T) {
    this.interfaceProperties = Object.keys(interfaceObj);
  }

  public check (obj: T): boolean {
    const objectProperties = Object.keys(obj);
    const unknownProperties = objectProperties.filter((prop) => !this.interfaceProperties.includes(prop));
    if (unknownProperties.length > 0) {
      console.log('Объект содержит лишние свойства:', unknownProperties);
      return false;
    }
    const missingProperties = this.interfaceProperties.filter((prop) => !objectProperties.includes(prop));
    if (missingProperties.length > 0) {
      console.log('Объект не содержит обязательные свойства:', missingProperties);
      return false;
    }
    return true;
  }
}
