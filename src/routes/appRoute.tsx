import Sidebar from '../components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

const AppRoute = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-slate-800 p-6 overflow-auto h-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<div>tasks</div>} />
                        <Route path="/users" element={<div>user</div>} />
                        <Route path="/apis" element={<div>API Page</div>} />
                        <Route path="/subscription" element={<div>Subscription Page</div>} />
                        <Route path="/settings" element={<div>Settings Page</div>} />
                        <Route path="/help" element={<div>Help Page</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default AppRoute;