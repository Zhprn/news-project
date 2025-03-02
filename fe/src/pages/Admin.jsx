import { useState } from "react";
import Sidebar from "../components/SidebarComponent";
import CategoriesComponent from "../components/CategoriesComponent"; // Import your component
import AddPostComponent from "../components/AddPostComponent";
import ManagePostComponent from "../components/ManagePostComponent";
import ManageTeamComponent from "../components/ManageTeamComponent";
import ManagePositionComponent from "../components/ManagePositionComponent";
import ManageGaleryComponent from "../components/ManageGaleryComponent";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />  

      <div className="flex-grow-1 p-4">
        {activeTab === "dashboard" && <div>Dashboard Content</div>}
        {activeTab === "manageCategory" && <CategoriesComponent />}
        {activeTab === "addPost" && <AddPostComponent />}
        {activeTab === "managePost" && <ManagePostComponent />}
        {activeTab === "manageTeam" && <ManageTeamComponent />}
        {activeTab === "managePosition" && <ManagePositionComponent />}
        {activeTab === "manageGallery" && <ManageGaleryComponent />}
      </div>
    </div>
  );
};

export default Admin;