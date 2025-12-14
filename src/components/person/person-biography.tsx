interface PersonBiographyProps {
  summary: string;
}

const PersonBiography = ({ summary }: PersonBiographyProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        Biography
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {summary}
      </p>
    </div>
  );
};

export default PersonBiography;
