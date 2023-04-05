import { useState, useEffect } from 'react';
import { Grid } from "@mantine/core";
import CommonModal from '../../common/CommonModal/CommonModal'
import CommonCard from '../../common/CommonCard/CommonCard'
import type { Launch } from '../../../types/types';
import { fetchLaunches, fetchCores } from './fetchers';
import { mergeData } from '../../../utils/mergeData';

const HomeListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentLaunch, setCurrentLaunch] = useState<Launch | null>(null);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isServerError, setIsServerError] = useState<boolean>(false);

  const handleModalOpen = (launch: Launch) => {
    setIsModalOpen(true);
    setCurrentLaunch(launch);
  }

  useEffect(() => {
    const getLaunches = async () => {
      try {
        const launchesData = await fetchLaunches();

        const coresPromises = [];
        for (let i = 0; i < launchesData.length; i++) {
          coresPromises.push(fetchCores(launchesData[i].cores[0].core));
        }

        const coresData = await Promise.all(coresPromises);

        const mergedLaunches = mergeData(launchesData, coresData);
        setLaunches(mergedLaunches);
        setCurrentLaunch(mergedLaunches[0]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsServerError(true);
        console.error(err)
      }
    };

    getLaunches();
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  
  return (
    <>
      {isServerError ? (
        <div>Something went wrong</div>
      ) : (
        <div>
          <CommonModal
            currentLaunch={currentLaunch}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <Grid>
            {launches.map((launch) => (
              <Grid.Col xs={12} md={6} lg={4} key={launch.id} p={5}>
                <CommonCard launch={launch} handleModalOpen={handleModalOpen} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}

export default HomeListing;
