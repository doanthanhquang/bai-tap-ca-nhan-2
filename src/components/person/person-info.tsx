import type { PersonDetail } from "@/api/types";

interface PersonInfoProps {
  person: PersonDetail;
}

const PersonInfo = ({ person }: PersonInfoProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
      {/* Person Image */}
      {person.image && (
        <div className="col-span-1 max-sm:flex max-sm:justify-center">
          <img
            src={person.image}
            alt={person.name}
            className="max-sm:w-50 aspect-square object-cover rounded-lg shadow-xl"
          />
        </div>
      )}

      {/* Person Details */}
      <div className="sm:col-span-3 space-y-6">
        {/* Name & Role */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {person.name}
          </h1>
          {person.role && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {person.role}
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          {person.birth_date && (
            <div>
              <span className="font-semibold">Born:</span>{" "}
              {new Date(person.birth_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          {person.death_date && (
            <div>
              <span className="font-semibold">Died:</span>{" "}
              {new Date(person.death_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          {person.height && (
            <div>
              <span className="font-semibold">Height:</span> {person.height}
            </div>
          )}
        </div>

        {/* Awards */}
        {person.awards && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
              🏆 {person.awards}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonInfo;
