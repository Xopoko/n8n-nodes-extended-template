import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Example implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Example',
    name: 'example',
    icon: 'file:example.svg',
    group: ['transform'],
    version: 1,
    description: 'Simple example node',
    defaults: {
      name: 'Example',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: 'World',
        description: 'Name to include in the greeting',
      },
      {
        displayName: 'Reverse',
        name: 'reverse',
        type: 'boolean',
        default: false,
        description: 'Whether to reverse the greeting text',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const name = this.getNodeParameter('name', i) as string;
      const reverse = this.getNodeParameter('reverse', i) as boolean;
      let greeting = `Hello ${name}!`;
      if (reverse) {
        greeting = greeting.split('').reverse().join('');
      }
      returnData.push({ json: { greeting } });
    }

    return [returnData];
  }
}
