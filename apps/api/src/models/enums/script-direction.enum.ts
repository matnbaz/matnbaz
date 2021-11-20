import { registerEnumType } from '@nestjs/graphql';

export enum ScriptDirection {
  RTL = 'RTL',
  LTR = 'LTR',
}

export const registerScriptDirectionEnum = () =>
  registerEnumType(ScriptDirection, {
    name: 'ScriptDirection',
    description: 'A repository owner could any of these types.',
    valuesMap: {
      RTL: {
        description: 'right-to-left',
      },
      LTR: {
        description: 'left-to-right',
      },
    },
  });
