import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { InfoOutlineIcon, SettingsIcon, EditIcon } from '@chakra-ui/icons';
import Typography from 'components/Typography/Typography';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Pages } from 'utils/constants';
import { useEffect, useState } from 'react';
import UserProjectService from 'services/UserProjectsService';

const ProjectsMenuButton = ({ projectId, onEditClick, auth }) => {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  // console.log('xxxxxxxx', auth);

  const [projectPermission, setProjectPermission] = useState();
  useEffect(() => {
    UserProjectService.findAll({
      user_id: localStorage.getItem('user_id'),
      project_id: projectId,
    })
      .then(({ data }) => {
        // console.log('dddddddd', data);
        setProjectPermission(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log('first', projectPermission);

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton onClick={onOpen1} alignSelf="flex-start">
        <Icon as={IoEllipsisVerticalSharp} color="gray.400" w="20px" h="20px" />
      </MenuButton>
      <MenuList>
        <Link to={`${Pages.PROJECTS}/${projectId}`}>
          <MenuItem>
            <Typography startIcon={<InfoOutlineIcon />}>
              Detail Project
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={onEditClick}>
          <Typography startIcon={<EditIcon />}>Edit Project</Typography>
        </MenuItem>
        {projectId && projectPermission?.is_owner && (
          <MenuItem>
            <Link to={`/admin/applications/user-projects/${projectId}`}>
              <Typography startIcon={<AiOutlineUserAdd />}>
                User Projects
              </Typography>
            </Link>
          </MenuItem>
        )}
        {/* <MenuItem>
          <Link to={`/admin/applications/user-projects/${projectId}`}>
            <Typography startIcon={<AiOutlineUserAdd />}>
              User Projects
            </Typography>
          </Link>
        </MenuItem> */}

        <MenuItem>
          <Link to={`/admin/applications/project/settings/${projectId}`}>
            <Typography startIcon={<SettingsIcon />}>
              Setting Project
            </Typography>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProjectsMenuButton;
