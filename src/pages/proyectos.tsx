import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import fireStoreDB from "@/config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Project from "@/models/project";

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeOption, setActiveOption] = useState(0);

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

  const handleOptionClick = (optionIndex: number) => {
    setActiveOption(optionIndex);
  };

  const options = [
    { text: 'todos', index: 0 },
    { text: 'inmobiliario', index: 1 },
    { text: 'interiores', index: 2 },
    { text: 'stands', index: 3 },
  ];

  const carouselImages = Array.from({ length: 10 }, (_, index) => ({
    image: `/proyecto-${index + 1 < 10 ? `0${index + 1}` : index + 1}.png`,
    category: options[index % (options.length - 1) + 1].text,
    label: `Proyecto ${index + 1}`,
  }));

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredImages = activeOption === 0
    ? carouselImages
    : carouselImages.filter(image => image.category === options[activeOption].text);

  return (
    <div className="gap-10 py-10 md:grid-cols-2 max-w-[1340px] mx-auto px-4 md:px-[35px]">
      <div className="flex justify-center gap-4 mb-[60px]">
        {options.map(option => (
          <div
            key={option.index}
            className={`cursor-pointer text-center text-base font-weight-500 ${activeOption === option.index ? 'border-b border-black' : ''}`}
            onClick={() => handleOptionClick(option.index)}
          >
            {option.text}
          </div>
        ))}
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2 }}>
        <Masonry gutter="20px">
          {filteredImages.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={item.image} alt={`Carousel ${index}`} className="w-full h-auto" />
              {hoveredIndex === index && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-white bg-black bg-opacity-75">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Proyectos;
