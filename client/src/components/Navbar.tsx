import { Cpu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Cpu className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              CPU Scheduler Visualizer
            </h1>
          </div>
          <div className="text-sm text-gray-600">Operating Systems Project</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
