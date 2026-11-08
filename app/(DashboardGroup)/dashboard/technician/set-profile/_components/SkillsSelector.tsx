"use client";

import { Check } from "lucide-react";

const availableSkills = [
  "Wiring",
  "Electrical Repair",
  "AC Repair",
  "Plumbing",
  "Pipe Installation",
  "Home Cleaning",
  "Painting",
  "Carpentry",
  "Appliance Repair",
];

type Props = {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
};

export default function SkillsSelector({
  selectedSkills,
  onChange,
}: Props) {
  const toggleSkill = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((item) => item !== skill)
      : [...selectedSkills, skill];

    onChange(updatedSkills);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-slate-800">
          Professional Skills
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Select the skills you can professionally provide.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);

          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
              }`}
            >
              {skill}

              {isSelected && <Check size={15} />}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-500">
        {selectedSkills.length} skills selected
      </p>
    </div>
  );
}