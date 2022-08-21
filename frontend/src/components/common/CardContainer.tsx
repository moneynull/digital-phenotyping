import styled from 'styled-components';
import COLORS from '../../constant/Colors';

export default function CardContainer(props: any) {
  return <Container>{props.children}</Container>;
}
const Container = styled.div`
  background-color: ${COLORS.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 15px 1px ${COLORS.shadow};
  width: 700px;
  padding: 30px;
  margin: 20px;
`;
