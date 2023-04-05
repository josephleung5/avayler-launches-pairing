import { render, screen } from "@testing-library/react";
import type { Launch } from "../../../types/types";
import CommonModal from "./CommonModal";

const currentFailedLaunch: Launch = {
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
}

const currentSuccessLaunch: Launch = {
  id: '5eb87cd9ffd86e000604b32a',
  name: 'FalconSat',
  dateUTC: '2006-03-24T22:30:00.000Z',
  coreName: 'Merlin1A',
  payloads: {
    id: '5eb0e4b5b6c3bb0006eeb1e1',
    type: 'Satellite',
  },
  imageUrl: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
  isSuccess: true,
  failureReason: 'merlin engine failure'
}

describe('CommonCard', () => {
  it('renders success', () => {
    render(<CommonModal currentLaunch={currentSuccessLaunch} isModalOpen={true} onClose={() => console.log('close')} />)

    const successText = screen.getByText('SUCCESS');

    expect(successText).toBeTruthy();
  })

  it('renders fail with reason', () => {
    render(<CommonModal currentLaunch={currentFailedLaunch} isModalOpen={true} onClose={() => console.log('close')} />)

    const failText = screen.getByText('FAIL');

    expect(failText).toBeTruthy();
  })
})
