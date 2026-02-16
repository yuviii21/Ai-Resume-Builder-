import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-blue-500/30">
            <TopBar />
            <main className="flex-1 flex flex-col relative">
                <Outlet />
            </main>
        </div>
    );
};
