import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="h-screen w-full">
      <Navbar />

      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    </div>
  );
}

export default Home;
