import { useState } from "react";
import HierarchyTree from "../components/HierarchyTree";
import { NewModal } from "../components/NewModal";
import MemberForm from "../components/MemberForm";
import { data } from "../utils/data";
import { motion } from "framer-motion";
import DepartmentForm from "../components/DepartmentForm";
import TestSide from "../components/Sidetest";

export default function Access() {
  const [addDepartment, setAddDepartment] = useState(false);
  const [addMember, setAddMember] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <TestSide />

      {/* Main Content */}
      <main className="flex-1 p-4 ml-4 md:p-8 motion-preset-blur-right-md overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Access
          </h1>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddDepartment(true)}
              className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
            >
              Add Department
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddMember(true)}
              className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
            >
              Add Employee
            </motion.button>
          </div>
        </div>

        <NewModal open={addMember} onClose={() => setAddMember(false)}>
          <MemberForm
            onClose={() => setAddMember(false)}
            formTitle={"Enter Employee Details"}
          />
        </NewModal>

        <NewModal open={addDepartment} onClose={() => setAddDepartment(false)}>
          <DepartmentForm
            onClose={() => setAddDepartment(false)}
            formTitle={"Enter Department Details"}
          />
        </NewModal>

        <div className="overflow-x-auto p-4 md:p-8 flex justify-center">
          <div className="max-w-4xl w-full motion-preset-expand">
            <HierarchyTree data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
