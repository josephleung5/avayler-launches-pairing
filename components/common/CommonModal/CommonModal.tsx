import {
  Grid,
  Image,
  Text,
  Title,
  Modal,
  Flex
} from "@mantine/core";
import type { Launch } from "../../../types/types";

type CommonModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  currentLaunch: Launch | null;
}

const CommonModal = ({
  isModalOpen,
  onClose,
  currentLaunch,
}: CommonModalProps) => {
  
  return (
    <>
      {currentLaunch ? (
        <Modal 
        size="lg"
        opened={isModalOpen}
        onClose={onClose}
        data-testid={currentLaunch.id}
      >
        <Grid gutter={2}>
          <Grid.Col md={4}>
            <Image
              fit='contain'
              height={350}
              src={currentLaunch.imageUrl}
              alt={currentLaunch.name}
            />
          </Grid.Col>
          <Grid.Col md={8} sx={{ padding: '1rem' }}>
            <Flex
              gap="md"
              justify="center"
              direction="column"
            >
              <Title>{currentLaunch.name}</Title>
              <Text>Date(UTC): {currentLaunch.dateUTC}</Text>
              <Text>Core name: {currentLaunch.coreName}</Text>
              <Text>Payload ID: {currentLaunch.payloads.id}</Text>
              <Text>Payload Type: {currentLaunch.payloads.type}</Text>
              <Text color={currentLaunch.isSuccess ? 'green' : 'red'}>
                {currentLaunch.isSuccess ? 'SUCCESS' : 'FAIL'}
              </Text>
              {!currentLaunch.isSuccess ?
                <Text>Reason: {currentLaunch.failureReason}</Text>
              : null}
            </Flex>
          </Grid.Col>
        </Grid>
      </Modal>
      ): null}
    </>
  )
}

export default CommonModal;
