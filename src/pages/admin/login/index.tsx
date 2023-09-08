import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import usersData from '../../../database/users.json';

interface User {
  username: string;
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('El correo electrónico es obligatorio').email('El correo electrónico no es válido'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = (values: { email: string; password: string }, actions: any) => {
    const user: User | undefined = usersData.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem('username', user.username);

      login();
      router.push('/admin');
    } else {
      setError('Credenciales incorrectas. Por favor, verifica tus datos.');
    }

    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, []);

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Iniciar sesión</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {error && <p className="text-center text-red-600">{error}</p>}

              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="Email"
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  Iniciar sesión
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
