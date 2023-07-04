import { useEffect, useState } from "react";
import ServiceAdapter from "../../../lib/services";

const useFetchFilterSkills = () => {
  const [openFilterSkills, setOpenFilterSkills] = useState(false);
  const [filterSkillsList, setFilterSkillsList] = useState([]);
  const loadingFilterSkills = openFilterSkills && filterSkillsList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingFilterSkills) {
      return undefined;
    }

    (async () => {
      const { data } = await ServiceAdapter().get("/filter-skills");

      if (active) {
        const skills = data[0].skills.split(",").slice(1);
        const result = [];
        for (let i = 0; i < skills.length; i++) {
          const skill = skills[i].trim();
          if (skill) {
            result.push({
              field: "skills",
              title: skill,
            });
          }
        }
        setFilterSkillsList(result);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingFilterSkills]);

  return {
    setOpenFilterSkills,
    filterSkillsList,
    openFilterSkills,
    loadingFilterSkills,
  };
};

export default useFetchFilterSkills;
