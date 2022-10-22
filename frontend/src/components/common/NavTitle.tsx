import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function NavTitle(props: NavTitleProps) {
  return (
    <div className='nav-title-container'>
      {props.showArrowBack && <ArrowBackRoundedIcon fontSize='large' />}
      <div className='nav-title-text'>{props.title}</div>
    </div>
  );
}

export default NavTitle;
