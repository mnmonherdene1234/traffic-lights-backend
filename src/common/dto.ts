import Joi, {
  BaseValidationOptions,
  ObjectSchema,
  ValidationResult,
} from "joi";

export class getAllDto {
  filter: any = {};
  page: number = 1;
  pageSize: number = 20;
  total: number = 0;
  populate: string = "";
  sort: string = "";
  select: string = "";
}

export class getAllResultDto<T> {
  data: T[] = [];
  meta: getAllDto = new getAllDto();
}

export class getOneDto {
  id: string = "";
  populate: string = "";
  select: string = "";
}

export abstract class ValidationDto {
  protected abstract schema: ObjectSchema;
  public validationOptions: BaseValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
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

export class LoginDto extends ValidationDto {
  protected schema: ObjectSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  username?: string;
  password?: string;
}
