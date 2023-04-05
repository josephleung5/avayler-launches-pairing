import type { Launch } from "../../../types/types"
import {
  Card,
  Image,
  Text,
  Title,
} from "@mantine/core";

type CommonCardProps = {
  launch: Launch;
  handleModalOpen: (launch: Launch) => void;
}

const CommonCard = ({
  launch,
  handleModalOpen,
}: CommonCardProps) => {
  return (
    <Card 
      onClick={() => handleModalOpen(launch)}
      sx={{ cursor: 'pointer' }}
    >
      <Card.Section>
        <Image fit='contain' height={350} src={launch.imageUrl} alt={launch.name} />
      </Card.Section>
      <Title order={3}>{launch.name}</Title>
      <Text>{launch.dateUTC}</Text>
      <Text>{launch.coreName}</Text>
      <Text color={launch.isSuccess ? 'green' : 'red'}>
        {launch.isSuccess ? 'SUCCESS' : 'FAIL'}
      </Text>
    </Card>
  )
}

export default CommonCard;
