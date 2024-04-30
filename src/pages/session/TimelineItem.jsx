import React, { useState } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { SlCalender } from "react-icons/sl";
import DatePicker from 'react-datepicker';

const TimelineItem = ({ session, onDateChangeStart, onDateChangeEnd, onKwhChange, onAmountDueChange, saveHandler, errorMessage }) => {
    
    const [selectedRadio, setSelectedRadio] = useState(session.isTotalConsumption_KwhSelected ? 'kwh' : 'amountDue');

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243,0.8)', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            iconStyle={{ background: '#F08080', color: '', scale: '0.9' }}
            icon={<SlCalender />}
        >
            <h6 className="vertical-timeline-element-title col text-center">{session.sessionName}</h6><br />
            <div className='col-md p-1 text-center d-flex align-items-center justify-content-center'>
                <DatePicker
                    selected={session.startDate}
                    onChange={onDateChangeStart}
                    className='col-md-6 form-control'
                    placeholderText='Select date'
                    dateFormat='dd/MM/yyyy; h:mm aa'
                    showTimeSelect
                    timeIntervals={5}
                    timeFormat='HH:mm'
                />
            </div>
            <div className='col-md p-1 text-center d-flex align-items-center justify-content-center'>
                <DatePicker
                    selected={session.endDate}
                    onChange={onDateChangeEnd}
                    className='col-md-6 form-control'
                    placeholderText='Select date'
                    dateFormat='dd/MM/yyyy; h:mm aa'
                    showTimeSelect
                    timeIntervals={5}
                    timeFormat='HH:mm'
                />
            </div>
            <div className="form-row text-center d-flex align-items-center justify-content-center">
                <div className="form-group col-md-5.6 ">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="kwh"
                        checked={selectedRadio === 'kwh'}
                        onChange={handleRadioChange}
                    />
                    &nbsp;
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        kW
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="kw"
                        placeholder="kW Value"
                        value={session.totalConsumption_Kwh || ''}
                        onChange={onKwhChange}
                        disabled={selectedRadio !== 'kwh'}
                    />
                </div>
                <div className="form-group col-md-5.6">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="amountDue"
                        checked={selectedRadio === 'amountDue'}
                        onChange={handleRadioChange}
                    />
                    &nbsp;
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Rs
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="rs"
                        placeholder="Rs Value"
                        value={session.totalAmountDue || ''}
                        onChange={onAmountDueChange}
                        disabled={selectedRadio !== 'amountDue'}
                    />
                </div>
            </div>
            <button type='button' className='btn btn-primary w-100 mt-2' onClick={(e) => saveHandler(e, session)}>Save</button>
            {errorMessage && <p>{errorMessage}</p>}
        </VerticalTimelineElement>
    );
};

export default TimelineItem;
