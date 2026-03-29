import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { PageLoader } from './components/PageLoader';

function App() {
  return (
    <>
      <PageLoader />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
