import React, { useState } from 'react'
import Modal from "../components/Modal"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import ClientSidebar from "../components/ClientSidebar";
import "../styles/CalenderModal.css"


const Calender = () => {
    const [selectedDate,setSelectedDate] = useState(null);
    const [showModal,setShowModal] = useState(false);

    const [events,setEvents] = useState([
      { title: 'New Year 2024', date: '2024-01-01' },
    { title: 'Republic Day', date: '2024-01-26' },
    { title: 'Good Friday', date: '2024-03-29' },
    { title: 'Gudi Padva',date:'2024-04-09'},
    { title: 'Eid Al-Fitr (Ramadan)', date: '2024-01-26' },
    { title: 'Labor Day', date: '2024-05-01' },
    { title: 'Eid Al-Adha (Bakri Eid)', date: '2024-06-17' },
    { title: 'Independance Day', date: '2024-08-15' },
    { title: 'Ganesh Chaturthi', date: '2024-09-07' },
    { title: 'Gandhi Jayanti', date: '2024-10-02' },
    { title: 'Diwali', date: '2024-10-31' },
    { title: 'Feast Of Saint Fransis Xavior', date: '2024-12-03' },
    { title: 'Goa Liberation Day', date: '2024-12-03'},
    { title: 'Christmas', date: '2024-12-25' }

    ])
    
    const [newEvent,setnewEvent] = useState({name:"",startTime:"",Duration:""});

    const get30DayRange = (date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const end = new Date(date.getFullYear(), date.getMonth(), Math.min(30, daysInMonth));
        return { start, end };
      };

      const handleDateClick = (args)=>{
        setSelectedDate(args.dateStr);
        setShowModal(true);
        console.log("Date is selected");


      }

      const handleSaveEvent = () => {
        if (newEvent.name && newEvent.time)
        {
          setEvents([
            ...events,
            {
              title :newEvent.name,
              date : selectedDate
            }
          ])
        }
        setShowModal(false);
      }
  return (
    <>
    <div class="flex min-h-screen">
    <ClientSidebar/>
    <div class="flex-1 p-6 bg-gray-100">
    <FullCalendar
    plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin]}
    initialView='dayGridMonth'
    weekends={true}
    events={events}
  visibleRange={(currentDate) => {
    return get30DayRange(currentDate); // Restrict to 30 days
  }}
    headerToolbar = {{
        start:"today prev, next",
        center:"title",
        end:"dayGridMonth,timeGridWeek,timeGridDay",

    }}
    height={"90vh"}
    dateClick={handleDateClick}
    />
    </div>
    </div>
    {showModal && (<div className="modal">
          <div className="modal-content">
            <h3 className='modal-heading'>Add Event</h3>
            <div className='Fields-container'>
                
            <label style={{ display: "block", marginRight: "8px" }}>

              Event Name:
              </label>
              <input
                type="text"
                
                value={newEvent.name}
                onChange={(e) =>
                  setnewEvent({ ...newEvent, name: e.target.value })
                }
              />
              <label>

Start Time (hours):
</label>
<input
  type="Time"
  min="1"
  value={newEvent}
  onChange={(e) =>
    setnewEvent({ ...newEvent, time: e.target.value })
  }
/>
              
            <label>

              Time Duration (hours):
              </label>
              <input
                type="number"
                min="1"
                value={newEvent.time}
                onChange={(e) =>
                  setnewEvent({ ...newEvent, time: e.target.value })
                }
              />
            
            </div>
            <div className='btns'>
            <button className='btn save' onClick={handleSaveEvent} >Save</button>
            <button  className='btn close' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>)}
    </>
  )
}

export default Calender