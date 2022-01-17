import './App.css';
import React, { useState, useEffect } from 'react';
import NasaAPODService from './services/NasaAPODService';
import CardComponent from './components/card';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from './assets/nasa-logo.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main:'#e31b23'
    }
  },
});

function App() {
  const [currentItems, setCurrentItems]     = useState([]); // apods
  const [allItems, setAllItems] = useState([]); 
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate]   = useState(null);
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    nextData();
  }, [allItems]);

  async function fetchData(startDate, endDate) {
    if(startDate && endDate) {
      let result = await NasaAPODService.fetchAPOD(startDate, endDate);
      setAllItems(result);
    }
 
  }

  const nextData = () => {
    const nextPage = currentPage + 4 
    const nextItems = allItems.slice(currentPage, nextPage);
    setCurrentPage(nextPage);
    setCurrentItems(currentItems.concat(nextItems)); 
  }

  const handleStartDate = (newValue) => {
    setStartDate(newValue.toISOString().slice(0, 10));
    setCurrentItems([])
    setCurrentPage(0)
    fetchData(newValue.toISOString().slice(0, 10), endDate);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue.toISOString().slice(0, 10));
    setCurrentItems([])
    setCurrentPage(0)
    fetchData(startDate, newValue.toISOString().slice(0, 10));
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
    <AppBar position="relative" className='Header'>
      <Toolbar variant="dense">
   
        {/* <div>
          <img src={logo} alt="Logo" className='Logo'/>
        </div> */}
        <div>
          { "Spacestagram" }
        </div>
    
      </Toolbar>
      
    </AppBar>
      {/* <div>
        {"Brougth to you by NASA's Astronomy Photo of the Day (APOD) API"}
      </div> */}
      <div className='Body'>
        <div className='Date'>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} className="Date">
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM-dd-yyyy"
                value={startDate}
                onChange={handleStartDate}
                minDate={new Date('1995-06-16')}
                maxDate={endDate != null ? new Date(endDate) : new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} className="Date">
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDate}
                minDate={startDate != null ? new Date(startDate) : new Date('1995-06-16')}
                maxDate={(new Date()).setDate((new Date()).getDate() - 1)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <InfiniteScroll
          dataLength={currentItems.length} //This is important field to render the next data
          next={() => { nextData() }}
          hasMore={ currentItems.length === allItems.length? currentItems.length === 0? false : false : true}
          loader={
                  <div>
                    <CircularProgress color='primary'/>
                    <Typography> Asking aliens for pictures 👽  </Typography>
                    <Typography> This might take awhile, they are very far... </Typography>
                  </div>
                }
          endMessage={
            <div style={{textAlign: 'center'}}>
                    <Typography> Please select a start and end date for pictures of the day!</Typography>
                    <Typography> Brought to you by NASA's Astronomy Photo of the Day (APOD) API </Typography>
                    <img src={logo} alt="Nasa" className='Logo'></img>
                  </div>   
          }
        >
          { currentItems.map((object, i) => 
            <div className='Card' key={i}>
              <CardComponent 
                title={object.title} 
                date={object.date} 
                desc={object.explanation} 
                image={object.url}
                name={object.copyright}
                key={i}/> 
            </div>) }
        </InfiniteScroll>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
