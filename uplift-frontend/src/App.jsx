import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import DonorsPage from "./pages/DonorsPage";
import Donor360Page from "./pages/Donor360Page";
import DonationsPage from "./pages/DonationsPage";
import TransactionsPage from "./pages/TransactionsPage";
import ImportPage from "./pages/ImportPage";
import CommunicationsPage from "./pages/CommunicationsPage";
import EngagementsPage from "./pages/EngagementsPage";
import PublicDonationPage from "./pages/PublicDonationPage";
import ContributionsPage from "./pages/ContributionsPage";

function App() {
  return (
    <Routes>
      <Route path="/donate" element={<PublicDonationPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/donors/:id" element={<Donor360Page />} />
          <Route path="/donations" element={<DonationsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/communications" element={<CommunicationsPage />}/>
          <Route path="/engagements" element={<EngagementsPage />}/>
          <Route path="/contributions" element={<ContributionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
