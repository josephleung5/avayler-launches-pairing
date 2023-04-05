import { mergeData } from "./mergeData";
import type { Launch } from "../types/types";
import { LAUNCHES, CORES } from "../test/seed/mockData";

const mergedData: Launch[] = [
  {
    id: '5eb87cd9ffd86e000604b32a',
    name: 'FalconSat',
    dateUTC: '2006-03-24T22:30:00.000Z',
    coreName: 'Merlin1A',
    payloads: {
      id: '5eb0e4b5b6c3bb0006eeb1e1',
      type: 'Satellite',
    },
    imageUrl: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
    isSuccess: false,
    failureReason: 'merlin engine failure'
  },
  {
    id: '5eb87cdaffd86e000604b32b',
    name: 'DemoSat',
    dateUTC: '2007-03-21T01:10:00.000Z',
    coreName: 'Merlin2A',
    payloads: {
      id: '5eb0e4b6b6c3bb0006eeb1e2',
      type: 'Satellite',
    },
    imageUrl: 'https://images2.imgbox.com/f9/4a/ZboXReNb_o.png',
    isSuccess: true,
    failureReason: ''
  },
];

describe('mergeData', () => {
  it('should return the merged result for frontend', () => {
    const result = mergeData(LAUNCHES, CORES);
    expect(result).toStrictEqual(mergedData);
  })
})
