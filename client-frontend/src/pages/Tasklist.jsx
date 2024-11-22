import React,{useState} from 'react'
import TestSide from '../components/Sidetest'
import ModuleSidebar from '../components/ModuleSidebar';
import AssignTaskForm from '../components/TaskManagement/AssignTaskForm';
import { NewModal } from '../components/NewModal';
import { useNavigate } from 'react-router-dom';


const Tasklist = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalOpen,SetModalOpen] = useState(false);
    const [btnclicked,setbtnclicked] = useState("");

    const navigate = useNavigate();

  const handleClick = (title) => {
    navigate('/tasklistTable', { state: { taskTitle: title } });
  };

    const tasks = {
        ongoing: [
          { title: "Website Redesign", department: "Technology and IT", description: "To discuss about the details of the projects which is important" },
          { title: "Launch a new digital marketing Campaign", department:"Marketing and Branding", description: "To enhance the productivity and the materials of the projects which is very much effetives." },
          { title: "Market Expansion strategy for new Product line", department:"Finance", description: "To entertain the peacefull understanding anf training for the ppeople around us." },
        ],
        upcoming: [
          { title: "Financial forcasting and Budgeting",department: "Strategy", description: "To discuss about the details of the projects which is important" },
          { title: "Bussiness Process optimizations and Automation",department: "Operation", description: "To enhance the productivity and the materials of the projects which is very much effetives." },
          { title: "Employee Onboarding and training programme",department: "Human Resources and Training", description: "To entertain the peacefull understanding anf training for the ppeople around us" },
        ],
        pending: [
          { title: "Annual Co-operate Conference and Networking Evets",department: "Event Management", description: "Details about Task 7" },
          { title: "Data Privacy And GDPR Compliance initiative",department: "Compliance and Regulatory", description: "To enhance the productivity and the materials of the projects which is very much effetives." },
          { title: "Reducing Environmental impact and promoting Sustainability",department: "Corporate Sustainability and Compliance", description: "To enhance the productivity and the materials of the projects which is very much effetives." },
        ],
      };

      const TaskCard = ({ title, description,department }) => (
        <div className="bg-gray-100 shadow-md rounded-lg p-4 mb-4" onClick={()=>handleClick(title)}>
          <p className='text-sm  py-2 px-2 bg-white rounded-full max-w-max my-2'>{department}</p>
          <h4 className="text-md font-semibold">{title}</h4>
          <p className="text-gray-600 my-5 ">{description}</p>
        </div>
      );
      
      const Column = ({ title, tasks,titleColor }) => (
        <div className="w-full lg:w-1/3 px-4">
          <h2 className={`text-xl font-bold ${titleColor} mb-4`}>{title}</h2>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </div>
        </div>
      );

      const AddProjectbtn = (title)=>{
        SetModalOpen(true);
        setbtnclicked(title);

      }

     
      const closeModal = () => SetModalOpen(false);
  return (
    <div className='flex min-h-screen'>
        <TestSide />
        <ModuleSidebar />
        <div className='w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto '>
        <div className="flex flex-wrap items-center justify-between ">
        <h2 className="text-2xl  ">TaskLists</h2>
    {/* Left Side: Search, Priority Dropdown, and Date Filter */}
    <div className="flex flex-wrap gap-1">
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

     
    </div>

    {/* Right Side: Assign Task Button */}
    <div className='flex space-x-4'>
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
     onClick={()=>AddProjectbtn('Add Task')}>
     + Add Tasks
    </button>
    
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
     onClick={()=>AddProjectbtn('Add Project')}>
     + Add Projects
    </button>
    </div>
  </div>
  
  <div className=" mt-10">
      <div className="flex flex-wrap -mx-4">
        <Column title="Ongoing" tasks={tasks.ongoing} titleColor="text-orange-600" />
        <Column title="Upcoming" tasks={tasks.upcoming} titleColor="text-blue-600"/>
        <Column title="Pending" tasks={tasks.pending} titleColor="text-green-600"/>
      </div>
    </div>
  
  

  </div>
  {modalOpen &&
(<NewModal open={modalOpen} onClose={closeModal}>
  
      <AssignTaskForm title={btnclicked === 'Add Task' ? 'Add Task' : 'Add Project'} handleClose={closeModal} modalType={btnclicked} /> 
  </NewModal>)}


    </div>
  )
}

export default Tasklist