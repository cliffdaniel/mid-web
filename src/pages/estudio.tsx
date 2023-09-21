import React, { useEffect, useState } from 'react';
import { AboutCarousel } from '../components/AboutCarousel';
import { RIGHT_CONTENT_1, RIGHT_CONTENT_2, RIGHT_CONTENT_3 } from '../constants';
import fireStoreDB from '@/config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import router from 'next/router';

interface Member {
  id: string | null;
  name: string;
  lastName: string;
  position: string;
  createdAt: any;
}

const Estudio: React.FC = () => {
  const carouselImages = ['/carousel-estudio.png', '/carousel-estudio.png', '/carousel-estudio.png', '/carousel-estudio.png'];
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(fireStoreDB, 'team');
        const orderedQuery = query(membersCollection, orderBy('createdAt', 'desc'));

        onSnapshot(orderedQuery, (response: any) => {
          const members: any = []
          response.forEach((doc: any) => {
            members.unshift( { ...doc.data(), id: doc.id })
          });
          setMembers(members);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error al obtener la lista de proyectos:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 max-w-[1140px] mx-auto px-4 md:px-[35px]">
      <div>
        <AboutCarousel images={carouselImages} />
      </div>
      <div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px] mb-[30px]">
          {RIGHT_CONTENT_1}
        </div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px] mb-[30px]">
          {RIGHT_CONTENT_2}
        </div>
        <div className="text-black font-neue-haas-grotesk-display-pro text-[13px] leading-[23px]">
          {RIGHT_CONTENT_3}
        </div>
      </div>
      <div>

      </div>
      <div>
        <div>
          <h4 className="mb-4 text-2xl font-bold">Equipo de Trabajo</h4>
          {!isLoading && members.map((member) => (
            <div key={member.id}>
              <p className="text-lg font-semibold">{member.name} {member.lastName}</p>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Estudio;
