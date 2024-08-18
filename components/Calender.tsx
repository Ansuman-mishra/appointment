"use client";
import { Scheduler } from "devextreme-react";
import { SchedulerTypes } from "devextreme-react/cjs/scheduler";
import React, { useEffect, useState } from "react";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import axios from "axios";
export const Calender = () => {
    const url = "http://localhost:5000/api/appointments";
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(`${url}/Get`);
            setDataSource(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const insertAppointment = async (appointment: any) => {
        try {
            const response = await axios.post(`${url}/create`, appointment);
            loadData();
        } catch (error) {
            console.error("Error inserting appointment:", error);
        }
    };

    const updateAppointment = async (key: string, appointment: any) => {
        try {
            const response = await axios.put(`${url}/Put/${key}`, appointment);
            loadData();
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };

    const deleteAppointment = async (key: string) => {
        try {
            const response = await axios.delete(`${url}/Delete/${key}`, {
                data: { key },
            });
            loadData();
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const currentDate = new Date();
    const views: SchedulerTypes.ViewType[] = ["day", "workWeek", "month"];

    return (
        <Scheduler
            timeZone="Asia/Kolkata"
            dataSource={dataSource}
            views={views}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            height={600}
            width={"100%"}
            startDayHour={9}
            endDayHour={19}
            remoteFiltering={true}
            dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
            textExpr="Text"
            startDateExpr="StartDate"
            endDateExpr="EndDate"
            allDayExpr="AllDay"
            onAppointmentAdding={(e) => insertAppointment(e.appointmentData)}
            onAppointmentUpdating={(e) => updateAppointment(e.oldData.AppointmentId, e.newData)}
            onAppointmentDeleting={(e) => deleteAppointment(e.appointmentData.AppointmentId)}
            recurrenceEditMode="occurrence"
            recurrenceRuleExpr=""
        />
    );
};
