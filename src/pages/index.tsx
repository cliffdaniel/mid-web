import React, { useEffect, useState } from "react";
import CustomCarousel from "../components/Carousel";
import fireStoreDB from "@/config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Project from "@/models/project";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(fireStoreDB, "projects");
        const orderedQuery = query(
          projectsCollection,
          orderBy("createdAt", "desc")
        );

        onSnapshot(orderedQuery, (response: any) => {
          const projects: any = [];
          response.forEach((doc: any) => {
            projects.unshift({ ...doc.data(), id: doc.id });
          });
          setProjects(projects);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error al obtener la lista de proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-[170px] md:mt-[40px]">
      <div className="mx-auto w-max max-w-full md:max-w-[1340px] p-4">
        {!isLoading && (
          <CustomCarousel
            images={projects
              .filter((project) => project.images.length > 0)
              .map((project) => ({
                src: project.images[0],
                title: project.description,
                subtitle: project.location,
              }))}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
