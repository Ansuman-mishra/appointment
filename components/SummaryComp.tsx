"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format, isSameDay, isSameMonth, parseISO } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
const SummaryComp = () => {
    const url = "http://localhost:5000/api/appointments";
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        loadData();
        filterAppointments(filter);
    }, [filter]);

    const loadData = async () => {
        try {
            const response = await axios.get(`${url}/Get`);
            setFilteredAppointments(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };
    console.log("dataSource :>> ", filteredAppointments);
    const filterAppointments = (filter: any) => {
        const now = new Date();
        let filtered;

        switch (filter) {
            case "day":
                filtered = filteredAppointments.filter((appointment: any) => isSameDay(parseISO(appointment?.startDate), now));
                break;
            case "month":
                filtered = filteredAppointments.filter((appointment: any) => isSameMonth(parseISO(appointment?.startDate), now));
                break;
            case "all":
            default:
                filtered = filteredAppointments;
        }

        setFilteredAppointments(filtered);
    };
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Appointment Summary</h1>
            <div className="mb-4">
                <Select>
                    <SelectTrigger className="w-[180px]" value={filter} onChange={(e: any) => setFilter(e.target.value)}>
                        <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="day">Today</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ul className="space-y-4">
                {filteredAppointments.map((appointment: any, index) => (
                    <li key={index} className="p-4 border rounded shadow">
                        <h2 className="text-lg font-semibold">{appointment.Text}</h2>
                        <p className="text-sm text-gray-600">
                            {format(parseISO(appointment?.StartDate), "PPPpp")} - {format(parseISO(appointment?.EndDate), "PPPpp")}
                        </p>
                        <p>{appointment?.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SummaryComp;
