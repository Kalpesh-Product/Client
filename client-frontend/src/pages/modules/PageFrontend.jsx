import React from "react";
import ModuleSidebar from "../../components/ModuleSidebar";
import { useLocation, useParams } from "react-router-dom";
import TestSide from "../../components/Sidetest";

const DepartmentDash = () => {
  const location = useLocation();
  const departmentName = location.state?.departmentName;
  const { department } = useParams();

  const products = [
    {
      id: 1,
      name: "Theme 1",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Theme 2",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Theme 3",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Theme 4",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Theme 5",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Theme 6",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Theme 7",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Theme 8",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div className="flex">
      <TestSide />
      <ModuleSidebar />
      {location.pathname === "/frontend/updates" ? (
        <div className="p-6">Updates here</div>
      ) : location.pathname === "/frontend/themes" ? (
        <div className="p-6 w-full">
          <h2 className="text-2xl font-bold mb-6">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6">Doesn't exist</div>
      )}
    </div>
  );
};

export default DepartmentDash;
