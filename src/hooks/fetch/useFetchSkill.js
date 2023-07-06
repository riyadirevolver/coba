import { useEffect, useState } from "react";
import ServiceAdapter from "../../../lib/services";

const useFetchSkill = () => {
  const [openSkill, setOpenSkill] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const loadingSkill = openSkill && skillList.length === 0;

  useEffect(() => {
    let active = true;

    if (!loadingSkill) {
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
        setSkillList(result);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSkill]);

  return {
    setOpenSkill,
    skillList,
    openSkill,
    loadingSkill,
  };
};

export default useFetchSkill;
