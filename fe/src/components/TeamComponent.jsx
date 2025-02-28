import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/team.css"

function Team() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="team-container min-vh-100 d-flex flex-column align-items-center justify-content-center p-3">
      <h2 className="text-white text-center mb-4">
        TIM KAMI
      </h2>
      <div className="w-100 max-w-75">
        {sections.map((section) => (
          <div key={section.id} className="card mb-3">
            <button
              className="btn btn-light d-flex justify-content-between align-items-center p-3 w-100 text-start"
              onClick={() => toggleSection(section.id)}
              data-bs-toggle="collapse"
              data-bs-target={`#${section.id}`}
              aria-expanded={openSection === section.id ? "true" : "false"}
              aria-controls={section.id}
            >
              <span className="d-flex align-items-center">
                <span className="me-2">◆</span> {section.title}
              </span>
            </button>
            <div id={section.id} className={`collapse ${openSection === section.id ? "show" : ""}`}>
              <div className="card-body bg-light">
                {section.content.map((profile, index) => (
                  <div key={index} className="d-flex align-items-start mb-4">
                    <img src={profile.image} alt={profile.name} className="rounded me-3" width="100" height="130" />
                    <div>
                      <h5 className="mb-1">{profile.name}</h5>
                      <p className="text-muted small">{profile.specialty}</p>
                      <p>{profile.description}</p>
                      <button className="btn btn-warning btn-sm">DOWNLOAD PORTFOLIO</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const sections = [
  {
    id: "partner",
    title: "PARTNER PROFILE",
    content: [
      {
        name: "Kevin Pratama Putra, S.H. (Managing Partner)",
        specialty: "Spesialisasi: Litigator",
        description: "Kevin Pratama Putra adalah pendiri dari Fiable Law Office...",
        image: "https://via.placeholder.com/100x130"
      },
      {
        name: "Muhammad Arief Azmi, S.H. (Partner)",
        specialty: "Spesialisasi: Litigator",
        description: "Muhammad Arief Azmi adalah pendiri dan mitra terkemuka...",
        image: "https://via.placeholder.com/100x130"
      },
      {
        name: "Vino Oktavia, S.H., M.H.",
        specialty: "Spesialisasi: Environmental Resources Lawyer & Customary Land",
        description: "Vino Oktavia menyelesaikan pendidikan Sarjana dan Pascasarjana...",
        image: "https://via.placeholder.com/100x130"
      }
    ]
  },
  {
    id: "legal",
    title: "LEGAL CONSULTANT PROFILE",
    content: []
  },
  {
    id: "lawyer",
    title: "LAWYER PROFILE",
    content: []
  }
];

export default Team;
