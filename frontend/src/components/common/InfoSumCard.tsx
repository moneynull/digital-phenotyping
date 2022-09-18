import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import COLORS from '../../constant/Colors';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function InfoSumCard(props: any) {
  const RenderContent = () => {
    switch (props.type) {
      case 'totalClients':
        return <Text>{props.content}</Text>;
      case 'AWARESensors':
        return (
          <SensorsWrapper>
            <ChipWrapper label='Applications' size='small' />
            <ChipWrapper label='Locations' size='small' />
            <ChipWrapper label='Screen' size='small' />
            <ChipWrapper label='Communication' size='small' />
          </SensorsWrapper>
        );
      case 'socialApps':
        return <Twitter sx={{ fontSize: 40 }} />;
      default:
        return <div></div>;
    }
  };
  return (
    <Container>
      <Title>{props.title}</Title>
      <RenderContent />
    </Container>
  );
}
const Container = styled.div`
  background-color: ${COLORS.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 230px;
  height: 120px;
  padding: 13px;
`;
const Title = styled.div`
  color: ${COLORS.text};
  font-size: 21px;
`;
const Text = styled.div`
  font-size: 15px;
  color: ${COLORS.text};
`;
const SensorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`;
const ChipWrapper = styled(Chip)`
  margin: 3px;
`;
const Twitter = styled(TwitterIcon)`
  color: ${COLORS.twitter_blue};
`;
