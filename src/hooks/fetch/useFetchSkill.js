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
        { title: "Memasak" },
        { title: "Menulis" },
        { title: "Menggambar" },
        { title: "Mencontek" },
      ];
      // const data = await getSkills();
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
