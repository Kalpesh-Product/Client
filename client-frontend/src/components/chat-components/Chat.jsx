export default function Chat({ item }) {
  return (
    <article className="flex items-center w-full px-4 py-3 mb-2 bg-white hover:bg-gray-200 transition rounded-lg cursor-pointer">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-semibold mr-3 ${getNodeColor(
          item.name
        )}`}
      >
        {getInitials(item.name)}
      </div>
      <h2 className="text-sm font-semibold text-gray-800">{item.name}</h2>
    </article>
  );
}

const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getNodeColor = (name) => {
  const colors = [
    "bg-orange-600",
    "bg-purple-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-red-600",
    "bg-teal-600",
    "bg-pink-600",
  ];
  const hash = Array.from(name).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return colors[hash % colors.length];
};
