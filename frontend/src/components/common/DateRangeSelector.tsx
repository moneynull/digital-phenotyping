import styled from 'styled-components';
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import 'rsuite/dist/rsuite.css';

const predefinedRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left',
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left',
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: 'left',
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
    placement: 'left',
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
    placement: 'left',
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
    placement: 'left',
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement: 'left',
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left',
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement: 'left',
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left',
  },
  {
    label: 'Last week',
    closeOverlay: false,
    value: (value: never[]) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7),
      ];
    },
    appearance: 'default',
  },
  {
    label: 'Next week',
    closeOverlay: false,
    value: (value: never[]) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7),
      ];
    },
    appearance: 'default',
  },
];

export default function DateRangeSelector(props: any) {
  const confirmDate = (val: any[]) => {
    if (val === null) {
      props.setStartDate(1641634738549);
      props.setEndDate(1641901876549);
    } else {
      let startDate = new Date(val[0]).getTime();
      let endDate = new Date(val[1]).getTime();
      console.log(startDate);
      console.log(endDate);
      props.setStartDate(startDate);
      props.setEndDate(endDate);
    }
  };
  return (
    <div className='data-wrapper'>
      <div className='datepicker-title'>Date Range</div>
      <DateRangePicker
        //@ts-ignore
        ranges={predefinedRanges}
        showOneCalendar
        //@ts-ignore
        onChange={confirmDate}
        placeholder='Select date'
        style={{ width: 300 }}
      />
    </div>
  );
}
