// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'App', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'E-Commerce', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      { title: 'Analytics', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
      { title: 'Analytics', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
      { title: 'Analytics', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
      
    ],
  },
];

export default navConfig;
