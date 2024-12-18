export default function PayrollWidgets({ title, content }) {
  return (
    <article className="hover:bg-slate-100 bg-white shadow-md rounded-lg p-4 cursor-pointer transition">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold text-blue-600">{content}</p>
    </article>
  );
}
