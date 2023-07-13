import { Attribute, Device } from '@/types/types';

export interface Dropper extends Device {
  properties: {
    pumpDose: number | null;
    nozzle: number | null;
    productLevel: number | null;
    numberOfTests: number | null;
  };
}

export interface Paperscent extends Device {
  properties: {
    pumpDose: number | null;
    nozzle: number | null;
    productLevel: number | null;
    numberOfTests: number | null;
    paperLevel: number | null;
  };
}

function getValueFromAttributes(attributes: Attribute[], key: string): string | undefined {
  return attributes.find((a) => a.attributes?.name === key)?.attributes?.value;
}
function getNumberFromValue(value: string | undefined): number | null {
  if (!value) return null;
  return parseInt(value);
}

export function parseToDropper(device: Device): Dropper {
  console.log('device', device);
  const pumpDose = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'PUMP_DOSE'));
  const nozzle = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'NOZZLE'));
  const productLevel = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'PRODUCT_LEVEL'));
  const numberOfTests = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'NUMBER_OF_TESTS'));
  return {
    ...device,
    properties: {
      pumpDose,
      nozzle,
      productLevel,
      numberOfTests,
    },
  } as Dropper;
}

export function parseToPaperscent(device: Device): Paperscent {
  const pumpDose = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'PUMP_DOSE'));
  const nozzle = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'NOZZLE'));
  const productLevel = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'PRODUCT_LEVEL'));
  const numberOfTests = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'NUMBER_OF_TESTS'));
  const paperLevel = getNumberFromValue(getValueFromAttributes(device.attributes.properties.data, 'PAPER_LEVEL'));
  return {
    ...device,
    properties: {
      pumpDose,
      nozzle,
      productLevel,
      numberOfTests,
      paperLevel,
    },
  } as Paperscent;
}
