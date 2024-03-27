import React, { useState } from 'react'
import './TimeLine.css'
import { SlCalender } from "react-icons/sl";
import { VerticalTimeline,VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import ReactDatePicker from 'react-datepicker'

const TimeLine = () => {

    const [selectedDateFirst, setSelectedDateFirst] = useState(null);
    const [selectedDateSecond, setSelectedDateSecond] = useState(null);
    const [selectedDateTherd, setSelectedDateTherd] = useState(null);

  return (

    <div>
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                // date="&nbsp;&nbsp;2024"
                iconStyle={{ background: '#F08080', color: '',scale: '0.9'}}
                icon={<SlCalender />}
            >
                <h3 className="vertical-timeline-element-title col text-center">January</h3>
                {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                <div className='col-md text-center d-flex align-items-center justify-content-center'>
                    <ReactDatePicker
                        selected={selectedDateFirst}
                        onChange={date => setSelectedDateFirst(date)}
                        className='col-md-6 form-control'
                        placeholderText='Select date'
                        dateFormat='dd/MM/yyyy; h:mm aa'
                        showTimeSelect
                        timeIntervals={15}
                        timeFormat='HH:mm'
                    />
                </div>

                <p className='col text-center'>Rs : 2500 &nbsp; kWh : 300</p>
                {/* <p className='col text-center'>kWh : 300</p> */}
            </VerticalTimelineElement>

            <VerticalTimelineElement
                className="vertical-timeline-element--work col text-center"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                // date="2024&nbsp;&nbsp;"
                iconStyle={{ background: '#F08080', color: '', scale: '0.9' }}
                icon={<SlCalender />}
            >
                <h3 className="vertical-timeline-element-title">February</h3>
                {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                <div className='col-md text-center d-flex align-items-center justify-content-center'>
                <ReactDatePicker
                    selected={selectedDateSecond}
                    onChange={date => setSelectedDateSecond(date)}
                    className='form-control'
                    placeholderText='Select date'
                    dateFormat='dd/MM/yyyy; h:mm aa'
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat='HH:mm'
                />
                </div>
                <p className='col text-center'>Rs : 2600 &nbsp; kWh : 350</p>
                {/* <p className='col text-center'>kWh : 350</p> */}
            </VerticalTimelineElement>

            <VerticalTimelineElement
                className="vertical-timeline-element--work col text-center"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: 'black' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                // date="&nbsp;&nbsp;2024"
                iconStyle={{ background: '#F08080', color: '', scale: '0.9' }}
                icon={<SlCalender />}
            >
                <h3 className="vertical-timeline-element-title">March</h3>
                {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                <div className='col-md text-center d-flex align-items-center justify-content-center'>
                <ReactDatePicker
                    selected={selectedDateTherd}
                    onChange={date => setSelectedDateTherd(date)}
                    className='form-control'
                    placeholderText='Select date'
                    dateFormat='dd/MM/yyyy; h:mm aa'
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat='HH:mm'
                />
                </div>
                <p className='col text-center'>Rs : 1500 &nbsp; kWh : 230</p>
                {/* <p className='col text-center'>kWh : 230</p> */}
            </VerticalTimelineElement>
        </VerticalTimeline>
    </div>
  )
}

export default TimeLine