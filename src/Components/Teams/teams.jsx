import axios from "axios";
import { useEffect, useState } from "react";

const userData = localStorage.getItem("data");
var data = JSON.parse(userData);

export function Teams({ groups, currGrp = (grpName) => {} }) {
  const grps = localStorage.getItem("Teams");
  const [teams, setTeams] = useState(JSON.parse(grps));
  return (
    <>
      <div>
        <ul>
          {teams &&
            teams.map((team, index) => (
              <li
                className="rounded-[5px] border border-blue-black-200 bg-transparent"
                style={{ textAlign: "center" }}
              >
                <a
                  href="#"
                  onClick={() => {
                    currGrp(team.Name);
                  }}
                  id={index}
                >
                  {team.Name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
