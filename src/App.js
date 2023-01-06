import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import Form from './pages/Form';
import List from './pages/List';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/data' element={<List/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
