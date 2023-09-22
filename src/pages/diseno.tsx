import React, { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import fireStoreDB from "@/config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Project from "@/models/project";
import CustomCarousel from "../components/Carousel";

const Diseno: React.FC = () => {
  const [activeOption, setActiveOption] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(fireStoreDB, "diseno");
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

  const handleOptionClick = (optionIndex: number) => {
    setActiveOption(optionIndex);
    setProject(null);
  };

  const options = [
    { text: "todos", index: 0 },
    { text: "mobiliario", index: 1 },
    { text: "interiores", index: 2 },
    { text: "stands", index: 3 },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredImages =
    activeOption === 0
      ? projects
      : projects.filter(
          (project) => project.type === options[activeOption].text
        );

  const [esSticky, setEsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setEsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="gap-10 md:grid-cols-2 max-w-[1140px] mx-auto px-4 md:px-[35px]">
      <div ref={stickyRef} className={`
        sticky flex-col transition-height duration-300 ease-in-out items-center
        top-[70px] md:top-0 z-50 bg-[#F2F2F2] flex flex-col items-center gap-4 md:flex-row md:justify-center mb-[30px]
        ${esSticky ? 'h-[150px] md:h-[150px]' : 'h-[160px] md:h-[50px]'}`}>
        {options.map((option) => (
          <div
            key={option.index}
            className={`cursor-pointer text-center text-base font-weight-500 ${
              activeOption === option.index ? "border-b border-black" : ""
            }`}
            onClick={() => handleOptionClick(option.index)}
          >
            {option.text}
          </div>
        ))}
      </div>
      <div className="flex flex-col top-[90px] bottom-0 left-0 right-0 overflow-hidden overflow-y-auto">
        {options[activeOption].text === 'interiores' && <div className="flex justify-center w-full mx-auto mb-4 text-center">partner: Gela Estudio</div>}
        {project && (
          <div>
            <CustomCarousel
              images={project.images.map((image) => ({
                src: image,
                title: '',
                subtitle: '',
              }))}
            />
            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="text-black text-center font-medium text-sm leading-[23px] tracking-[1.4px] uppercase mt-4">
                {project.name}
              </h3>
              <p className="text-gray-300 text-center font-roboto font-light text-xs leading-[12.1px] tracking-[1.75px] uppercase mb-4">
                {project.location}
              </p>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Descripción: {project.description}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Locación: {project.location}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Área: {project.area}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Cliente: {project.client}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Arquitecto: {project.architect}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Mutua: {project.mutua}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Colaboradores: {project.employee}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Constructora: {project.company}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Año: {project.year}
              </div>
              <div className="text-sm font-medium leading-6 text-center text-gray-800 uppercase tracking-1">
                Fotografía: {project.photography}
              </div>
            </div>
          </div>
        )}
        {!project && (<ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2 }}>
          <Masonry gutter="20px">
            {filteredImages.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-md"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={item.images[0]}
                  alt={`Carousel ${index}`}
                  className="w-full h-auto"
                />
                {hoveredIndex === index && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white bg-black bg-opacity-75 cursor-pointer"
                    onClick={() => setProject(item)}>
                    {item.name}
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        )}
      </div>
    </div>
  );
};

export default Diseno;
