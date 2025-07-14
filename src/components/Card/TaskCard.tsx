import { PiNotePencilBold } from "react-icons/pi";

type TaskCardProps = {
  title: string;
  tags?: string[];
  date?: string;
  avatars?: string[];
};

const TaskCard = ({ title, tags = [], date, avatars = [] }: TaskCardProps) => {
  return (
    <div className="relative group border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
      {/* Icon chỉ hiển thị khi hover */}
      <button className="absolute top-2 right-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <PiNotePencilBold size={18} />
      </button>

      <p className="text-gray-800 font-medium text-sm mb-3">{title}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {date && <p className="text-xs text-gray-400 mb-2">{date}</p>}
      {/* <div className="flex -space-x-2">
                {avatars.map((item, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg ring-2 ring-white"
                    >
                        {item}
                    </div>
                ))}
        </div> */}
    </div>
  );
};

export default TaskCard;
