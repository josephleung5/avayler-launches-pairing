import { 
  render,
  screen,
  fireEvent 
} from "@testing-library/react";
import '@testing-library/jest-dom'
import HomeListing from "./HomeListing";
import { 
  LAUNCHES,
  CORES
} from "../../../test/seed/mockData";

const mockFetchSuccess = () => {
  global.fetch = jest.fn((req) => {
    if (req === 'https://api.spacexdata.com/v5/launches/query') {
      return Promise.resolve({
        json: () => Promise.resolve({ docs: LAUNCHES }),
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
}

const mockFetchFailed = () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Server error')));
}

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders loading state initially', async () => {
    mockFetchSuccess();

    render(<HomeListing />);

    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  })

  it('renders 2 cards when data is fetched', async () => {
    mockFetchSuccess();

    render(<HomeListing />);

    const name_1 = await screen.findByText(LAUNCHES[0].name);
    const name_2 = await screen.findByText(LAUNCHES[1].name);
    const core_1 = await screen.findByText(CORES[0].serial);
    const core_2 = await screen.findByText(CORES[1].serial);

    expect(name_1).toBeInTheDocument();
    expect(name_2).toBeInTheDocument();
    expect(core_1).toBeInTheDocument();
    expect(core_2).toBeInTheDocument();
  })

  it('expect modal to be opened when a card is clicked', async () => {
    render(<HomeListing />);
    
    const name_1 = await screen.findByText(LAUNCHES[0].name);
    let modal = screen.getByTestId(LAUNCHES[0].id);
    expect(modal).not.toBeInTheDocument;
    
    fireEvent.click(name_1);
    
    modal = screen.getByTestId(LAUNCHES[0].id);
    expect(modal).toBeInTheDocument;
  })

  it('expect to handle server errors', async () => {
    mockFetchFailed();

    render(<HomeListing />);
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
    const severError = await screen.findByText('Something went wrong');
    expect(severError).toBeInTheDocument();
  })
})
