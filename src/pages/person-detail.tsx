import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { personApi } from "@/api";
import type { PersonDetail, PersonMovie } from "@/api/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PersonInfo, PersonBiography, PersonMovies } from "@/components/person";

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await personApi.getPersonById(id);
        setPerson(data);
      } catch (err) {
        console.error("Error fetching person:", err);
        setError("Failed to load person details");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  // Group movies by id to avoid duplicates
  const uniqueMovies = useMemo(() => {
    if (!person?.known_for) return [];

    const movieMap = new Map<string, PersonMovie & { roles: string[] }>();

    person.known_for.forEach((movie) => {
      if (movieMap.has(movie.id)) {
        // Add role to existing movie
        const existing = movieMap.get(movie.id)!;
        if (!existing.roles.includes(movie.role)) {
          existing.roles.push(movie.role);
        }
      } else {
        // Add new movie with roles array
        movieMap.set(movie.id, {
          ...movie,
          roles: [movie.role],
        });
      }
    });

    return Array.from(movieMap.values());
  }, [person?.known_for]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading person details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 mb-4">{error || "Person not found"}</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Person Info Section */}
      <PersonInfo person={person} />

      {/* Biography Section */}
      <PersonBiography summary={person.summary} />

      {/* Known For Section */}
      <PersonMovies movies={uniqueMovies} />
    </div>
  );
}
