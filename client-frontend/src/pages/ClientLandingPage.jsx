import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import {
  androidAppSaas,
  bookingsSaas,
  chatSaas,
  customerProfile,
  customerService,
  events,
  iosApp,
  mobileSite,
  notifications,
  paymentGateway,
  tickets,
  website,
  analyticsFA,
  compliancesFA,
  taxesFA,
  followUpsFA,
  notificationsFA,
  collectionsFA,
  financialReportsFA,
  workingCapitalFA,
  budgetFA,
  projectionsFA,
  cashflowFA,
  invoicingFA,
  vlogsSM,
  blogsSM,
  referralsSM,
  livechatSM,
  whatsAppIntegrationSM,
  smsMarketingSM,
  emailMarketingSM,
  socialMediaSM,
  leadGenerationSM,
  adNetworksSM,
  personalisedSemSM,
  automatedSeoSM,
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
  analyticsCM,
  reportsCM,
  autoresponseCM,
  customerServiceCM,
  customerRatingCM,
  feedbackCM,
  announcementsCM,
  visitorCM,
  cafeOrdersCM,
  meetingRoomsCM,
  complaintLogsCM,
  ticketRaisingCM,
  customisedReportsRA,
  taxesReportsRA,
  milestoneReportsRA,
  employeeReportsRA,
  customerReportsRA,
  fullDataAnalysisRA,
  keyNotificationsRA,
  cashflowRA,
  vendorPayoutsRA,
  businessTrendsRA,
  customerTrends,
  companyDashboard,
  // } from "../../../frontend/src/assets/WONO_images/img/icon_service_color";
} from "../assets/WONO_images/img/icon_service_color";

import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NewModal } from "../components/NewModal";

const ClientLandingPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  // Arrays Icon Start

  const services_frontend = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: website,
      alt: "TransactionalWebsite",
      title: "Website",
      description: "Full stack web-apps",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: bookingsSaas,
      alt: "BookingEngine",
      title: "Bookings",
      description: "Manage bookings",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: mobileSite,
      alt: "MeetingRoomEngine",
      title: "Mobile Site",
      description: "Mobile-friendly websites",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: iosApp,
      alt: "PaymentGateway",
      title: "iOS App",
      description: "iOS application development",
    },
    {
      id: 5,
      // image: Blog,
      image: androidAppSaas,
      alt: "Blog",
      title: "Android App",
      description: "Android application development",
    },
    {
      id: 6,
      // image: Hiring,
      image: paymentGateway,
      alt: "Hiring",
      title: "Payment Gateway",
      description: "Secure payment solutions",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: customerProfile,
      alt: "GoogleMyBusiness",
      title: "Customer Profile",
      description: "Profile management",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: notifications,
      alt: "SearchEngineOptimisation",
      title: "Notifications",
      description: "Real-time alerts",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: chatSaas,
      alt: "SearchEngineMarketing",
      title: "Chat",
      description: "Live chat solutions",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: tickets,
      alt: "DataMarketing",
      title: "Tickets",
      description: "Ticket management",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: events,
      alt: "EmailMarketing",
      title: "Events",
      description: "Event scheduling",
    },
    {
      id: 12,
      // image: LeadGeneration,
      image: customerService,
      alt: "LeadGeneration",
      title: "Customer Service",
      description: "24/7 support",
    },
  ];

  const services_financeAccounting = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: invoicingFA,
      alt: "TransactionalWebsite",
      title: "Invoicing",
      description: "Manage invoices and billing",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: cashflowFA,
      alt: "BookingEngine",
      title: "Cashflow",
      description: "Track and optimize cash flow",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: projectionsFA,
      alt: "MeetingRoomEngine",
      title: "Projections",
      description: "Financial forecasting and projections",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: budgetFA,
      alt: "PaymentGateway",
      title: "Budget",
      description: "Create and manage budgets",
    },
    {
      id: 5,
      // image: Blog,
      image: workingCapitalFA,
      alt: "Blog",
      title: "Working Capital",
      description: "Manage working capital effectively",
    },
    {
      id: 6,
      // image: Hiring,
      image: financialReportsFA,
      alt: "Hiring",
      title: "Financial Reports",
      description: "Generate financial reports",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: collectionsFA,
      alt: "GoogleMyBusiness",
      title: "Collections",
      description: "Manage collections efficiently",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: notificationsFA,
      alt: "SearchEngineOptimisation",
      title: "Notifications",
      description: "Real-time financial notifications",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: followUpsFA,
      alt: "SearchEngineMarketing",
      title: "Follow ups",
      description: "Automate follow-ups on payments",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: taxesFA,
      alt: "DataMarketing",
      title: "Taxes",
      description: "Manage and file taxes",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: compliancesFA,
      alt: "EmailMarketing",
      title: "Compliances",
      description: "Ensure financial compliances",
    },
    {
      id: 12,
      // image: LeadGeneration,
      image: analyticsFA,
      alt: "LeadGeneration",
      title: "Analytics",
      description: "Financial analytics and insights",
    },
  ];
  const services_salesMarketing = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: automatedSeoSM,
      alt: "TransactionalWebsite",
      title: "Automated SEO",
      description: "Boost search engine rankings",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: personalisedSemSM,
      alt: "BookingEngine",
      title: "Personalised SEM",
      description: "Targeted search engine marketing",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: adNetworksSM,
      alt: "MeetingRoomEngine",
      title: "Ad Networks",
      description: "Advertise across multiple networks",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: leadGenerationSM,
      alt: "PaymentGateway",
      title: "Lead Generation",
      description: "Generate quality leads",
    },
    {
      id: 5,
      // image: Blog,
      image: socialMediaSM,
      alt: "Blog",
      title: "Social Media",
      description: "Manage social media campaigns",
    },
    {
      id: 6,
      // image: Hiring,
      image: emailMarketingSM,
      alt: "Hiring",
      title: "Email Marketing",
      description: "Personalized email campaigns",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: smsMarketingSM,
      alt: "GoogleMyBusiness",
      title: "SMS Marketing",
      description: "Direct SMS marketing",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: whatsAppIntegrationSM,
      alt: "SearchEngineOptimisation",
      title: "WhatsApp Integration",
      description: "Integrate with WhatsApp",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: livechatSM,
      alt: "SearchEngineMarketing",
      title: "Live Chat",
      description: "Live chat support",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: referralsSM,
      alt: "DataMarketing",
      title: "Referrals",
      description: "Referral marketing program",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: blogsSM,
      alt: "EmailMarketing",
      title: "Blogs",
      description: "Content marketing through blogs",
    },
    {
      id: 12,
      // image: LeadGeneration,
      image: vlogsSM,
      alt: "LeadGeneration",
      title: "Vlogs",
      description: "Video marketing via vlogs",
    },
  ];
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
  const services_customerManagement = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: ticketRaisingCM,
      alt: "TransactionalWebsite",
      title: "Ticket Raising",
      description: "Efficient ticket management system",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: complaintLogsCM,
      alt: "BookingEngine",
      title: "Complaint Logs",
      description: "Log and track customer complaints",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: meetingRoomsCM,
      alt: "MeetingRoomEngine",
      title: "Meetings Rooms",
      description: "Manage meeting room bookings",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: cafeOrdersCM,
      alt: "PaymentGateway",
      title: "Café Orders",
      description: "Manage in-house café orders",
    },
    {
      id: 5,
      // image: Blog,
      image: visitorCM,
      alt: "Blog",
      title: "Visitors",
      description: "Track and manage visitors",
    },
    {
      id: 6,
      // image: Hiring,
      image: announcementsCM,
      alt: "Hiring",
      title: "Announcements",
      description: "Broadcast company announcements",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: feedbackCM,
      alt: "GoogleMyBusiness",
      title: "Feedback",
      description: "Collect and analyze customer feedback",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: customerRatingCM,
      alt: "SearchEngineOptimisation",
      title: "Customer Rating",
      description: "Gather customer ratings and reviews",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: customerServiceCM,
      alt: "SearchEngineMarketing",
      title: "Customer Service",
      description: "Enhance customer service experience",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: autoresponseCM,
      alt: "DataMarketing",
      title: "Auto Responses",
      description: "Automate customer responses",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: reportsCM,
      alt: "EmailMarketing",
      title: "Reports",
      description: "Generate customer service reports",
    },
    {
      id: 12,
      // image: LeadGeneration,
      image: analyticsCM,
      alt: "LeadGeneration",
      title: "Analytics",
      description: "Customer analytics and insights",
    },
  ];
  const services_reportsAnalytics = [
    {
      id: 1,
      // image: TransactionalWebsite,
      image: companyDashboard,
      alt: "TransactionalWebsite",
      title: "Company Dashboard",
      description: "Overview of company metrics",
    },
    {
      id: 2,
      // image: BookingEngine,
      image: customerTrends,
      alt: "BookingEngine",
      title: "Customer Trends",
      description: "Insights on customer behavior",
    },
    {
      id: 3,
      // image: MeetingRoomEngine,
      image: businessTrendsRA,
      alt: "MeetingRoomEngine",
      title: "Business Trends",
      description: "Track and analyze business growth",
    },
    {
      id: 4,
      // image: PaymentGateway,
      image: vendorPayoutsRA,
      alt: "PaymentGateway",
      title: "Vendor Payouts",
      description: "Manage and report vendor payments",
    },
    {
      id: 5,
      // image: Blog,
      image: cashflowRA,
      alt: "Blog",
      title: "Cashflow",
      description: "Monitor cashflow status",
    },
    {
      id: 6,
      // image: Hiring,
      image: keyNotificationsRA,
      alt: "Hiring",
      title: "Key Notifications",
      description: "Receive important alerts",
    },
    {
      id: 7,
      // image: GoogleMyBusiness,
      image: fullDataAnalysisRA,
      alt: "GoogleMyBusiness",
      title: "Full Data Analysis",
      description: "Comprehensive data analytics",
    },
    {
      id: 8,
      // image: SearchEngineOptimisation,
      image: customerReportsRA,
      alt: "SearchEngineOptimisation",
      title: "Customer Reports",
      description: "Detailed customer reports",
    },
    {
      id: 9,
      // image: SearchEngineMarketing,
      image: employeeReportsRA,
      alt: "SearchEngineMarketing",
      title: "Employee Reports",
      description: "Performance reports of employees",
    },
    {
      id: 10,
      // image: DataMarketing,
      image: milestoneReportsRA,
      alt: "DataMarketing",
      title: "Milestone Reports",
      description: "Track important milestones",
    },
    {
      id: 11,
      // image: EmailMarketing,
      image: taxesReportsRA,
      alt: "EmailMarketing",
      title: "Taxes Reports",
      description: "Review tax-related reports",
    },
    {
      id: 12,
      // image: LeadGeneration,
      image: customisedReportsRA,
      alt: "LeadGeneration",
      title: "Customised Reports",
      description: "Generate custom reports",
    },
  ];

  // Arrays Icon End

  // LANDING PAGE ICONS START

  // Dashboard Icon Image
  const dashboardImage = services_reportsAnalytics[0].image;

  // Services Icon Image
  const servicesImage = services_salesMarketing[4].image;

  // Chat Icon Image
  const chatImage = services_frontend[8].image;

  // Profile Icon Image
  const profileImage = services_frontend[6].image;

  // Calendar Icon Image
  const calendarImage = services_frontend[1].image;

  // Access Icon Image
  const accessImage = services_salesMarketing[9].image;

  // QUICK LAUNCK ICONS

  // Tasks Icon Image
  const tasksImage = services_hrSupport[7].image;

  // Ticket Icon Image
  const ticketsImage = services_customerManagement[0].image;

  // Meeting Icon Image
  const meetingImage = services_customerManagement[2].image;

  // Customer service Icon Image
  const customerServiceImage = services_customerManagement[8].image;

  // LANDING PAGE ICONS END

  // EXTRA DUMMY ICONS START
  // Website Icon Image
  const websiteImage = services_frontend[0].image;

  // EXTRA DUMMY ICONS END

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);
  const [isDragEnabled, setIsDragEnabled] = useState(false);

  const [quickLaunchIcons, setQuickLaunchIcons] = useState([
    { id: 1, title: "Dashboard", iconSrc: dashboardImage },
    { id: 2, title: "HR", iconSrc: visitorCM },
    { id: 3, title: "Chat", iconSrc: chatImage },
    { id: 4, title: "Profile", iconSrc: profileImage },
    { id: 5, title: "Calendar", iconSrc: calendarImage },
    { id: 6, title: "Access", iconSrc: accessImage },
    { id: 7, title: "Tasks", iconSrc: tasksImage },
    { id: 11, title: "Asset", iconSrc: budgetFA },
    { id: 8, title: "Ticket", iconSrc: ticketsImage },
    { id: 9, title: "Meeting", iconSrc: meetingImage },
    { id: 10, title: "Customer Service", iconSrc: customerServiceImage },
  ]);

  // Toggle drag-and-drop functionality
  const toggleDragAndDrop = () => {
    setIsDragEnabled((prev) => !prev);
    console.log(quickLaunchIcons);
  };

  // Handle drag end to swap items
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = quickLaunchIcons.findIndex(
        (icon) => icon.id === active.id
      );
      const newIndex = quickLaunchIcons.findIndex(
        (icon) => icon.id === over.id
      );
      setQuickLaunchIcons((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  // State to track selected cards (already present in your code)
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSelect = (title) => {
    setSelectedCards((prev) => {
      // Check if the item is already in quickLaunchIcons
      const isInQuickLaunch = quickLaunchIcons.some(
        (icon) => icon.title === title
      );

      if (isInQuickLaunch) {
        // If it's in Quick Launch, remove it from selectedCards only (not from Quick Launch)
        return prev.filter((t) => t !== title);
      } else {
        // Otherwise, toggle selection normally
        return prev.includes(title)
          ? prev.filter((t) => t !== title)
          : [...prev, title];
      }
    });
  };

  const handleAddServices = () => {
    setQuickLaunchIcons((prev) => {
      const newIcons = selectedCards.map((title) => {
        const service = [
          ...services_frontend,
          ...services_financeAccounting,
          ...services_salesMarketing,
          ...services_hrSupport,
          ...services_customerManagement,
          ...services_reportsAnalytics,
        ].find((service) => service.title === title);

        return { title: service.title, iconSrc: service.image };
      });

      // Filter out duplicates before adding
      const uniqueNewIcons = newIcons.filter(
        (newIcon) =>
          !prev.some((existingIcon) => existingIcon.title === newIcon.title)
      );

      return [...prev, ...uniqueNewIcons];
    });

    // Optionally, reset selectedCards after adding
    setSelectedCards([]);

    toast.success("New Services Added");
    closeModal(); // Optionally close the modal after the alert
  };

  return (
    <>
      <div className="bg-white p-6 h-[90vh] flex flex-col overflow-y-auto">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-12 flex-wrap">
          <h1 className="text-3xl md:text-4xl font-bold pl-20 motion-preset-slide-right-md">
            {auth.user.name}
          </h1>
          <div className="flex gap-4 pr-20">
            {/* Add More Button */}
            {auth.user.role.roleTitle === "Master-Admin" ||
            auth.user.role.roleTitle === "Super-Admin" ||
            auth.user.role.roleTitle === "Admin" ? (
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600"
                  onClick={openModal}>
                  Add More
                </button>
              </div>
            ) : null}
            <button
              onClick={toggleDragAndDrop}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 mt-4 md:mt-0">
              {/* Organize */}
              {isDragEnabled ? "Save Changes" : "Organize"}
            </button>
          </div>
        </div>
        <div>
          {isDragEnabled ? (
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}>
              <SortableContext
                items={quickLaunchIcons.map((icon) => icon.id)}
                strategy={verticalListSortingStrategy}>
                <IconGrid
                  isDragEnabled={isDragEnabled}
                  quickLaunchIcons={quickLaunchIcons}
                />
              </SortableContext>
            </DndContext>
          ) : (
            <IconGrid quickLaunchIcons={quickLaunchIcons} />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  bg-gray-100">

        {/* Modal */}
        {isModalOpen && (
          <NewModal open={isModalOpen}>
            {/* Modal Content */}

            {/* Modal Header */}
            <div className="top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="text-3xl font-bold mb-4 uppercase">
                Add Services
              </h2>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <div className="h-full overflow-y-auto top-0 px-6 py-4">
              {auth.user.department.map((dept) => dept === "TopManagement") ||
              auth.user.department.map((dept) => dept === "Tech") ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    Frontend
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_frontend.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {/* Finance & Accounting Section */}

              {auth.user.department.map((dept) => dept) === "TopManagement" ||
              auth.user.department.map((dept) => dept) === "Finance" ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    Finance & Accounting
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_financeAccounting.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Sales & Marketing Section */}
              {auth.user.department.map((dept) => dept === "TopManagement") ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    Sales & Marketing
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_salesMarketing.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* HR Section */}
              {auth.user.department.map((dept) => dept === "TopManagement") ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    HR Support
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_hrSupport.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Customer Management Section */}
              {auth.user.department.map((dept) => dept === "TopManagement") ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    Customer Management
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_customerManagement.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Reports & Analytics Section */}
              {auth.user.department.map((dept) => dept === "TopManagement") ? (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-8 ps-[7rem] uppercase">
                    Reports & Analytics
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-8 mb-12">
                    {services_reportsAnalytics.map((service) => (
                      <div className="flex justify-center items-center">
                        <Card
                          key={service.id}
                          title={service.title}
                          iconSrc={service.image}
                          isSelected={
                            selectedCards.includes(service.title) ||
                            quickLaunchIcons.some(
                              (icon) => icon.title === service.title
                            )
                          }
                          handleSelect={handleSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {/* Modal Header-Footer */}

            <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
              <div className="flex justify-center items-center">
                {/* Add button */}
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={handleAddServices}
                >
                  Add
                </button>
              </div>
            </div>
          </NewModal>
        )}
      </div>
    </>
  );
};

// const SortableCard = ({ id, title, iconSrc, isDragEnabled }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     // borderColor: isDragEnabled ? "red" : "white", // Red border if drag is enabled
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={`flex flex-col items-center text-center cursor-pointer p-4 bg-white border-2 rounded-lg ${
//         isDragEnabled ? "border-red" : "border-white"
//       }`}>
//       <img src={iconSrc} alt={title} className="w-16 h-16 mb-4" />
//       <p className="text-lg font-medium">{title}</p>
//     </div>
//   );
// };

// SortableCard Component
const SortableCard = ({ id, title, iconSrc, isDragEnabled }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // borderColor: isDragEnabled ? "red" : "white", // Red border if drag is enabled
  };

  const handleClick = () => {
    // Define your routes based on the icon's title or id
    switch (title) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "HR":
        navigate("/hr/dashboard");
        break;
      case "Chat":
        navigate("/chat");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Calendar":
        navigate("/calendar");
        break;
      case "Access":
        navigate("/access");
        break;
      case "Tasks":
        navigate("/tasks");
        break;
      case "Ticket":
        navigate("/tickets");
        break;
      case "Meeting":
        navigate("/it/meetings");
        break;
      case "Asset":
        navigate("/it/kpi");
        break;
      case "Customer Service":
        navigate("/chat");
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick} // Navigate on click
      className={`flex flex-col items-center text-center cursor-pointer p-4 bg-white border-2 rounded-lg ${
        isDragEnabled ? "border-blue-500" : "border-white"
      }`}>
      <img src={iconSrc} alt={title} className="w-16 h-16 mb-4" />
      <p className="text-lg font-medium">{title}</p>
    </div>
  );
};

const IconGrid = ({ quickLaunchIcons, isDragEnabled }) => (
  <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-12">
    {quickLaunchIcons.map((icon) => (
      <SortableCard
        key={icon.id}
        id={icon.id}
        title={icon.title}
        iconSrc={icon.iconSrc}
        isDragEnabled={isDragEnabled}
      />
    ))}
  </div>
);

// Card Component in popup
const Card = ({ title, iconSrc, isSelected, handleSelect }) => {
  return (
    <div
      className={`relative w-32 h-32 border-2 rounded-lg p-3 transition-shadow duration-300 cursor-pointer flex flex-col justify-center items-center ${
        isSelected ? "border-blue-500 shadow-lg" : "border-gray-300"
      }`}
      onClick={() => handleSelect(title)}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleSelect(title)}
        className="absolute top-1.5 right-1.5 form-checkbox h-4 w-4 text-blue-600"
        onClick={(e) => e.stopPropagation()} // Prevent card click on checkbox click
      />
      <img src={iconSrc} alt={title} className="w-12 h-12 mb-2" />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
};

export default ClientLandingPage;
