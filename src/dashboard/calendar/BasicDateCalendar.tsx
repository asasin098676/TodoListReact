import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar sx={{ backgroundColor: '#fceff9', borderRadius: 4, padding: 0, margin: 2, color: 'black', width: '100%' }}  />
    </LocalizationProvider>
  );
}   