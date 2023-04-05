type Payloads = {
  id: string;
  type: string;
}

export type Launch = {
  id: string;
  name: string;
  dateUTC: string;
  coreName: string;
  payloads: Payloads;
  imageUrl: string;
  isSuccess: boolean;
  failureReason: string | null;
}
