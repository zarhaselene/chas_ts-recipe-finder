import SearchClient from "@/components/SearchClient";
import { ChefHat } from "lucide-react";

export default function Home() {
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(59,130,246,0.1)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_rgba(139,92,246,0.1)_0%,_transparent_50%)]"></div>
      
      <div className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <ChefHat size={32} className="text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Recipe Finder
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover amazing recipes based on your ingredients and preferences. 
            </p>
          </div>
          <SearchClient />
        </div>
      </div>
    </div>
  );
}