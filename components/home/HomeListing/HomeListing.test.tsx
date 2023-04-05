import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import HomeListing from "./HomeListing";
import { LAUNCHES, CORES } from "../../../test/seed/mockData";

global.fetch = jest.fn((req, res) => {
  if (req === 'https://api.spacexdata.com/v5/launches/query') {
    return Promise.resolve({
      json: () => Promise.resolve({ docs: LAUNCHES}),
    });
  } else if (req === 'https://api.spacexdata.com/v4/cores/5e9e289df35918033d3b2623') {
    return Promise.resolve({
      json: () => Promise.resolve(CORES[0]),
    });
  } else {
    return Promise.resolve({
      json: () => Promise.resolve(CORES[1]),
    });
  }
});

describe('Home Component', () => {
  it('renders loading state initially', async () => {
    render(<HomeListing />)

    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  })

  it('renders 2 cards when data is fetched', async () => {
    render(<HomeListing />)
    const name_1 = await screen.findByText(LAUNCHES[0].name);
    const name_2 = await screen.findByText(LAUNCHES[1].name);
    expect(name_1).toBeInTheDocument();
    expect(name_2).toBeInTheDocument();
  })

  it('expect modal to be opened when a card is clicked', async () => {
    render(<HomeListing />)
    
    const name_1 = await screen.findByText(LAUNCHES[0].name);
    let modal = screen.getByTestId(LAUNCHES[0].id)
    expect(modal).not.toBeInTheDocument;
    fireEvent.click(name_1);
    
    modal = screen.getByTestId(LAUNCHES[0].id)
    expect(modal).toBeInTheDocument;
  })
})
