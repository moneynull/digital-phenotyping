import Chip from '@mui/material/Chip';
import TwitterIcon from '@mui/icons-material/Twitter';
export default function InfoSumCard(props: InfoSumCardProps) {
  const RenderContent = () => {
    switch (props.type) {
      case 'totalClients':
        return <div className='info-card-text'>{props.content}</div>;
      case 'AWARESensors':
        return (
          <div className='sensors-wrapper'>
            <Chip className='chip-wrapper' label='Applications' size='small' />
            <Chip className='chip-wrapper' label='Locations' size='small' />
            <Chip className='chip-wrapper' label='Screen' size='small' />
            <Chip className='chip-wrapper' label='Communication' size='small' />
          </div>
        );
      case 'socialApps':
        return <TwitterIcon className='twitter-icon ' sx={{ fontSize: 40 }} />;
      default:
        return <div></div>;
    }
  };
  return (
    <div className='info-card-container'>
      <div className='info-card-title'>{props.title}</div>
      <RenderContent />
    </div>
  );
}
