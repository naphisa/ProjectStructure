//import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import ProductForm from './components/ProductForm';
import RegisterForm from './components/RegisterForm';
/*import Dashboard from './pages/Dashboard';*/

function App() {
    //const [forecasts, setForecasts] = useState();

    //useEffect(() => {
    //    populateWeatherData();
    //}, []);

    //const contents = forecasts === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    : <table className="table table-striped" aria-labelledby="tabelLabel">
    //        <thead>
    //            <tr>
    //                <th>Date</th>
    //                <th>Temp. (C)</th>
    //                <th>Temp. (F)</th>
    //                <th>Summary</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {forecasts.map(forecast =>
    //                <tr key={forecast.date}>
    //                    <td>{forecast.date}</td>
    //                    <td>{forecast.temperatureC}</td>
    //                    <td>{forecast.temperatureF}</td>
    //                    <td>{forecast.summary}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            {/*<p>This component demonstrates fetching data from the server.</p>*/}
            {/*{contents}*/}
        </div>,
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/new" element={<NewProduct />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
                <Route path="/product-form" element={
                    <ProtectedRoute>
                        <ProductForm />
                    </ProtectedRoute>
                } />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/Protected route" element={<LoginForm />} />
                {/*<Route path="/dashboard" element={*/}
                {/*    <ProtectedRoute>*/}
                {/*        <Dashboard />*/}
                {/*    </ProtectedRoute>*/}
                {/*} />*/}
            </Routes>
        </BrowserRouter>

    );
    
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    setForecasts(data);
    //}
}

export default App;



//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import LoginForm from './components/LoginForm';
//import ProjectForm from './components/ProjectForm'; // your form component
//import ProtectedRoute from './components/ProtectedRoute';

//function App() {
//    return (
//        <BrowserRouter>
//            <Routes>
//                <Route path="/login" element={<LoginForm />} />
//                <Route path="/project-form" element={
//                    <ProtectedRoute>
//                        <ProjectForm />
//                    </ProtectedRoute>
//                } />
//            </Routes>
//        </BrowserRouter>
//    );
//}

//export default App;