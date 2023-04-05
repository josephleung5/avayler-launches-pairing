import type { Launch } from "../types/types";

export const mergeData = (launches: any, cores: any): Launch[] => {
  let result = []

  for (let i = 0; i < launches.length; i++) {
    result.push({
      id: launches[i].id,
      name: launches[i].name,
      dateUTC: launches[i].date_utc,
      imageUrl: launches[i].links.patch.small,
      isSuccess: launches[i].success,
      failureReason: launches[i].success ? '' : launches[i].failures[0].reason,
      coreName: cores[i]?.serial,
      payloads: launches[i].payloads[0]
    })
  }

  return result;
}
