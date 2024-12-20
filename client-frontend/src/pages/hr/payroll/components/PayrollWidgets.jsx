import { useNavigate } from "react-router-dom";

export default function PayrollWidgets({ title, content, id }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={
        id === 1
          ? () => navigate("/hr/payroll/value")
          : id === 2
          ? () => navigate("/hr/payroll/employee-count")
          : id === 3
          ? () => navigate("/hr/payroll/due-payout")
          : null
      }
      className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold text-blue-600">{content}</p>
    </article>
  );
}
