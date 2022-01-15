import axios from "axios";
const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

// Calls external Nasa APOD API - Fetch Astronomy Picutres of the Day
class NasaAPODService {

  // date 	      YYYY-MM-DD 	today 	The date of the APOD image to retrieve
  // start_date 	YYYY-MM-DD 	none 	  The start of a date range, when requesting date for a range of dates. 
  //                                  ---> Cannot be used with date.
  // end_date 	  YYYY-MM-DD 	today 	The end of the date range, when used with start_date.
  // count 	      int 	      none 	  If this is specified then count randomly chosen images will be returned. 
  //                                  ---> Cannot be used with date or start_date and end_date.
  // thumbs 	    bool 	      False 	Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.
  async fetchAPOD(start_date, end_date) {
    const params = new URLSearchParams();
    params.append('start_date', start_date);
    params.append('end_date', end_date);
    console.log(start_date)
    console.log(end_date)
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, { params }).then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(e => {
      console.log(e)
    });
  }
}

export default new NasaAPODService();