import { useState } from 'react';
import { useRouter } from 'next/router';
import { collection, QuerySnapshot, onSnapshot, query, orderBy } from 'firebase/firestore';
import FireStoreDB from '@/config/firebase';
import Project from "@/models/project";

const useFetchProjects = (model: string): [Project[], boolean, () => void] => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProjects = async (): Promise<void> => {
    try {
      const projectsCollection = collection(FireStoreDB, model);
      const orderedQuery = query(projectsCollection, orderBy('createdAt', 'desc'));

      onSnapshot(orderedQuery, (response: QuerySnapshot): void => {
        const projects: Project[] = [];
        response.forEach((doc) => {
          projects.unshift({ ...doc.data(), id: doc.id } as Project);
        });
        setProjects(projects);
        setIsLoading(false);
      });
    } catch (error: any) {
      console.error("Error al obtener la lista de proyectos:", error);
    }
  };

  const executeFetch = (): void => {
    if (router.isReady) {
      fetchProjects();
    }
  };

  return [projects, isLoading, executeFetch];
};

export default useFetchProjects;
