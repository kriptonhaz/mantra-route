import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import DashboardLayout, {IDashboardBreadcrumb} from '@/layouts/dashboard.layout';
import CardVolunteerDetail from './ui/CardVolunteerDetail';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';

const VolunteerDetailUI: React.FC = () => {
  const {idVr} = useParams();
  const {volunteerRequestDetail, listVolunteerRequestSession} = useVolunteerRequestHook();
  const {data: dataVolunteerRequestDetail} = volunteerRequestDetail({idVr: idVr ?? ''});
  const {data: listDataSession} = listVolunteerRequestSession({idVr: idVr ?? ''});
  const [breadcrumbs, setBreadcrumbs] = useState<IDashboardBreadcrumb[]>([
    {
      type: 'icon',
      content: <FeatherIcon icon='home' />,
      href: '/dashboard/home',
    },
    {
      type: 'text',
      content: 'Volunteer',
      href: '/dashboard/volunteer',
    },
    {
      type: 'text',
      content: '',
      href: '#',
    },
  ]);

  useEffect(() => {
    if (breadcrumbs[2].content === '') {
      let tmpBreadcrumbs = [...breadcrumbs];
      tmpBreadcrumbs[2].content = dataVolunteerRequestDetail?.volunteerRequest[0].Name;
      setBreadcrumbs(tmpBreadcrumbs);
    }
  }, [idVr, dataVolunteerRequestDetail]);

  return (
    <DashboardLayout title='Volunteer Details' withBackBtn breadCrumbs={breadcrumbs}>
      <DashboardLayout.Content>
        <CardVolunteerDetail
          vrDetail={dataVolunteerRequestDetail?.volunteerRequest[0]}
          listSession={listDataSession?.volunteerSessions}
          isRegister={dataVolunteerRequestDetail?.isRegistred}
        />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default VolunteerDetailUI;
