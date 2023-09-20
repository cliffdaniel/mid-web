import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";
import { collection, addDoc, setDoc, doc, deleteDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ModalForm from "./ModalForm";
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import fireStoreDB from "./../../../config/firebase";

interface Project {
  id: string | null;
  name: string;
  lastName: string;
  position: string;
  createdAt: any;
}

const Projects: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project>({} as Project);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(fireStoreDB, 'team');
        const orderedQuery = query(projectsCollection, orderBy('createdAt', 'desc'));

        onSnapshot(orderedQuery, (response: any) => {
          const projects: any = []
          response.forEach((doc: any) => {
            projects.unshift( { ...doc.data(), id: doc.id })
          });
          setProjects(projects);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error al obtener la lista de proyectos:", error);
      }
    };

    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      fetchProjects();
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      align: 'center',
      width: 7,
      renderCell: () => {
        return (
          <div>
            <HomeIcon />
          </div>
        );
      },
    },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "lastName", headerName: "Apellido", flex: 1 },
    { field: "position", headerName: "Cargo", flex: 1 },
    {
      field: 'actions',
      headerName: '',
      align: 'center',
      width: 100,
      renderCell: (params) => {
        const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.stopPropagation();
          handleDelete(params.row.id);
        };

        return (
          <div>
            <button onClick={handleDeleteClick}>
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const handleOpenModal = (params?: any) => {
    if (params?.id) {
      setProject(params?.row);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProject({} as Project);
    setIsModalOpen(false);
  };

  const handleAddProject = async (newProject: Project) => {
    if (newProject.id) {
      const projectDocRef = doc(fireStoreDB, "team", newProject.id);
      await setDoc(projectDocRef, newProject);
    } else {
      const timestamp = Timestamp.now();
      newProject.createdAt = timestamp;
      await addDoc(collection(fireStoreDB, "team"), newProject)
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const projectDocRef = doc(fireStoreDB, 'team', id);
      await deleteDoc(projectDocRef);
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <div className="py-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Panel de Equipo de Trabajo
          </h1>
        </div>
      </header>

      <main>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ backgroundColor: "#1976D2" }}
        >
          Agregar Nuevo
        </Button>

        <div style={{ height: 400, width: "100%", marginTop: "45px" }}>
          <DataGrid
            loading={isLoading}
            rows={projects.length ? projects : []}
            columns={columns}
            pagination={true}
            paginationMode="client"
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            rowCount={projects.length}
            onRowClick={handleOpenModal}
          />
        </div>

        <ModalForm
          open={isModalOpen}
          project={project}
          onClose={handleCloseModal}
          onSubmit={handleAddProject}
        />
      </main>
    </div>
  );
};

export default Projects;
