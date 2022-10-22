type ComponentProps = {
  children: JSX.Element | JSX.Element[];
};
type DateRangeSelectorProps = {
  setStartDate: (date: number) => void;
  setEndDate: (data: number) => void;
};
type InfoSumCardProps = {
  type: string;
  title: string;
  content?: string;
};
type NavTitleProps = {
  showArrowBack: boolean;
  title: string;
};
type SectionTitleProps = {
  title: string;
};
type ChartProps = {
  uid: number;
};
type SeriesProps = {
  name: string;
  data: number;
};
type CategoryResDataProps = {
  category: string[];
  count: number[];
};
interface iUserInfo {
  age: number;
  aware_device_id: string;
  client_title: string;
  date_of_birth: Date;
  facebook_id: string;
  first_name: string;
  last_name: string;
  last_update: string;
  status: string;
  text_notes: string;
  twitter_id: string;
  uid: number;
}
type UpdateInfoProps = {
  clientInfo: iUserInfo;
};
