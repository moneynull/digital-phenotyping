import styled from 'styled-components';
import COLORS from '../../constant/Colors';

export default function InfoSumCard(props: any) {
  return (
    <Container>
      <Title>{props.title}</Title>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${COLORS.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 230px;
  height: 100px;
  padding: 20px;
`;
const Title = styled.div`
  color: ${COLORS.text};
  font-size: 21px;
`;
