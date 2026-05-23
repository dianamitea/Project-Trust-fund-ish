import { EnvironmentsEnum } from 'lib/sdkDapp/sdkDapp.types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-template-api.multiversx.com';
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgq283wn5u9f4gazvxw0xjw0hhxd8ms8sr9xtjqs72hf4';
export const environment = EnvironmentsEnum.devnet;
export const sampleAuthenticatedDomains = [API_URL];
