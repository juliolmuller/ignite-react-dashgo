import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavGroup } from './NavGroup';
import { NavLink } from './NavLink';

export function NavSideBar() {
  return (
    <Stack align="flex-start" spacing="12">
      <NavGroup title="Geral">
        <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink icon={RiContactsLine}>Usuários</NavLink>
      </NavGroup>

      <NavGroup title="Automação">
        <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
        <NavLink icon={RiGitMergeLine}>Automação</NavLink>
      </NavGroup>
    </Stack>
  );
}
