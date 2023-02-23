import { BaseValidationOptions, ObjectSchema, ValidationResult } from "joi";

export abstract class ValidationDto {
  protected abstract schema: ObjectSchema;
  public validationOptions: BaseValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    convert: true,
  };

  constructor(object: any) {
    Object.assign(this, object);
  }

  public validate(): ValidationResult {
    return this.schema.validate(this, this.validationOptions);
  }

  public async validateAsync(): Promise<ValidationResult> {
    return await this.schema.validateAsync(this, this.validationOptions);
  }
}
