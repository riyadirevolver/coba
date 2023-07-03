import { useEffect, useState } from "react";

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
      const SKILL_LISTS = [
        { title: "Java" },
        { title: "PHP" },
        { title: "Javascript" },
        { title: "Python" },
        { title: "C++" },
      ];
      if (active) {
        setSkillList(SKILL_LISTS);
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
