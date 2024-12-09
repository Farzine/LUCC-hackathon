import DashboardAnalytics from '../../../components/ui/DashboardAnalytics'
import ColumnChart from '../../../components/ui/ColumnChart'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function AcceptGuest() {

    const [BookingReq, setBookingReq] = useState([])
    useEffect(() => {
        let userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:5000/api/request/host/${userId}/bookings`)
            .then(response => {
                console.log('slot '+response.data.bookings);
            })
            .catch(error => {
                console.error('There was an error fetching the bookings!', error);
            });
    }, []);

  return (
    <div className=" p-10 min-h-screen">
      <h1 className="text-3xl font-semibold my-4 ">Accept Guest</h1>
      <h1 className="  my-4 ">Accepts Guest request to your Meeting</h1>
     
      
    </div>
  )
}
