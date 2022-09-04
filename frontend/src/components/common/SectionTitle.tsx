import styled from 'styled-components';

export default function SectionTitle(props: any) {
  return <Title>{props.title}</Title>;
}
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 300px;
  margin: 15px;
  font-family: 'Open Sans', sans-serif;
`;
