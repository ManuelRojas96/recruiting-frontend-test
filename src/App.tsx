import InvoicesPage from "./pages/InvoicesPage";

function App() {
  return (
    <>
      {/* Build your page here */}
      <div className="flex justify-center items-center min-h-screen w-screen bg-slate-50">
        <div className="flex flex-col items-center justify-center gap-4">
          <InvoicesPage />
        </div>
      </div>
    </>
  );
}

export default App;
