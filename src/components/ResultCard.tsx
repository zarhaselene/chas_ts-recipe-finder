import { Recipe } from "@/app/types/shared";
import { Clock } from "lucide-react";

interface ResultCardProps {
  recipe: Recipe;
}

export default function ResultCard({ recipe }: ResultCardProps) {
  return (
    <div
      className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300 h-fit"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          <Clock size={14} />
          {recipe.timeMinutes}m
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <details className="group/details">
          <summary className="cursor-pointer font-semibold text-gray-700 hover:text-blue-600 transition-colors select-none">
            View Recipe Steps
            <span className="ml-2 inline-block transition-transform group-open/details:rotate-180">
              ↓
            </span>
          </summary>
          <div className="mt-3 space-y-2">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}