import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// Custom validator: the value must be a date/time later than "now".
// Usage: @IsInFuture() on a string property with an ISO 8601 date.
export function IsInFuture(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isInFuture',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          const time = Date.parse(value);
          return !Number.isNaN(time) && time > Date.now();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a date in the future`;
        },
      },
    });
  };
}
