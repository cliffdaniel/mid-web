import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, setDoc, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import Project from "@/models/project";
import fireStoreDB from "@/config/firebase";
import useFetchProjects from "@/hooks/useFetchProjects";
import ModalForm from "./ModalForm";

const Projects: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState<Project>({} as Project);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, isLoading, fetchProjects] = useFetchProjects('diseno');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    } else {
      fetchProjects();
    }
    fetchProjects();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "area", headerName: "Área", flex: 1 },
    { field: "location", headerName: "Ubicación", flex: 1 },
    { field: "client", headerName: "Cliente", flex: 1 },
    { field: "architect", headerName: "Arquitecto", flex: 1 },
    { field: "mutua", headerName: "Mutua", flex: 1 },
    { field: "employee", headerName: "Empleado", flex: 1 },
    { field: "company", headerName: "Compañía", flex: 1 },
    { field: "year", headerName: "Año", flex: 1 },
    { field: "photography", headerName: "Fotógrafo", flex: 1 },
    { field: "type", headerName: "Tipo", flex: 1 },
    {
      field: 'actions',
      headerName: '',
      align: 'center',
      width: 100,
      sortable: false,
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
      const projectDocRef = doc(fireStoreDB, "diseno", newProject.id);
      await setDoc(projectDocRef, newProject);
    } else {
      const timestamp = Timestamp.now();
      newProject.createdAt = timestamp;
      await addDoc(collection(fireStoreDB, "diseno"), newProject)
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const projectDocRef = doc(fireStoreDB, 'diseno', id);
      await deleteDoc(projectDocRef);
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <div className="py-6 max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Panel de Proyectos de Diseño
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
