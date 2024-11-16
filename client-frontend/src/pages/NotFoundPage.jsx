// NotFoundPage.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { departments } = useParams();
  return (
    <div className="flex justify-center items-center h-screen text-center">
        <div>
      <h1 className="text-4xl font-bold wono-blue-text">Coming soon</h1>
      <p className="underline mt-5 cursor-pointer">
        Go to <span onClick={() => navigate(`/dashboard`)}>Dashboard</span>
      </p>
        </div>
    </div>
  );
};

export default NotFoundPage;
