import AppProvider from './AppProvider';
import DashboardPage from '@/pages/DashboardPage';

function App() {
  return (
    <AppProvider>
      <DashboardPage />
    </AppProvider>
  );
}

export default App;
