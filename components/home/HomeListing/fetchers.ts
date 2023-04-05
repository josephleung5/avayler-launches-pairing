const fetchLaunchesBody = {
  query: {},
  options: {
    populate: [
      {
        path: 'payloads',
        select: {
          type: 1
        }
      }
    ]
  }
}

const fetchLaunchesQuery = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(fetchLaunchesBody)
}

const FETCH_LAUNCHES_URL = 'https://api.spacexdata.com/v5/launches/query';
const FETCH_CORES_URL = 'https://api.spacexdata.com/v4/cores';

export const fetchLaunches = () => {
  return fetch(FETCH_LAUNCHES_URL, fetchLaunchesQuery)
  .then((resp) => resp.json())
  .then((result) => result.docs)
  .catch((err) => console.log(err));
}

export const fetchCores = (coreId: any) => {
  return fetch(`${FETCH_CORES_URL}/${coreId}`)
  .then((resp) => resp.json())
  .then((result) => result)
  .catch((err) => console.log(err));
}
