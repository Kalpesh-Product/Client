import React from 'react'
import {
  eSignHR,
  templatesHR,
  appraisalsHR,
  performanceHR,
  taskManagementHR,
  policiesHR,
  sopsHR,
  holidaysHR,
  leavesHR,
  payslipsHR,
  payrollHR,
  attendanceHR,
} from "../assets/WONO_images/img/icon_service_color";
import TestSide from '../components/Sidetest';

const Services = () => {

  const services_hrSupport = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: attendanceHR,
      alt: "TransactionalWebsite",
      title: "Attendance",
      description: "Track employee attendance",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: payrollHR,
      alt: "BookingEngine",
      title: "Payroll",
      description: "Manage payrolls efficiently",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: payslipsHR,
      alt: "MeetingRoomEngine",
      title: "Payslips",
      description: "Generate and distribute payslips",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: leavesHR,
      alt: "PaymentGateway",
      title: "Leaves",
      description: "Leave management system",
    },
    {
      id: 5,
      // image: Blog,
      image: holidaysHR,
      alt: "Blog",
      title: "Holidays",
      description: "Track company holidays",
    },
    {
      id: 6,
      // image: Hiring,
      image: sopsHR,
      alt: "Hiring",
      title: "SOPs",
      description: "Standard operating procedures",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: policiesHR,
      alt: "GoogleMyBusiness",
      title: "Policies",
      description: "HR policies and documentation",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: taskManagementHR,
      alt: "SearchEngineOptimisation",
      title: "Task Management",
      description: "Manage HR tasks and projects",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: performanceHR,
      alt: "SearchEngineMarketing",
      title: "Performance",
      description: "Employee performance tracking",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: appraisalsHR,
      alt: "DataMarketing",
      title: "Appraisals",
      description: "Manage employee appraisals",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: templatesHR,
      alt: "EmailMarketing",
      title: "Templates",
      description: "HR templates and forms",
    },
    {
      id: 12,
      // image: EmailMarketing,
      image: eSignHR,
      alt: "EmailMarketing",
      title: "e-Sign",
      description: "Electronic signature integration",
    },
  ];
  return (
    <div className='flex'>
      <TestSide />
      <div className='p-6'>
      <h1>Hello</h1>
      </div>
    </div>
  )
}

export default Services
